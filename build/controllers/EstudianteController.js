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
const estudianteRespository = db_1.AppDataSource.getRepository(EstudianteModel_1.EstudianteModel);
const consultarTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const estudiante = yield estudianteRespository.find();
    res.json(estudiante);
});
const consultarUno = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const estudiante = yield estudianteRespository.findOneBy({ id: parseInt(req.params.id) });
    res.json(estudiante);
});
const insertar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const estudiante = estudianteRespository.create(req.body);
    const result = yield estudianteRespository.save(estudiante);
});
const modificar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const estudiante = yield estudianteRespository.findOneBy({ id: parseInt(req.params.id) });
    if (!estudiante) {
        return res.status(404).json({ message: "Curso no encontrado" });
    }
    estudianteRespository.merge(estudiante, req.body);
    const result = yield estudianteRespository.save(estudiante);
    res.json(result);
});
exports.default = { consultarTodos, consultarUno, insertar, modificar };
