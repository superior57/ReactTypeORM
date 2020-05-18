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
const Oficina_1 = require("./Oficina");
let Especializacion = class Especializacion extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Especializacion.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Especializacion.prototype, "nombre", void 0);
__decorate([
    typeorm_1.ManyToMany(_type => Oficina_1.Oficina, oficina => oficina.especializaciones),
    __metadata("design:type", Array)
], Especializacion.prototype, "oficinas", void 0);
Especializacion = __decorate([
    typeorm_1.Entity('especializacion'),
    typeorm_1.Index(["id"], { unique: true })
], Especializacion);
exports.Especializacion = Especializacion;
//# sourceMappingURL=Especializacion.js.map