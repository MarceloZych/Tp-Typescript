import { Router } from "express"
import CursoController from "../controllers/CursoController"

const routes = Router()

routes.get('/listarCursos', CursoController.consultarTodos)
//routes.get('/crear', CursoController.mostrarCrearCurso);
        
routes.post('/crearCursos', CursoController.insertar)

routes.route('/:id')
        .get(CursoController.consultarUno)
        .put(CursoController.modificar)
        .delete(CursoController.eliminar)

export default routes