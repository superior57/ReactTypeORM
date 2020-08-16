/**
 * @author jpcapelo
 * @email jhonnathanp27@gmail.com
 * @create date 2020-05-20 21:02:39
 * @modify date 2020-05-20 21:02:39
 * @desc [description]
 */

import { Request, Response } from "express";
import { getRepository } from "typeorm";

import { Especializacion } from "../entity/Especializacion";
import { doctor as Doctor } from "../entity/doctor";

class EspecializacionController {
  static getAll = async (req: Request, res: Response) => {
    try {
      console.log("Entrada /api/especializacion/getAll==", req);

      const EspecializacionRepository = getRepository(Especializacion);

      const especializaciones = await EspecializacionRepository.find();

      res.status(200).send({ transaccion: true, data: especializaciones });
    } catch (error) {
      res.status(404).send({
        transaccion: false,
        mensaje: "Error consultando",
        error: error,
      });
    }
  };
  static doctorPorEspecializacion = async (req: Request, res: Response) => {
    try {
      console.log("Entrada /api/app/especializacions/id/doctor", req.params.id);

      // const Doctor = getRepository(doctor);
      const idEspecialidad = parseInt(req.params.id);

      const data = await Doctor.find({
        relations: ["especializaciones"],
        // where: {
        //   especializaciones: { especializaciones_id: idEspecialidad },
        // },
      });

      // const DoctorRep = await getRepository(Doctor)
      //   .createQueryBuilder("doctor")
      //   .innerJoin("especializaciones.author", "author", "author.id = :id", { id: author.id })
      //   .where('e."id" = :idEspecialidad', { idEspecialidad })
      //   .getMany();
      let data2: Array<Object> = [];
      data.forEach((item) => {
        item.especializaciones.forEach((espe) => {
          if (`${espe.id}` === `${idEspecialidad}`) {
            const item2 = {
              id: item.id,
              tituloHonorifico: item.titulo_honorifico,
              nombres: item.nombres,
              apellidos: item.apellidos,
              declaracionProfesional: item.declaracion_profesional,
              practicaDesde: item.practica_desde,
              numeroTelefono: item.numero_telefono,
              fotoPerfil: item.foto_perfil,
              fotoPerfilContentType: item.foto_perfil_content_type,
              activado: item.activado,
              userId: item.user.id,
              userLogin: item.user.login,
              especializaciones: item.especializaciones,
            };
            data2.push(item2);
          }
        });
      });
      console.log(data2);

      // const especializaciones = await EspecializacionRepository.find();
      console.log("Salida /api/especializacion9999");
      res.status(200).send(data2);
    } catch (error) {
      res.status(404).send({
        transaccion: false,
        mensaje: "Error consultando",
        error: error,
      });
    }
  };
}
export default EspecializacionController;
