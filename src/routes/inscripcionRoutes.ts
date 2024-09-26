import { Router } from "express"
import InscripcionController from "../controllers/InscripcionController"

const routes = Router()

routes.get('/', InscripcionController.consultarTodos)
routes.get('/curso/:cursoId/inscripciones', InscripcionController.consultarUno)
routes.get('/estudiante/:estudianteId/inscripciones', InscripcionController.consultarUno)
routes.post('/', InscripcionController.insertar)

export default routes