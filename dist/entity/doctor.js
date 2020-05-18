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
const Oficina_1 = require("./Oficina");
let doctor = class doctor extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], doctor.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, type: "varchar" }),
    __metadata("design:type", String)
], doctor.prototype, "titulo_honorifico", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], doctor.prototype, "nombres", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], doctor.prototype, "apellidos", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, type: "varchar" }),
    __metadata("design:type", String)
], doctor.prototype, "declaracion_profesional", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, type: "varchar" }),
    __metadata("design:type", Date)
], doctor.prototype, "practica_desde", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, type: "varchar" }),
    __metadata("design:type", String)
], doctor.prototype, "numero_telefono", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, type: "varchar" }),
    __metadata("design:type", Boolean)
], doctor.prototype, "activado", void 0);
__decorate([
    typeorm_1.OneToOne(_type => med_user_1.med_user, { cascade: true }),
    typeorm_1.JoinColumn({ name: 'user_id' }),
    __metadata("design:type", med_user_1.med_user)
], doctor.prototype, "user", void 0);
__decorate([
    typeorm_1.OneToMany(_type => Oficina_1.Oficina, oficina => oficina.medico),
    __metadata("design:type", Array)
], doctor.prototype, "oficinas", void 0);
doctor = __decorate([
    typeorm_1.Entity(),
    typeorm_1.Index(["id"], { unique: true })
], doctor);
exports.doctor = doctor;
//# sourceMappingURL=doctor.js.map