import { Router } from "express"
import CursoController from "../controllers/CursoController"
const routes = Router()

routes.get('/', CursoController.consultarTodos)

routes.post('/', CursoController.insertar)

routes.route('/:id')
        .get(CursoController.consultarUno)
        .put(CursoController.modificar)
        .delete(CursoController.eliminar)

export default routes