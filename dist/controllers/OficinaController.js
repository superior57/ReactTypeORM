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
const Oficina_1 = require("../entity/Oficina");
class OficinaController {
}
OficinaController.getOneById = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    console.log('/api/oficinas', id);
    const oficinaRepository = typeorm_1.getRepository(Oficina_1.Oficina);
    try {
        const oficinas = yield oficinaRepository.find({ relations: ['medico'], where: { doctor_id: id } });
        res.status(404).send({ transaccion: true, data: oficinas });
    }
    catch (error) {
        console.log('/api/oficinas', id);
        res.status(404).send({ transaccion: false, mensaje: 'Error consultando', error: error });
    }
});
exports.default = OficinaController;
//# sourceMappingURL=OficinaController.js.map