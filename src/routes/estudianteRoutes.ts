import {Router} from "express";
import estudianteController from '../controllers/EstudianteController'

const router = Router()

router.get('/', estudianteController.consultarTodos)

export default router