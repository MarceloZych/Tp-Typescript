"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const EstudianteController_1 = __importDefault(require("../controllers/EstudianteController"));
const router = (0, express_1.Router)();
router.get('/', EstudianteController_1.default.consultarTodos);
exports.default = router;
