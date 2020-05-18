"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const bcrypt = __importStar(require("bcryptjs"));
let med_user = class med_user extends typeorm_1.BaseEntity {
    hashPassword() {
        this.password_hash = bcrypt.hashSync(this.password_hash, 10);
    }
    checkIfUnencryptedPasswordIsValid(unencryptedPassword) {
        return bcrypt.compareSync(unencryptedPassword, this.password_hash);
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], med_user.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], med_user.prototype, "login", void 0);
__decorate([
    typeorm_1.Column(), class_validator_1.Length(5, 200),
    __metadata("design:type", String)
], med_user.prototype, "password_hash", void 0);
__decorate([
    typeorm_1.Column(), class_validator_1.Length(3, 50),
    __metadata("design:type", String)
], med_user.prototype, "first_name", void 0);
__decorate([
    typeorm_1.Column(), class_validator_1.Length(3, 50),
    __metadata("design:type", String)
], med_user.prototype, "last_name", void 0);
__decorate([
    typeorm_1.Column(), class_validator_1.Length(5, 191),
    __metadata("design:type", String)
], med_user.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], med_user.prototype, "image_url", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], med_user.prototype, "activated", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], med_user.prototype, "lang_key", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], med_user.prototype, "activation_key", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], med_user.prototype, "reset_key", void 0);
__decorate([
    typeorm_1.Column({ default: () => 'newBack' }),
    __metadata("design:type", String)
], med_user.prototype, "created_by", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], med_user.prototype, "last_modified_by", void 0);
__decorate([
    typeorm_1.Column(), typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], med_user.prototype, "reset_date", void 0);
__decorate([
    typeorm_1.Column(), typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], med_user.prototype, "created_date", void 0);
__decorate([
    typeorm_1.Column(), typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], med_user.prototype, "last_modified_date", void 0);
med_user = __decorate([
    typeorm_1.Entity(),
    typeorm_1.Unique(["login", "email"])
], med_user);
exports.med_user = med_user;
//# sourceMappingURL=med_user.js.map