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
exports.ProfesorModel = void 0;
const typeorm_1 = require("typeorm");
const CursoModel_1 = require("./CursoModel");
let ProfesorModel = class ProfesorModel {
};
exports.ProfesorModel = ProfesorModel;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Object)
], ProfesorModel.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Object)
], ProfesorModel.prototype, "dni", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Object)
], ProfesorModel.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Object)
], ProfesorModel.prototype, "apellido", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Object)
], ProfesorModel.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Object)
], ProfesorModel.prototype, "profesion", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Object)
], ProfesorModel.prototype, "telefono", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Object)
], ProfesorModel.prototype, "createAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Object)
], ProfesorModel.prototype, "updateAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => CursoModel_1.CursoModel, (curso) => curso.profesor),
    __metadata("design:type", Object)
], ProfesorModel.prototype, "cursos", void 0);
exports.ProfesorModel = ProfesorModel = __decorate([
    (0, typeorm_1.Entity)('Profesores')
], ProfesorModel);
