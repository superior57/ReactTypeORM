import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Oficina } from "../entity/Oficina";
import { oficina_horario } from "../entity/oficina_horario";
import { validate } from "class-validator";
import { Reservas } from "../entity/Reservas";

class OficinaController {
  static getOficinasByDoctor = async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    console.log("entrada /api/oficinas/getOficinasByDoctor", id);

    const oficinaRepository = getRepository(Oficina);

    try {
      const oficinas = await oficinaRepository
        .createQueryBuilder("oficina")
        .where("oficina.doctor_id = :id", { id })
        .getMany();

      console.log("salida /api/oficinas/getOficinasByDoctor", oficinas);

      res.status(200).send({ transaccion: true, data: oficinas });
    } catch (error) {
      console.log("error /api/oficinas/getOficinasByDoctor", error);
      res.status(404).send({
        transaccion: false,
        mensaje: "Error consultando",
        error: error,
      });
    }
  };

  static setOficinasByDoctor = async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id); /// id del oficina
    //Get values from the body

    //Base entity no tiene constructores :(

    const oficinaRepository = getRepository(Oficina);

    let newOficina;
    if (!!req.body.oficina_id) {
      const oficinaid: number = parseInt(req.body.oficina_id);
      try {
        newOficina = await oficinaRepository.findOneOrFail(oficinaid);
      } catch (error) {
        //If not found, send a 404 response
        res.status(404).send({
          transaccion: false,
          mensaje: "registro no encontrado",
          error,
        });
        return;
      }
    } else {
      newOficina = new Oficina();
    }

    // let newOficina = new Oficina();
    // newOficina=newLocal;
    newOficina.tiempo_por_cliente_minutos = req.body.tiempo_por_cliente_minutos;
    newOficina.costo_primera_consulta = req.body.costo_primera_consulta;
    newOficina.costo_consulta = req.body.costo_consulta;
    newOficina.direccion = req.body.direccion;
    newOficina.ciudad = req.body.ciudad;
    newOficina.provincia = req.body.provincia;
    newOficina.pais = req.body.pais;
    newOficina.codigo_zip = req.body.codigo_zip;
    newOficina.referencias_fisicas = req.body.referencias_fisicas;
    newOficina.longitud = req.body.longitud;
    newOficina.latitud = req.body.latitud;
    newOficina.doctor_id = id;

    console.log("entrada body /api/oficinas/setOficinasByDoctor", req.body);

    const errors = await validate(newOficina);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }
    try {
      await oficinaRepository.save(newOficina);

      //TODO: ver si se puede reutilizar la función getOficinasByDoctor para no repetir código
      const oficinas = await oficinaRepository
        .createQueryBuilder("oficina")
        .where("oficina.doctor_id = :id", { id })
        .getMany();
      console.log("salida /api/oficinas/setOficinasByDoctor", oficinas);
      res.status(200).send({ transaccion: true, data: oficinas });
    } catch (error) {
      console.log("error /api/oficinas/setOficinasByDoctor", error);
      res.status(409).send({
        transaccion: false,
        mensaje: "ocurrio un error guardando los datos, Intente nuevamente",
        error: error,
      });
    }
    res.status(200).send({ transaccion: true });
  };

  static deleteOficinasByDoctor = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id: number = parseInt(req.params.id);

    const oficinaRepository = getRepository(Oficina);
    try {
      await oficinaRepository.findOneOrFail(id);
    } catch (error) {
      return res
        .status(404)
        .send({ transaccion: false, mensaje: "Registro no encontrado", error });
    }
    try {
      oficinaRepository.delete(id);
    } catch (error) {
      return res.status(404).send({
        transaccion: false,
        mensaje: "Error al eliminar registro",
        error,
      });
    }

    //After all send a 204 (no content, but accepted) response
    return res.status(200).send({
      transaccion: true,
      mensaje: "Registro eliminado correctamente",
      error: "",
    });
  };

  static getOficinasHorariosByDoctor = async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    console.log("entrada /api/oficinas/getOficinasHorariosByDoctor", id);

    const oficinaRepository = getRepository(oficina_horario);
    const reservaRepository = getRepository(Reservas);

    try {
      //Obtiene los horarios de cada oficina
      let horarios_oficina = await oficinaRepository
        .createQueryBuilder("h")
        .innerJoin("oficina", "o", "h.oficina_id = o.id")
        .select([
          "h.id",
          "h.oficina_id",
          "h.dia_semana",
          "h.hora_inicio",
          "h.hora_fin",
          "o",
        ])
        .orderBy("h.id", "ASC")
        .where("o.doctor_id = :id", { id })
        .getRawMany();

      const reservas = await reservaRepository
        .createQueryBuilder("r")
        .where((qb) => {
          const subQuery = qb
            .subQuery()
            .select("oficina.id")
            .from(Oficina, "oficina")
            .where("oficina.doctor_id = :id")
            .getQuery();
          return "r.oficina_id IN " + subQuery;
        })
        .setParameter("id", id)
        .andWhere("r.inicio > NOW()")
        .getMany();

      console.log(
        "salida /api/oficinas/getOficinasHorariosByDoctor",
        horarios_oficina,
        reservas
      );

      res.status(200).send({
        transaccion: true,
        horarios_oficina: horarios_oficina,
        ocupados: reservas,
      });
    } catch (error) {
      console.log("error /api/oficinas/getOficinasHorariosByDoctor", error);
      res.status(404).send({
        transaccion: false,
        mensaje: "Error consultando",
        error: error,
      });
    }
  };

  static getHorariosByDoctor = async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    console.log("entrada /api/oficinas/getHorariosByDoctor", id);

    const oficina_horarioRepository = getRepository(oficina_horario);

    try {
      const horarios = await oficina_horarioRepository
        .createQueryBuilder("horario")
        .innerJoinAndSelect("oficina", "o", "horario.oficina_id = o.id")
        .select([
          "horario.id",
          "horario.oficina_id",
          "horario.dia_semana",
          "horario.hora_inicio",
          "horario.hora_fin",
        ])
        .where("o.doctor_id = :id", { id })
        .getMany();

      console.log("salida /api/oficinas/getHorariosByDoctor", horarios);

      res.status(200).send({ transaccion: true, data: horarios });
    } catch (error) {
      console.log("error /api/oficinas/getHorariosByDoctor", error);
      res.status(404).send({
        transaccion: false,
        mensaje: "Error consultando",
        error: error,
      });
    }
  };

  static setHorariosByOficina = async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    console.log("entrada /api/oficinas/setHorariosByOficina", id);

    const { data = [], doctor_id = "" } = req.body;
    if (data.length > 0) {
      let Error = false;
      data.forEach(
        async ({ dia_semana = "", hora_inicio = "", hora_fin = "" }) => {
          if (!!hora_fin && !!hora_inicio && !!dia_semana) {
            const newHorario = new oficina_horario();
            newHorario.dia_semana = dia_semana;
            newHorario.hora_fin = hora_fin;
            newHorario.hora_inicio = hora_inicio;
            newHorario.oficina_id = id;

            const oficina_horarioRepository = getRepository(oficina_horario);

            const errors = await validate(newHorario);
            if (errors.length > 0) {
              Error = true;
            } else {
              try {
                await oficina_horarioRepository.save(newHorario);
              } catch (error) {
                console.log(
                  "error /api/oficinas/setOficinasByDoctor",
                  error,
                  Error
                );
                // res.status(409).send({ transaccion: false, mensaje: 'ocurrio un error guardando los datos, Intente nuevamente', error: error });
              }
            }
          }
        }
      );
      req.params.id = doctor_id;
      return OficinaController.getHorariosByDoctor(req, res);
    }
    return res.status(409).send({
      transaccion: false,
      mensaje: "No existen datos, Intente nuevamente",
      error: data,
    });
  };

  // static setHorariosByOficina = async (req: Request, res: Response) => {
  //   const id: number = parseInt(req.params.id);
  //   console.log('entrada /api/oficinas/setHorariosByOficina', id);

  //   const { data = [], doctor_id = '' } = req.body
  //   if (data.length > 0) {
  //     let Error = false;
  //     data.forEach(async ({ dia_semana = '', hora_inicio = '', hora_fin = '' }) => {
  //       if (!!hora_fin && !!hora_inicio && !!dia_semana) {
  //         const newHorario = new oficina_horario();
  //         newHorario.dia_semana = dia_semana
  //         newHorario.hora_fin = hora_fin
  //         newHorario.hora_inicio = hora_inicio
  //         newHorario.oficina_id = id

  //         const oficina_horarioRepository = getRepository(oficina_horario);

  //         const errors = await validate(newHorario);
  //         if (errors.length > 0) {
  //           Error = true
  //         } else {
  //           try {
  //             await oficina_horarioRepository.save(newHorario);
  //           } catch (error) {
  //             console.log('error /api/oficinas/setOficinasByDoctor', error, Error);
  //             // res.status(409).send({ transaccion: false, mensaje: 'ocurrio un error guardando los datos, Intente nuevamente', error: error });
  //           }
  //         }
  //       }
  //     });
  //     req.params.id = doctor_id
  //     return OficinaController.getOficinasHorariosByDoctor(req, res)
  //   }
  //   return res.status(409).send({ transaccion: false, mensaje: 'No existen datos, Intente nuevamente', error: data })
  // };

  static updateHorario = async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    console.log("entrada /api/oficinas/setHorariosByOficina", id);

    const { dia_semana = "", hora_inicio = "", hora_fin = "" } = req.body;

    if (!!hora_fin && !!hora_inicio && !!dia_semana) {
      let newHorario;
      const oficina_horarioRepository = getRepository(oficina_horario);
      try {
        newHorario = await oficina_horarioRepository.findOneOrFail(id);
      } catch (error) {
        //If not found, send a 404 response
        return res.status(404).send({
          transaccion: false,
          mensaje: "registro no encontrado",
          error,
        });
      }
      newHorario.dia_semana = dia_semana;
      newHorario.hora_fin = hora_fin;
      newHorario.hora_inicio = hora_inicio;

      const errors = await validate(newHorario);
      if (errors.length > 0) {
        return res.status(409).send({
          transaccion: false,
          mensaje: "Error al establecer datos",
          error: errors,
        });
      }
      try {
        await oficina_horarioRepository.save(newHorario);
        return res.status(200).send({
          transaccion: true,
          mensaje: "Datos actualizados correctamente",
          error: "",
        });
      } catch (error) {
        console.log("error /api/oficinas/setOficinasByDoctor", error, Error);
        return res.status(409).send({
          transaccion: false,
          mensaje: "ocurrio un error guardando los datos, Intente nuevamente",
          error: error,
        });
      }
    }
    return res
      .status(409)
      .send({ transaccion: false, mensaje: "Datos no guardados", error: "" });
  };

  static deleteHorario = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id: number = parseInt(req.params.id);

    const oficina_horarioRepository = getRepository(oficina_horario);
    try {
      await oficina_horarioRepository.findOneOrFail(id);
    } catch (error) {
      return res
        .status(404)
        .send({ transaccion: false, mensaje: "Registro no encontrado", error });
    }
    try {
      oficina_horarioRepository.delete(id);
    } catch (error) {
      return res.status(404).send({
        transaccion: false,
        mensaje: "Error al eliminar registro",
        error,
      });
    }

    //After all send a 204 (no content, but accepted) response
    return res.status(200).send({
      transaccion: true,
      mensaje: "Registro eliminado correctamente",
      error: "",
    });
  };
}

export default OficinaController;
