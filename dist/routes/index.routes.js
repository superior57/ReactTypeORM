"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("./auth.routes"));
const medUser_routes_1 = __importDefault(require("./medUser.routes"));
const medicos_routes_1 = __importDefault(require("./medicos.routes"));
const citas_routes_1 = __importDefault(require("./citas.routes"));
const routes = express_1.Router();
routes.use("/api/auth", auth_routes_1.default);
routes.use("/user", medUser_routes_1.default);
routes.use("/api/medicos", medicos_routes_1.default);
routes.use("/api/citas", citas_routes_1.default);
exports.default = routes;
//# sourceMappingURL=index.routes.js.map