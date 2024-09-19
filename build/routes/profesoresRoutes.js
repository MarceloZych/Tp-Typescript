"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProfesorController_1 = __importDefault(require("../controllers/ProfesorController"));
const routes = (0, express_1.Router)();
routes.get('/', ProfesorController_1.default.consultarTodos);
routes.post('/', ProfesorController_1.default.insertar);
routes.route('/:id')
    .get(ProfesorController_1.default.consultarUno)
    .put(ProfesorController_1.default.modificar)
    .delete(ProfesorController_1.default.eliminar);
exports.default = routes;
