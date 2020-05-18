"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = __importStar(require("jsonwebtoken"));
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const User_1 = require("../entity/User");
const med_user_1 = require("../entity/med_user");
const med_user_authority_1 = require("../entity/med_user_authority");
const doctor_1 = require("../entity/doctor");
const config_1 = __importDefault(require("../config/config"));
const Encriptar_1 = __importDefault(require("../utils/Encriptar"));
class AuthController {
}
AuthController.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
    let resp = { transaccion: false, mensaje: '', error: '' };
    let datos = req.body;
    try {
        datos = yield Encriptar_1.default.decryptRSA(datos.data, '');
    }
    catch (error) {
        resp.mensaje = 'Error de procesamiento, Intente nuevamente';
        res.status(400).send(resp);
    }
    console.log(datos);
    let { username = '', password = '' } = datos;
    if (!(username && password)) {
        resp.mensaje = 'Error en datos no ingresados';
        res.status(400).send(resp);
    }
    const userRepository = typeorm_1.getRepository(med_user_1.med_user);
    const doctorRepository = typeorm_1.getRepository(doctor_1.doctor);
    const authorityRepository = typeorm_1.getRepository(med_user_authority_1.med_user_authority);
    let user;
    let medico;
    try {
        user = yield userRepository.findOneOrFail({ where: [{ login: username }, { email: username }] });
        if (!user.checkIfUnencryptedPasswordIsValid(password)) {
            res.status(401).send(Object.assign({}, resp, { mensaje: 'Contrasena no es correcta' }));
            return;
        }
        const token = jwt.sign({ userId: user.id, email: user.email }, config_1.default.jwtSecret, { expiresIn: "24h" });
        const role2 = yield authorityRepository.find({ where: { user: user } });
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
        medico = yield doctorRepository.findOneOrFail({ where: { user: user } });
        res.send(Object.assign({}, resp, { transaccion: true }, respuesta, { medico }));
    }
    catch (error) {
        console.log(error);
        res.status(401).send("Error de Procesamiento" + error);
    }
});
AuthController.newUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
    let datos = req.body;
    console.log(datos);
    datos = yield Encriptar_1.default.decryptRSA(datos.data, '');
    console.log('datos', datos);
    const { usuario: login, email, nombres, apellidos, password, image_url = '' } = datos;
    let user = new med_user_1.med_user();
    user.login = login;
    user.email = email;
    user.password_hash = password;
    user.first_name = nombres;
    user.last_name = apellidos;
    user.image_url = image_url;
    user.created_by = 'newBack';
    console.log('datos', user);
    const errors = yield class_validator_1.validate(user);
    if (errors.length > 0) {
        res.status(400).send({ transaccion: false, mensaje: 'Datos Incompletos', error: errors });
        return;
    }
    user.hashPassword();
    console.log('usuario guardado', user);
    let medico = new doctor_1.doctor();
    medico.user = user;
    medico.nombres = nombres;
    medico.apellidos = apellidos;
    const errors2 = yield class_validator_1.validate(medico);
    if (errors2.length > 0) {
        res.status(400).send({ transaccion: false, mensaje: 'Datos Incompletos', error: errors2 });
        return;
    }
    const doctorRepository = typeorm_1.getRepository(doctor_1.doctor);
    try {
        medico = yield doctorRepository.save(medico);
    }
    catch (e) {
        console.log('error', e);
        res.status(409).send({ transaccion: false, mensaje: "No se pudo crear el medico comuniquese con el administrador", error: e });
        return;
    }
    console.log('medico guardado', medico);
    let roles = new med_user_authority_1.med_user_authority();
    roles.user_id = user.id;
    roles.authority_name = 'ROLE_MED';
    const errors3 = yield class_validator_1.validate(roles);
    if (errors3.length > 0) {
        res.status(400).send({ transaccion: false, mensaje: 'No se puede crear el Role, Comuniquese con el Administrador', error: errors3 });
        return;
    }
    const rolesRepository = typeorm_1.getRepository(med_user_authority_1.med_user_authority);
    try {
        yield rolesRepository.save(roles);
    }
    catch (e) {
        console.log('error', e);
        res.status(409).send({ transaccion: false, mensaje: "No se pudo crear el Role comuniquese con el administrador", error: e });
        return;
    }
    res.status(201).send({ transaccion: true, mensaje: 'Usuario creado' });
});
AuthController.changePassword = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const id = res.locals.jwtPayload.userId;
    const { oldPassword, newPassword } = req.body;
    if (!(oldPassword && newPassword)) {
        res.status(400).send();
    }
    const userRepository = typeorm_1.getRepository(User_1.User);
    let user;
    try {
        user = yield userRepository.findOneOrFail(id);
        if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
            res.status(401).send();
            return;
        }
        user.password = newPassword;
        const errors = yield class_validator_1.validate(user);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }
        user.hashPassword();
        userRepository.save(user);
        res.status(204).send();
    }
    catch (id) {
        res.status(401).send();
    }
});
exports.default = AuthController;
//# sourceMappingURL=AuthController.js.map