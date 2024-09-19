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
exports.EstudianteModel = void 0;
const typeorm_1 = require("typeorm");
const CursoModel_1 = require("./CursoModel");
let EstudianteModel = class EstudianteModel {
};
exports.EstudianteModel = EstudianteModel;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], EstudianteModel.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], EstudianteModel.prototype, "dni", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EstudianteModel.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EstudianteModel.prototype, "apellido", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EstudianteModel.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EstudianteModel.prototype, "profesion", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EstudianteModel.prototype, "telefono", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], EstudianteModel.prototype, "createAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], EstudianteModel.prototype, "updateAt", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => CursoModel_1.CursoModel),
    (0, typeorm_1.JoinTable)({
        name: 'curso_estudiantes',
        joinColumn: { name: 'estudiante_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'curso_id', referencedColumnName: 'id' }
    }),
    __metadata("design:type", Array)
], EstudianteModel.prototype, "curso", void 0);
exports.EstudianteModel = EstudianteModel = __decorate([
    (0, typeorm_1.Entity)()
], EstudianteModel);
