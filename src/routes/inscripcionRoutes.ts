import { Router } from "express"

const routes: Router = Router()
const InscripcionController = require('../controllers/inscripcionController')

routes.get('/', InscripcionController.consultarTodos)
routes.get('/xcurso/:id', InscripcionController.consultarxCurso)
routes.get('/xestudiante/:id', InscripcionController.consultarxEstudiante)
routes.post('/', InscripcionController.inscribir)

export default routes