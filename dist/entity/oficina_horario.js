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
let oficina_horario = class oficina_horario extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], oficina_horario.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], oficina_horario.prototype, "authority_name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], oficina_horario.prototype, "dia_semana", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], oficina_horario.prototype, "hora_inicio", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], oficina_horario.prototype, "hora_fin", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], oficina_horario.prototype, "oficina_id", void 0);
oficina_horario = __decorate([
    typeorm_1.Entity(),
    typeorm_1.Index(["id"], { unique: true })
], oficina_horario);
exports.oficina_horario = oficina_horario;
//# sourceMappingURL=oficina_horario.js.map