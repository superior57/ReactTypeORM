"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = __importDefault(require("../controllers/AuthController"));
const checkJwt_1 = require("../middlewares/checkJwt");
const router = express_1.Router();
router.post("/medicos/login", AuthController_1.default.login);
router.post("/medicos/registrar", AuthController_1.default.newUser);
router.post("/change-password", [checkJwt_1.checkJwt], AuthController_1.default.changePassword);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map