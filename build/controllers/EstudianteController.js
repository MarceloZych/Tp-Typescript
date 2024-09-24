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
const estudianteRepository = db_1.AppDataSource.getRepository(EstudianteModel_1.EstudianteModel);
let estudiantes;
const validar = () => {
    (0, express_validator_1.check)('dni')
        .notEmpty().withMessage('El DNI es obligatorio')
        .isLength({ min: 7 }).withMessage('El DNI debe tener al menos 7 caracteres'),
        (0, express_validator_1.check)('nombre').notEmpty().withMessage('El nombre es obligatorio')
            .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),
        (0, express_validator_1.check)('apellido').notEmpty().withMessage('El pellido es obligatorio')
            .isLength({ min: 3 }).withMessage('El apellido debe tener al menos 3 caracteres');
    (0, express_validator_1.check)('email').notEmpty().withMessage('Debe proporcionar un email valido')
        .isLength({ min: 3 }).withMessage('El email es obligatorio'),
        (req, res, next) => {
            const errores = (0, express_validator_1.validationResult)(req);
            if (!errores.isEmpty()) {
                return res.render('crearEstudiantes', {
                    pagina: 'Crear Estudiante',
                    errores: errores.array()
                });
            }
            next();
        };
};
exports.validar = validar;
class EstudianteController {
    constructor() { }
    consultarTodos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                estudiantes = yield estudianteRepository.find();
                res.render('listarEstudiantes', {
                    pagina: 'Listar Estudiantes',
                    estudiantes
                });
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
                throw new Error('ID inválido, debe ser un número');
            }
            try {
                const estudiante = yield estudianteRepository.findOne({ where: { id: idNumber } });
                if (estudiante) {
                    return estudiante;
                }
                else {
                    return null;
                }
            }
            catch (err) {
                if (err instanceof Error) {
                    throw err;
                }
                else {
                    throw new Error('Error desconocido');
                }
            }
            return null;
        });
    }
    insertar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const estudianteCurso = estudianteRepository.create(req.body);
                const guardarEstudiante = yield estudianteRepository.save(estudianteCurso);
                res.json(guardarEstudiante);
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
            try {
                const modificarEstudiante = yield estudianteRepository.findOneBy({ id: parseInt(req.params.id) });
                if (!modificarEstudiante) {
                    res.status(500).json({ message: "curso no encontrado" });
                    return null;
                }
                return modificarEstudiante;
                /*estudianteRepository.merge(modificarEstudiante, req.body)
                const estudianteResult = await estudianteRepository.save(modificarEstudiante)
                res.json(estudianteResult)*/
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).json({ message: err.message });
                    return null;
                }
            }
            return null;
        });
    }
    eliminar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const eliminarEstudiante = yield estudianteRepository.delete({ id: parseInt(req.params.id) });
                if (eliminarEstudiante.affected === 0) {
                    res.status(404).json({ message: "Curso no encontrado" });
                }
                else {
                    res.status(200).json({ message: "Curso eliminado correctamente" });
                }
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).json({ message: err.message });
                }
            }
        });
    }
}
exports.default = new EstudianteController();
