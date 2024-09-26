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
const CursoModel_1 = require("../models/CursoModel");
const ProfesorModel_1 = require("../models/ProfesorModel");
const express_validator_1 = require("express-validator");
const cursoRepository = db_1.AppDataSource.getRepository(CursoModel_1.CursoModel);
const profesorRepository = db_1.AppDataSource.getRepository(ProfesorModel_1.ProfesorModel);
const validar = () => {
    (0, express_validator_1.check)('nombre')
        .notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ min: 3 }).withMessage('el nombre debe tener al menos 3 caracteres');
};
exports.validar = validar;
class CursoController {
    constructor() { }
    consultarTodos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cursos = yield cursoRepository.find({
                    relations: ['profesor', 'estudiantes']
                });
                res.render('listarCursos', { listaCursos: cursos, pagina: 'Listar Cursos' });
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
                return;
            }
            try {
                const curso = yield cursoRepository.findOne({
                    where: { id: idNumber },
                    relations: ['profesor', 'estudiantes']
                });
                if (!curso) {
                    res.status(404).json({ message: "Estudiante no encontrado" });
                    return;
                }
                res.render('modificarCurso', { curso, pagina: 'Modificar Curso' });
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).json({ message: err.message });
                }
            }
        });
    }
    mostrarCrearCurso(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const profesores = yield profesorRepository.find(); // Obtener todos los profesores
                res.render('crearCursos', { profesores, pagina: 'Crear Curso' }); // Pasar profesores a la vista
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
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array() });
                return;
            }
            try {
                const crearCurso = cursoRepository.create(req.body);
                const guardarCurso = yield cursoRepository.save(crearCurso);
                res.status(201).json(guardarCurso);
                return res.redirect('cursos/listarCursos');
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
                const modificarCurso = yield cursoRepository.findOne({ where: { id: parseInt(id) } });
                if (!modificarCurso) {
                    res.status(404).json({ message: "Curso no encontrado" });
                    return;
                }
                cursoRepository.merge(modificarCurso, req.body);
                yield cursoRepository.save(modificarCurso);
                return res.redirect('/cursos/listarCursos');
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).json({ message: err.message });
                }
            }
        });
    }
    eliminar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const eliminarCurso = yield cursoRepository.delete({ id: parseInt(req.params.id) });
                if (eliminarCurso.affected === 0) {
                    res.status(404).json({ message: "Curso no encontrado" });
                    return;
                }
                res.status(200).json({ message: "Curso eliminado correctamente" });
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).json({ message: err.message });
                }
            }
        });
    }
}
exports.default = new CursoController();
