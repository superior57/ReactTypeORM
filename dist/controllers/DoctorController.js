"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const doctor_1 = require("../entity/doctor");
class DoctorController {
}
DoctorController.getOneById = (req, res) => __awaiter(this, void 0, void 0, function* () {
    console.log(req.body, req.params);
    const id = parseInt(req.params.id);
    const medicoRepository = typeorm_1.getRepository(doctor_1.doctor);
    try {
        const oficinas = yield medicoRepository.find({ relations: ["oficinas"], where: { id: id }, });
        console.log('Oficinas', oficinas);
        res.status(404).send({ transaccion: true, data: oficinas });
    }
    catch (error) {
        res.status(404).send({ transaccion: false, mensaje: 'Error consultando', error: error });
    }
    ;
});
DoctorController.editMedico = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const { activado = false, nombres = '', apellidos = '', titulo_honorifico = '', declaracion_profesional = '', numero_telefono = '', practica_desde = '' } = req.body;
    if (!(!!nombres && apellidos && !!titulo_honorifico && !!declaracion_profesional && !!numero_telefono && !!practica_desde)) {
        res.status(404).send({ transaccion: false, mensaje: 'Debe enviar todos los campos', error: '' });
    }
    console.log('31 ingresa ', req.body);
    const medicoRepository = typeorm_1.getRepository(doctor_1.doctor);
    let medico;
    try {
        medico = yield medicoRepository.findOneOrFail(id);
    }
    catch (error) {
        res.status(404).send({ transaccion: false, mensaje: 'Medico no encontrado', error });
        return;
    }
    console.log('42 ingresa ', medico);
    medico.activado = activado;
    medico.nombres = nombres;
    medico.apellidos = apellidos;
    medico.titulo_honorifico = titulo_honorifico;
    medico.declaracion_profesional = declaracion_profesional;
    medico.numero_telefono = numero_telefono;
    medico.practica_desde = practica_desde;
    const errors = yield class_validator_1.validate(medico);
    if (errors.length > 0) {
        res.status(400).send(errors);
        return;
    }
    try {
        medico = yield medicoRepository.save(medico);
    }
    catch (e) {
        console.log(e);
        res.status(409).send({ transaccion: false, mensaje: 'ocurrio un error guardando los datos, Intente nuevamente', error: e, medico });
        return;
    }
    res.status(200).send({ transaccion: true, data: medico });
});
exports.default = DoctorController;
//# sourceMappingURL=DoctorController.js.map