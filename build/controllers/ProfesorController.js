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
const ProfesorModel_1 = require("../models/ProfesorModel");
const express_validator_1 = require("express-validator");
const profesorRepository = db_1.AppDataSource.getRepository(ProfesorModel_1.ProfesorModel);
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
class ProfesorController {
    constructor() { }
    consultarTodos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Consultando todos los profesores...");
            try {
                const profesores = yield profesorRepository.find();
                res.render('listarProfesores', { pagina: 'Listar Profesores', profesores });
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).send(err.message);
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
                const profesor = yield profesorRepository.findOne({ where: { id: idNumber } });
                if (!profesor) {
                    res.status(404).send("Profesor no encontrado");
                    return;
                }
                res.render('modificarProfesor', { profesor, pagina: 'Modificar Profesor' });
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).send(err.message);
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
                const nuevoProfesor = profesorRepository.create(req.body);
                const profesorGuardado = yield profesorRepository.save(nuevoProfesor);
                res.status(201).json(profesorGuardado);
                return res.redirect('/profesores/listarProfesores');
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
                const profesor = yield profesorRepository.findOne({
                    where: { id: parseInt(id) }
                });
                if (!profesor) {
                    res.sendStatus(404).send('Profesor no encotrado');
                    return;
                }
                profesorRepository.merge(profesor, req.body);
                yield profesorRepository.save(profesor);
                return res.redirect('/profesores/listarProfesores');
            }
            catch (err) {
                if (err instanceof Error) {
                    res.sendStatus((500)).send(err.message);
                }
            }
        });
    }
    eliminar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const idNumber = Number(id);
            if (isNaN(idNumber)) {
                res.status(400).json({ message: 'ID inválido, debe ser un número' });
                return;
            }
            try {
                const resultado = yield profesorRepository.delete(idNumber);
                if (resultado.affected === 0) {
                    res.status(404).json({ message: 'Profesor no encontrado' });
                    return;
                }
                res.json({ message: 'Profesor eliminado correctamente' });
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).send(err.message);
                }
            }
        });
    }
}
exports.default = new ProfesorController();
