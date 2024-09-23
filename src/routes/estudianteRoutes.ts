import {Router} from "express";
import EstudianteController from '../controllers/EstudianteController'

const router = Router()

router.get('/listarEstudiantes', async (req, res) => {
    const estudiantes = await EstudianteController.consultarTodos(req, res)
    res.render('listarEstudiantes', {pagina: 'Listar Estudiantes' ,estudiantes })
})

router.get('/crearEstudiantes', (req, res) => {
    res.render('crearEstudiantes', {
        pagina: 'Crear Estudiante'
    })
})

router.post('/', EstudianteController.insertar)

router.get('/modificarEstudiante/:id', async (req, res) => {
    try {
        const estudiante = await EstudianteController.consultarUno(req, res)
        if (!estudiante) {
            return res.status(404).send('Estudiante no encontrado')
        }
        res.render('modificarEstudiante', {
            estudiante, pagina: 'Modificar Estudiante'
        })
    } catch (err: unknown) {
        if (err instanceof Error) {
            res.status(500).send(err.message)
        }
    }
})
router.put('/:id', EstudianteController.modificar)

router.delete('/:id', EstudianteController.eliminar)

export default router