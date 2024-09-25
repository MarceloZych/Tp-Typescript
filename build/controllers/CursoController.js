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
const CursoModel_1 = require("../models/CursoModel");
const cursoRepository = db_1.AppDataSource.getRepository(CursoModel_1.CursoModel);
class CursoController {
    constructor() { }
    consultarTodos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cursos = yield cursoRepository.find();
                res.json(cursos);
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
                const curso = yield cursoRepository.findOneBy({ id: parseInt(req.params.id) });
                if (!curso) {
                    res.status(404).json({ message: "Curso no encontrado" });
                }
                else {
                    res.json(curso);
                }
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
            try {
                const crearCurso = cursoRepository.create(req.body);
                const guardarCurso = yield cursoRepository.save(crearCurso);
                res.status(201).json(guardarCurso);
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
                const modificarCurso = yield cursoRepository.findOneBy({ id: parseInt(req.params.id) });
                if (!modificarCurso) {
                    res.status(404).json({ message: "curso no encontrado" });
                    return;
                }
                cursoRepository.merge(modificarCurso, req.body);
                const cursoResult = yield cursoRepository.save(modificarCurso);
                res.json(cursoResult);
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
                const eliminarCurso = yield cursoRepository.delete({ id: parseInt(req.params.id) });
                if (eliminarCurso.affected === 0) {
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
exports.default = new CursoController();
