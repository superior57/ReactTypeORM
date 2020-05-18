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
const doctor_1 = require("./doctor");
const Especializacion_1 = require("./Especializacion");
let Oficina = class Oficina extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Oficina.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Oficina.prototype, "tiempo_por_cliente_minutos", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Oficina.prototype, "costo_primera_consulta", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Oficina.prototype, "costo_consulta", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Oficina.prototype, "direccion", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Oficina.prototype, "ciudad", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Oficina.prototype, "provincia", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Oficina.prototype, "pais", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Oficina.prototype, "codigo_zip", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Oficina.prototype, "referencias_fisicas", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Oficina.prototype, "longitud", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Oficina.prototype, "latitud", void 0);
__decorate([
    typeorm_1.ManyToOne(_type => doctor_1.doctor, doctor => doctor.oficinas, { onDelete: "CASCADE" }),
    typeorm_1.JoinColumn({ name: 'doctor_id' }),
    __metadata("design:type", doctor_1.doctor)
], Oficina.prototype, "medico", void 0);
__decorate([
    typeorm_1.ManyToMany(_type => Especializacion_1.Especializacion, especializacion => especializacion.oficinas),
    typeorm_1.JoinTable({ name: "oficina_especializaciones" }),
    __metadata("design:type", Array)
], Oficina.prototype, "especializaciones", void 0);
Oficina = __decorate([
    typeorm_1.Entity('oficina'),
    typeorm_1.Index(["id"], { unique: true })
], Oficina);
exports.Oficina = Oficina;
//# sourceMappingURL=Oficina.js.map