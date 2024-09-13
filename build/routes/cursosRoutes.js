"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routes = (0, express_1.Router)();
const cursoController = require('../controllers/cursoController');
routes.get('/', cursoController.consultar);
routes.post('/', cursoController.insertar);
routes.route('/:id')
    .get(cursoController.consultarUno)
    .put(cursoController.modificar)
    .delete(cursoController.eliminar);
exports.default = routes;
