import { Router } from "express"

const routes: Router = Router()
const profesorController = require('../controllers/profesorController')

routes.get('/', profesorController.consultar)
routes.post('/', profesorController.insertar)

routes.route('/:id')
        .get(profesorController.consultarUno)
        .put(profesorController.modificar)
        .delete(profesorController.eliminar)

export default routes