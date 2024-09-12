import { Router } from "express"

const routes: Router = Router()
const cursoController = require('../controllers/cursoController')

routes.get('/', cursoController.consultar)
routes.post('/', cursoController.insertar)

routes.route('/:id')
        .get(cursoController.consultarUno)
        .put(cursoController.modificar)
        .delete(cursoController.eliminar)

export default routes