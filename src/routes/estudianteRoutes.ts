import express from "express";

const router = express.Router()

import estudianteController from '../controllers/EstudianteController'

router.get('/', estudianteController.consultarTodos)