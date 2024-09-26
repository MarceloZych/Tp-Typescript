import {Router} from "express";
import EstudianteController from '../controllers/EstudianteController'

const router = Router()

router.get('/listarEstudiantes', EstudianteController.consultarTodos)

router.get('/crearEstudiantes', (req, res) => {
    res.render('crearEstudiantes', {
        pagina: 'Crear Estudiante'
    })
})

router.post('/', EstudianteController.insertar)

router.get('/modificarEstudiante/:id', async (req, res) => {
    try {
        await EstudianteController.consultarUno(req, res)
    } catch (err: unknown) {
        if (err instanceof Error) {
            res.status(500).send(err.message)
        }
    }
})

router.put('/:id', EstudianteController.modificar)

router.delete('/:id', EstudianteController.eliminar)

export default router