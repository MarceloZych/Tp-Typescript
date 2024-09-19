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
exports.CursoEstudianteModel = void 0;
const typeorm_1 = require("typeorm");
const EstudianteModel_1 = require("./EstudianteModel");
const CursoModel_1 = require("./CursoModel");
let CursoEstudianteModel = class CursoEstudianteModel {
};
exports.CursoEstudianteModel = CursoEstudianteModel;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], CursoEstudianteModel.prototype, "estudiante_id", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], CursoEstudianteModel.prototype, "curso_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], CursoEstudianteModel.prototype, "nota", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], CursoEstudianteModel.prototype, "fecha", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => EstudianteModel_1.EstudianteModel, (estudiante) => estudiante.curso),
    (0, typeorm_1.JoinColumn)({ name: 'estudiante_id' }),
    __metadata("design:type", EstudianteModel_1.EstudianteModel)
], CursoEstudianteModel.prototype, "estudiante", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => CursoModel_1.CursoModel, (curso) => curso.estudiante),
    (0, typeorm_1.JoinColumn)({ name: 'curso_id' }),
    __metadata("design:type", CursoModel_1.CursoModel)
], CursoEstudianteModel.prototype, "curso", void 0);
exports.CursoEstudianteModel = CursoEstudianteModel = __decorate([
    (0, typeorm_1.Entity)('cursos_estudiantes')
], CursoEstudianteModel);
