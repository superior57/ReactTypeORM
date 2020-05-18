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
const Cliente_1 = require("./Cliente");
const Oficina_1 = require("./Oficina");
let Reservas = class Reservas extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Reservas.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], Reservas.prototype, "inicio", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], Reservas.prototype, "fin", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], Reservas.prototype, "fecha_reserva", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Reservas.prototype, "disponible", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Reservas.prototype, "razon_no_disponibilidad", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Reservas.prototype, "canal_reserva", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Reservas.prototype, "estado_reserva", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Reservas.prototype, "transaction_id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Reservas.prototype, "phone_number", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Reservas.prototype, "especializacion_id", void 0);
__decorate([
    typeorm_1.OneToOne(_type => Oficina_1.Oficina, { eager: true }),
    typeorm_1.JoinColumn({ name: 'oficina_id' }),
    __metadata("design:type", Oficina_1.Oficina)
], Reservas.prototype, "oficina", void 0);
__decorate([
    typeorm_1.OneToOne(_type => Cliente_1.Cliente, { eager: true }),
    typeorm_1.JoinColumn({ name: 'cliente_id' }),
    __metadata("design:type", Cliente_1.Cliente)
], Reservas.prototype, "cliente", void 0);
Reservas = __decorate([
    typeorm_1.Entity('reserva'),
    typeorm_1.Index(["id", "transaction_id"], { unique: true })
], Reservas);
exports.Reservas = Reservas;
//# sourceMappingURL=Reservas.js.map