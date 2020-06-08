/**
 * @author jpcapelo
 * @email jhonnathanp27@gmail.com
 * @create date 2020-05-17 18:24:21
 * @modify date 2020-05-17 18:24:21
 * @desc [description]
 */
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';

import { User } from '../entity/User';
import { med_user } from '../entity/med_user';
import { med_user_authority } from '../entity/med_user_authority';
import { doctor } from '../entity/doctor';
import config from '../config/config';
import Encriptar from '../utils/Encriptar';

class AuthController {
  static login = async (req: Request, res: Response) => {
    //Check if username and password are set
    let resp = { transaccion: false, mensaje: '', error: '' };

    let datos = req.body;
    try {
      datos = await Encriptar.decryptRSA(datos.data, '');
    } catch (error) {
      resp.mensaje = 'Error de procesamiento, Intente nuevamente';
      res.status(400).send(resp);
    }
    console.log(datos);
    let { username = '', password = '' } = datos;
    if (!(username && password)) {
      resp.mensaje = 'Error en datos no ingresados';
      res.status(400).send(resp);
    }

    //Get user from database
    const userRepository = getRepository(med_user);
    const doctorRepository = getRepository(doctor);
    const authorityRepository = getRepository(med_user_authority);
    let user: med_user;
    let medico: doctor;
    // let role: med_user_authority;
    try {
      user = await userRepository.findOneOrFail({ where: [{ login: username }, { email: username }] });
      //Check if encrypted password match
      if (!user.checkIfUnencryptedPasswordIsValid(password)) {
        res.status(401).send({ ...resp, mensaje: 'Contrasena no es correcta' });
        return;
      }

      const token = jwt.sign({ userId: user.id, email: user.email }, config.jwtSecret, { expiresIn: '24h' });

      const role2 = await authorityRepository.find({ where: { user: user } });

      console.log(user);
      const respuesta = {
        user_id: user.id,
        login: user.login,
        email: user.email,
        nombres: user.first_name,
        apellidos: user.last_name,
        image_url: user.image_url,
        lang_key: user.lang_key,
        foto_perfil: user.image_url,
        roles: role2,
        token,
        data_oficinas: [],
      };

      console.log(typeof role2, role2.length);

      // if (role2.length > 0) {
      //   const esMedico = role2.findIndex(i => i.authority_name === "ROLE_MED");
      //   if (esMedico > -1) {
      medico = await doctorRepository.findOneOrFail({
        where: { user: user },
        relations: ['especializaciones'],
      });
      res.send({ ...resp, transaccion: true, ...respuesta, medico });
      // }
      // }

      // const respuesta = { ...resp, transaccion: true, token: token, user: user, user_id: user.id }
      // res.send({ ...resp, transaccion: true, ...respuesta });
    } catch (error) {
      console.log(error);
      res.status(401).send('Error de Procesamiento' + error);
    }
  };

  static newUser = async (req: Request, res: Response) => {
    let datos = req.body;
    console.log(datos);
    datos = await Encriptar.decryptRSA(datos.data, '');
    console.log('datos', datos);
    const { usuario: login, email, nombres, apellidos, password, image_url = '' } = datos;
    let user = new med_user();
    user.login = login;
    user.email = email;
    user.password_hash = password;
    user.first_name = nombres;
    user.last_name = apellidos;
    user.image_url = image_url;
    user.created_by = 'newBack';
    console.log('datos', user);

    const errors = await validate(user);

    if (errors.length > 0) {
      res.status(400).send({ transaccion: false, mensaje: 'Datos Incompletos', error: errors });
      return;
    }

    user.hashPassword();

    // //Try to save. If fails, the username is already in use
    // const userRepository = getRepository(med_user);

    // try {
    //   user = await userRepository.save(user);
    // } catch (e) {
    //   console.log('error', e)
    //   res.status(409).send("El usuarios ya existe");
    //   return;
    // }
    console.log('usuario guardado', user);

    let medico = new doctor();
    medico.user = user;
    medico.nombres = nombres;
    medico.apellidos = apellidos;

    const errors2 = await validate(medico);

    if (errors2.length > 0) {
      res.status(400).send({ transaccion: false, mensaje: 'Datos Incompletos', error: errors2 });
      return;
    }

    //Hash the password, to securely store on DB
    const doctorRepository = getRepository(doctor);

    try {
      medico = await doctorRepository.save(medico);
    } catch (e) {
      if (e.detail.includes('already exists')) {
        res.status(409).send({
          transaccion: false,
          mensaje: 'El usuario o email ya se encuentran registrados.',
          error: 'El usuario o email ya se encuentran registrados.',
        });
      } else {
        res.status(409).send({
          transaccion: false,
          mensaje: 'No se pudo crear el medico comuniquese con el administrador',
          error: e.detail,
        });
      }
      return;
    }

    console.log('medico guardado', medico);

    let roles = new med_user_authority();
    roles.user_id = user.id;
    roles.authority_name = 'ROLE_MED';

    const errors3 = await validate(roles);
    if (errors3.length > 0) {
      res.status(400).send({
        transaccion: false,
        mensaje: 'No se puede crear el Role, Comuniquese con el Administrador',
        error: errors3,
      });
      return;
    }

    const rolesRepository = getRepository(med_user_authority);
    try {
      await rolesRepository.save(roles);
    } catch (e) {
      console.log('error', e);
      res.status(409).send({
        transaccion: false,
        mensaje: 'No se pudo crear el Role comuniquese con el administrador',
        error: e,
      });
      return;
    }

    res.status(201).send({ transaccion: true, mensaje: 'Usuario creado' });
  };

  static changePassword = async (req: Request, res: Response) => {
    //Get ID from JWT
    const id = res.locals.jwtPayload.userId;

    //Get parameters from the body
    const { oldPassword, newPassword } = req.body;
    if (!(oldPassword && newPassword)) {
      res.status(400).send();
    }

    //Get user from the database
    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail(id);

      //Check if old password matchs
      if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
        res.status(401).send();
        return;
      }

      //Validate de model (password lenght)
      user.password = newPassword;
      const errors = await validate(user);
      if (errors.length > 0) {
        res.status(400).send(errors);
        return;
      }
      //Hash the new password and save
      user.hashPassword();
      userRepository.save(user);

      res.status(204).send();
    } catch (id) {
      res.status(401).send();
    }
  };
}
export default AuthController;
