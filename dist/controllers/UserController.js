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
const User_1 = require("../entity/User");
class UserController {
}
UserController.listAll = (_req, res) => __awaiter(this, void 0, void 0, function* () {
    const userRepository = typeorm_1.getRepository(User_1.User);
    const users = yield userRepository.find({
        select: ["id", "username", "role"]
    });
    res.send(users);
});
UserController.getOneById = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const userRepository = typeorm_1.getRepository(User_1.User);
    try {
        const user = yield userRepository.findOneOrFail(id, {
            select: ["id", "username", "role"]
        });
        res.status(404).send(user);
    }
    catch (error) {
        res.status(404).send("User not found");
    }
});
UserController.newUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
    let { username, password, role } = req.body;
    let user = new User_1.User();
    user.username = username;
    user.password = password;
    user.role = role;
    const errors = yield class_validator_1.validate(user);
    if (errors.length > 0) {
        res.status(400).send(errors);
        return;
    }
    user.hashPassword();
    const userRepository = typeorm_1.getRepository(User_1.User);
    try {
        yield userRepository.save(user);
    }
    catch (e) {
        res.status(409).send("username already in use");
        return;
    }
    res.status(201).send("User created");
});
UserController.editUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const id = req.params.id;
    const { username, role } = req.body;
    const userRepository = typeorm_1.getRepository(User_1.User);
    let user;
    try {
        user = yield userRepository.findOneOrFail(id);
    }
    catch (error) {
        res.status(404).send("User not found");
        return;
    }
    user.username = username;
    user.role = role;
    const errors = yield class_validator_1.validate(user);
    if (errors.length > 0) {
        res.status(400).send(errors);
        return;
    }
    try {
        yield userRepository.save(user);
    }
    catch (e) {
        res.status(409).send("username already in use");
        return;
    }
    res.status(204).send();
});
UserController.deleteUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const id = req.params.id;
    const userRepository = typeorm_1.getRepository(User_1.User);
    try {
        console.log('ingresa try');
    }
    catch (error) {
        res.status(404).send("User not found");
        return;
    }
    userRepository.delete(id);
    res.status(204).send();
});
;
exports.default = UserController;
//# sourceMappingURL=UserController.js.map