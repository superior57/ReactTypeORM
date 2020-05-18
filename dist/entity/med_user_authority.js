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
let med_user_authority = class med_user_authority extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryColumn('int'),
    __metadata("design:type", Number)
], med_user_authority.prototype, "user_id", void 0);
__decorate([
    typeorm_1.PrimaryColumn('character'),
    __metadata("design:type", String)
], med_user_authority.prototype, "authority_name", void 0);
med_user_authority = __decorate([
    typeorm_1.Entity(),
    typeorm_1.Index(["user_id", "authority_name"], { unique: true })
], med_user_authority);
exports.med_user_authority = med_user_authority;
//# sourceMappingURL=med_user_authority.js.map