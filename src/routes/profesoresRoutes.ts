import { Router } from "express";
import ProfesorController from "../controllers/ProfesorController";

const router = Router();

router.get('/listarProfesores', ProfesorController.consultarTodos);

router.get('/crearProfesores', (req, res) => {
    res.render('crearProfesores', {
        pagina: 'Crear Estudiante'
    })
})

router.post('/', ProfesorController.insertar);

router.get('/modificarProfesor/:id', async (req, res) => {
    try {
        await ProfesorController.consultarUno(req, res)
    } catch (err: unknown) {
        if (err instanceof Error) {
            res.status(500).send(err.message)
        }
    }
})

router.put('/:id', ProfesorController.modificar)

router.delete('/:id', ProfesorController.eliminar);

export default router;