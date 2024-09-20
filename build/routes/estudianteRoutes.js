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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const EstudianteController_1 = __importDefault(require("../controllers/EstudianteController"));
const router = (0, express_1.Router)();
router.get('/listarEstudiantes', EstudianteController_1.default.consultarTodos);
router.get('/crearEstudiantes', (req, res) => {
    res.render('crearEstudiantes', {
        pagina: 'Crear Estudiante'
    });
});
router.post('/crearEstudiante', EstudianteController_1.default.insertar);
router.get('/modificarEstudiante/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const estudiante = yield EstudianteController_1.default.consultarUno(req, res);
        if (!estudiante) {
            return res.status(404).send('Estudiante no encontrado');
        }
        res.render('modificarEstudiante', {
            estudiante
        });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).send(err.message);
        }
    }
}));
router.put('/:id', EstudianteController_1.default.modificar);
router.delete('/:id', EstudianteController_1.default.eliminar);
exports.default = router;
