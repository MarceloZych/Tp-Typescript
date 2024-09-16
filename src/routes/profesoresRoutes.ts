import { Router } from "express"
import ProfesorController from "../controllers/ProfesorController"

const routes = Router()

routes.get('/', ProfesorController.consultarTodos)
routes.post('/', ProfesorController.insertar)

routes.route('/:id')
        .get(ProfesorController.consultarUno)
        .put(ProfesorController.modificar)
        .delete(ProfesorController.eliminar)

export default routes