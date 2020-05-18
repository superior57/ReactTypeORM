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
const User_1 = require("../entity/User");
exports.checkRole = (roles) => {
    return (_req, res, next) => __awaiter(this, void 0, void 0, function* () {
        const id = res.locals.jwtPayload.userId;
        const userRepository = typeorm_1.getRepository(User_1.User);
        let user;
        try {
            user = yield userRepository.findOneOrFail(id);
            if (roles.indexOf(user.role) > -1)
                next();
            else
                res.status(401).send();
        }
        catch (id) {
            res.status(401).send();
        }
    });
};
//# sourceMappingURL=checkRole.js.map