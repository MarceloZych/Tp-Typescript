"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CursoController_1 = __importDefault(require("../controllers/CursoController"));
const routes = (0, express_1.Router)();
routes.get('/listarCursos', CursoController_1.default.consultarTodos);
routes.get('/crear', CursoController_1.default.mostrarCrearCurso);
routes.post('/crearCursos', CursoController_1.default.insertar);
routes.route('/:id')
    .get(CursoController_1.default.consultarUno)
    .put(CursoController_1.default.modificar)
    .delete(CursoController_1.default.eliminar);
exports.default = routes;
