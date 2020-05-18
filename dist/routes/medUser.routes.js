"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = __importDefault(require("../controllers/UserController"));
const checkJwt_1 = require("../middlewares/checkJwt");
const router = express_1.Router();
router.get("/", [checkJwt_1.checkJwt], UserController_1.default.listAll);
router.get("/:id([0-9]+)", [checkJwt_1.checkJwt], UserController_1.default.getOneById);
router.post("/", [checkJwt_1.checkJwt], UserController_1.default.newUser);
router.patch("/:id([0-9]+)", [checkJwt_1.checkJwt], UserController_1.default.editUser);
router.delete("/:id([0-9]+)", [checkJwt_1.checkJwt], UserController_1.default.deleteUser);
exports.default = router;
//# sourceMappingURL=medUser.routes.js.map