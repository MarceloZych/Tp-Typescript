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
exports.CursoModel = void 0;
const typeorm_1 = require("typeorm");
const ProfesorModel_1 = require("./ProfesorModel");
const EstudianteModel_1 = require("./EstudianteModel");
let CursoModel = class CursoModel {
};
exports.CursoModel = CursoModel;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CursoModel.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CursoModel.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], CursoModel.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], CursoModel.prototype, "createAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], CursoModel.prototype, "updateAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ProfesorModel_1.ProfesorModel, profesor => profesor.cursos),
    (0, typeorm_1.JoinColumn)({ name: 'Profesores_id' }),
    __metadata("design:type", ProfesorModel_1.ProfesorModel)
], CursoModel.prototype, "profesor", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => EstudianteModel_1.EstudianteModel),
    (0, typeorm_1.JoinTable)({
        name: 'cursos_estudiantes',
        joinColumn: { name: 'curso_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'estudiante_id', referencedColumnName: 'id' }
    }),
    __metadata("design:type", EstudianteModel_1.EstudianteModel)
], CursoModel.prototype, "estudiante", void 0);
exports.CursoModel = CursoModel = __decorate([
    (0, typeorm_1.Entity)('curso')
], CursoModel);
