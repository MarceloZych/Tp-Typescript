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
const db_1 = require("../db/db");
const EstudianteModel_1 = require("../models/EstudianteModel");
const estudianteRepository = db_1.AppDataSource.getRepository(EstudianteModel_1.EstudianteModel);
let estudiantes;
class EstudianteController {
    constructor() { }
    consultarTodos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const todosEstudiantes = yield estudianteRepository.find();
                res.json(todosEstudiantes);
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
            try {
                const estudiante = yield estudianteRepository.findOneBy({ id: parseInt(req.params.id) });
                if (!estudiante) {
                    res.status(404).json({ message: "Curso no encontrado" });
                    return null;
                }
                else {
                    res.json(estudiante);
                    return estudiante;
                }
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
                    return;
                }
                estudianteRepository.merge(modificarEstudiante, req.body);
                const estudianteResult = yield estudianteRepository.save(modificarEstudiante);
                res.json(estudianteResult);
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
