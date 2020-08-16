/**
 * @author jpcapelo
 * @email jhonnathanp27@gmail.com
 * @create date 2020-05-20 21:02:39
 * @modify date 2020-05-20 21:02:39
 * @desc [description]
 */

import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { Cliente } from "../entity/Cliente";

class ClienteController {
  static getOneById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      console.log("Entrada /api/clientes/getOneById", id);
      const clienteRepository = getRepository(Cliente);

      const cliente = await clienteRepository.findOne({
        select: [
          "id",
          "nombres",
          "apellidos",
          "cedula_identidad",
          "sexo",
          "telefono",
        ],
        where: { cedula_identidad: id },
      });
      if (cliente !== undefined) {
        res.status(200).send({ transaccion: true, data: cliente });
      } else {
        res.status(404).send({
          transaccion: false,
          mensaje:
            "No existe el cliente, verifíque el número de identificación",
        });
      }
    } catch (error) {
      res.status(404).send({
        transaccion: false,
        mensaje: "Error consultando",
        error: error,
      });
    }
  };
  static editCliente = async (req: Request, res: Response) => {
    //Get the ID from the url
    // const id = parseInt(req.params.id);

    //Get values from the body
    const {
      apellidos = "",
      cedulaIdentidad = "",
      cedulaRepresentante = null,
      celular = "",
      ciudad = "",
      direccion = "",
      fechaNacimiento = null,
      fotoPerfil = null,
      fotoPerfilContentType = null,
      id = null,
      nombres = "",
      nombresMadre = null,
      nombresPadre = null,
      pais = "",
      sexo = "",
      telefono = "",
      tipoSangre = null,
      tituloHonorifico = "",
      // userId = null,
      // userLogin = "",
    } = req.body;

    const ClienteRepo = getRepository(Cliente);
    let cliente;
    try {
      cliente = await ClienteRepo.findOneOrFail({ where: { id } });
    } catch (error) {
      res
        .status(404)
        .send({ transaccion: false, mensaje: "Cliente no encontrado", error });
      return;
    }

    //Validate the new values on model
    cliente.nombres = nombres;
    cliente.apellidos = apellidos;
    cliente.cedula_identidad = cedulaIdentidad;
    cliente.cedula_representante = cedulaRepresentante;
    cliente.celular = celular;
    cliente.ciudad = ciudad;
    cliente.direccion = direccion;
    cliente.fecha_nacimiento = fechaNacimiento;
    cliente.foto_perfil = fotoPerfil;
    cliente.foto_perfil_content_type = fotoPerfilContentType;
    cliente.nombres_madre = nombresMadre;
    cliente.nombres_padre = nombresPadre;
    cliente.pais = pais;
    cliente.sexo = sexo;
    cliente.telefono = telefono;
    cliente.tipo_sangre = tipoSangre;
    cliente.titulo_honorifico = tituloHonorifico;
    // user = userId;
    // cliente = userLogin;

    try {
      const errors = await validate(cliente);
      if (errors.length > 0) {
        console.log("error Guardando Cliente", errors);
        return res.status(404).send({
          transaccion: false,
          mensaje: "Cliente no se pudo guardar, " + errors,
          errors,
        });
      }
      await ClienteRepo.save(cliente);
    } catch (error) {
      console.log("error Guardando Cliente", error);
      return res.status(404).send({
        transaccion: false,
        mensaje: "Cliente no se pudo guardar, " + error,
        error,
      });
    }

    //After all send a 204 (no content, but accepted) response
    console.log("data guardada, cliente", cliente);
    return res.status(200).send({
      transaccion: true,
      cliente: {
        nombres: cliente.nombres,
        apellidos: cliente.apellidos,
        cedulaIdentidad: cliente.cedula_identidad,
        cedulaRepresentante: cliente.cedula_representante,
        celular: cliente.celular,
        ciudad: cliente.ciudad,
        direccion: cliente.direccion,
        fechaNacimiento: cliente.fecha_nacimiento,
        fotoPerfil: cliente.foto_perfil,
        fotoPerfilContentType: cliente.foto_perfil_content_type,
        nombresMadre: cliente.nombres_madre,
        nombresPadre: cliente.nombres_padre,
        pais: cliente.pais,
        sexo: cliente.sexo,
        telefono: cliente.telefono,
        tipoSangre: cliente.tipo_sangre,
        tituloHonorifico: cliente.titulo_honorifico,
      },
    });
  };
}
export default ClienteController;
