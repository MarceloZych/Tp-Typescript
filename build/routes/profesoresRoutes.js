"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routes = (0, express_1.Router)();
const profesorController = require('../controllers/profesorController');
routes.get('/', profesorController.consultar);
routes.post('/', profesorController.insertar);
routes.route('/:id')
    .get(profesorController.consultarUno)
    .put(profesorController.modificar)
    .delete(profesorController.eliminar);
exports.default = routes;
