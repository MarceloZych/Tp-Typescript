"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validar = void 0;
const db_1 = require("../db/db");
const EstudianteModel_1 = require("../models/EstudianteModel");
const express_validator_1 = require("express-validator");
const CursosEstudiantesModel_1 = require("../models/CursosEstudiantesModel");
const estudianteRepository = db_1.AppDataSource.getRepository(EstudianteModel_1.EstudianteModel);
const validar = () => [
    (0, express_validator_1.check)('dni')
        .notEmpty().withMessage('El DNI es obligatorio')
        .isLength({ min: 7 }).withMessage('El DNI debe tener al menos 7 caracteres'),
    (0, express_validator_1.check)('nombre').notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),
    (0, express_validator_1.check)('apellido').notEmpty().withMessage('El apellido es obligatorio')
        .isLength({ min: 3 }).withMessage('El apellido debe tener al menos 3 caracteres'),
    (0, express_validator_1.check)('email').notEmpty().withMessage('Debe proporcionar un email valido')
        .isEmail().withMessage('Formato de email inválido'),
];
exports.validar = validar;
class EstudianteController {
    constructor() { }
    consultarTodos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const estudiantes = yield estudianteRepository.find();
                res.render('listarEstudiantes', { pagina: 'Listar Estudiantes', estudiantes });
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).json({ message: err.message });
                }
            }
        });
    }
    consultarUno(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const idNumber = Number(id);
            if (isNaN(idNumber)) {
                res.status(400).json({ message: 'ID inválido, debe ser un número' });
            }
            try {
                const estudiante = yield estudianteRepository.findOne({ where: { id: idNumber } });
                if (!estudiante) {
                    res.status(404).json({ message: "Estudiante no encontrado" });
                }
                res.json(estudiante);
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).json({ message: err.message });
                }
            }
        });
    }
    insertar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errorAlValidar = (0, express_validator_1.validationResult)(req);
            if (!errorAlValidar.isEmpty()) {
                res.status(400).json({ errorAlValidar: errorAlValidar.array() });
            }
            try {
                const estudianteCurso = estudianteRepository.create(req.body);
                const guardarEstudiante = yield estudianteRepository.save(estudianteCurso);
                res.status(201).json(guardarEstudiante);
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).json({ message: err.message });
                }
            }
        });
    }
    modificar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const estudiante = yield estudianteRepository.findOne({ where: { id: parseInt(id) } });
                if (!estudiante) {
                    res.status(404).send('Estudiante no encontrado');
                    return;
                }
                estudianteRepository.merge(estudiante, req.body);
                yield estudianteRepository.save(estudiante);
                res.redirect('/estudiantes/listarEstudiantes');
            }
            catch (error) {
                console.error('Error al modificar el estudiante:', error);
                res.status(500).send('Error del servidor');
            }
        });
    }
    eliminar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield db_1.AppDataSource.transaction((transactionalEntityManager) => __awaiter(this, void 0, void 0, function* () {
                    const cursosEstudiantesRepository = transactionalEntityManager.getRepository(CursosEstudiantesModel_1.CursosEstudiantesModel);
                    const estudianteRepository = transactionalEntityManager.getRepository(EstudianteModel_1.EstudianteModel);
                    const cursosRelacionados = yield cursosEstudiantesRepository.count({ where: { estudiante: { id: Number(id) } } });
                    if (cursosRelacionados > 0) {
                        throw new Error('Estudiante cursando materias, no se puede eliminar');
                    }
                    const deleteResult = yield estudianteRepository.delete(id);
                    if (deleteResult.affected === 1) {
                        return res.json({ mensaje: 'Estudiante eliminado' });
                    }
                    else {
                        throw new Error('Estudiante no encontrado');
                    }
                }));
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(400).json({ mensaje: err.message });
                }
                else {
                    res.status(400).json({ mensaje: 'Error' });
                }
            }
        });
    }
}
exports.default = new EstudianteController();
