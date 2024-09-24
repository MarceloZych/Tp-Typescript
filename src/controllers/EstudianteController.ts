import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../db/db";
import { EstudianteModel } from "../models/EstudianteModel";
import { check, validationResult } from "express-validator";

const estudianteRepository = AppDataSource.getRepository(EstudianteModel)

let estudiantes: EstudianteModel[]

export const validar = () => {
    check('dni')
            .notEmpty().withMessage('El DNI es obligatorio')
            .isLength({ min: 7 }).withMessage('El DNI debe tener al menos 7 caracteres'),
    check('nombre').notEmpty().withMessage('El nombre es obligatorio')
            .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),
    check('apellido').notEmpty().withMessage('El pellido es obligatorio')
            .isLength({ min: 3 }).withMessage('El apellido debe tener al menos 3 caracteres')
    check('email').notEmpty().withMessage('Debe proporcionar un email valido')
            .isLength({min: 3 }).withMessage('El email es obligatorio'),
    (req:Request, res:Response, next:NextFunction) => {
        const errores = validationResult(req)
        if (!errores.isEmpty()) {
            return res.render('crearEstudiantes', {
                pagina: 'Crear Estudiante',
                errores: errores.array()
            })
        }
        next()
    }
}

class EstudianteController {
    constructor() { }

    async consultarTodos(req: Request, res: Response) {
        try {
            estudiantes = await estudianteRepository.find()
            res.render('listarEstudiantes', {
                pagina: 'Listar Estudiantes',
                estudiantes
            })
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).json({ message: err.message })
            }
        }
    }

    async consultarUno(req: Request, res: Response): Promise<EstudianteModel | null> {
        const { id } = req.params
        const idNumber = Number(id)
        if (isNaN(idNumber)) {
            throw new Error('ID inválido, debe ser un número');
        }
        try {
            const estudiante = await estudianteRepository.findOne({ where: { id: idNumber} })
            if (estudiante) {
                return estudiante
            } else {
                return null
            }
        } catch (err) {
            if (err instanceof Error) {
                throw err; 
            } else {
                throw new Error('Error desconocido');
            }
        }
        return null
    }

    async insertar(req: Request, res: Response): Promise<void> {
        
        try {
            const estudianteCurso = estudianteRepository.create(req.body)
            const guardarEstudiante = await estudianteRepository.save(estudianteCurso)
            res.json(guardarEstudiante)
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).json({ message: err.message })
            }
        }
    }

    async modificar(req: Request, res: Response): Promise<EstudianteModel | null> {
        try {
            const modificarEstudiante = await estudianteRepository.findOneBy({ id: parseInt(req.params.id) })
            if (!modificarEstudiante) {
                res.status(500).json({ message: "curso no encontrado" })
                return null
            }
            return modificarEstudiante
            /*estudianteRepository.merge(modificarEstudiante, req.body)
            const estudianteResult = await estudianteRepository.save(modificarEstudiante)
            res.json(estudianteResult)*/
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).json({ message: err.message })
                return null
            }
        }
        return null
    }

    async eliminar(req: Request, res: Response): Promise<void> {
        try {
            const eliminarEstudiante = await estudianteRepository.delete({ id: parseInt(req.params.id) })
            if (eliminarEstudiante.affected === 0) {
                res.status(404).json({ message: "Curso no encontrado" })
            } else {
                res.status(200).json({ message: "Curso eliminado correctamente" })
            }
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).json({ message: err.message })
            }
        }
    }
}

export default new EstudianteController()