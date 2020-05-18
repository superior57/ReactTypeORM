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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const med_user_1 = require("./med_user");
let Cliente = class Cliente extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Cliente.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar" }),
    __metadata("design:type", String)
], Cliente.prototype, "cedula_identidad", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Cliente.prototype, "cedula_representante", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Cliente.prototype, "titulo_honorifico", void 0);
__decorate([
    typeorm_1.Column({ nullable: false, type: "varchar" }),
    __metadata("design:type", String)
], Cliente.prototype, "nombres", void 0);
__decorate([
    typeorm_1.Column({ nullable: false, type: "varchar" }),
    __metadata("design:type", String)
], Cliente.prototype, "apellidos", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Cliente.prototype, "nombres_padre", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Cliente.prototype, "nombres_madre", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Cliente.prototype, "direccion", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Cliente.prototype, "ciudad", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Cliente.prototype, "pais", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Cliente.prototype, "sexo", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Cliente.prototype, "telefono", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Cliente.prototype, "celular", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Cliente.prototype, "fecha_nacimiento", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Cliente.prototype, "tipo_sangre", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Cliente.prototype, "foto_perfil", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Cliente.prototype, "foto_perfil_content_type", void 0);
__decorate([
    typeorm_1.OneToOne(_type => med_user_1.med_user, { cascade: true }),
    typeorm_1.JoinColumn({ name: 'user_id' }),
    __metadata("design:type", med_user_1.med_user)
], Cliente.prototype, "user", void 0);
Cliente = __decorate([
    typeorm_1.Entity('cliente'),
    typeorm_1.Index(["id"], { unique: true })
], Cliente);
exports.Cliente = Cliente;
//# sourceMappingURL=Cliente.js.map