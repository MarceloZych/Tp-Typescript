import { Router } from "express"
import InscripcionController from "../controllers/InscripcionController"

const routes = Router()

routes.get('/', InscripcionController.consultarTodos)
routes.get('/xcurso/:id', InscripcionController.consultarUno)
routes.get('/xestudiante/:id', InscripcionController.consultarUno)
routes.post('/', InscripcionController.insertar)

export default routes