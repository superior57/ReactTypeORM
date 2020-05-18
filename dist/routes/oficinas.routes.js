"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const checkJwt_1 = require("../middlewares/checkJwt");
const OficinaController_1 = __importDefault(require("../controllers/OficinaController"));
const router = express_1.Router();
router.get('/:id([0-9]+)', [checkJwt_1.checkJwt], OficinaController_1.default.getOneById);
exports.default = router;
//# sourceMappingURL=oficinas.routes.js.map