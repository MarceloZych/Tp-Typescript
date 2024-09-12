import {Router} from "express";
import estudianteController from '../controllers/EstudianteController'

const router:Router = Router()

router.get('/', estudianteController.consultarTodos)

export default router