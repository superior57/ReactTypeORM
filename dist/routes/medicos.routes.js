"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const checkJwt_1 = require("../middlewares/checkJwt");
const DoctorController_1 = __importDefault(require("../controllers/DoctorController"));
const router = express_1.Router();
router.get("/:id([0-9]+)", [checkJwt_1.checkJwt], DoctorController_1.default.getOneById);
router.patch("/:id([0-9]+)", [checkJwt_1.checkJwt], DoctorController_1.default.editMedico);
exports.default = router;
//# sourceMappingURL=medicos.routes.js.map