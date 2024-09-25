import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../db/db";
import { EstudianteModel } from "../models/EstudianteModel";
import { check, validationResult } from "express-validator";
import { CursosEstudiantesModel } from "../models/CursosEstudiantesModel";

const estudianteRepository = AppDataSource.getRepository(EstudianteModel);

export const validar = () => [
    check('dni')
        .notEmpty().withMessage('El DNI es obligatorio')
        .isLength({ min: 7 }).withMessage('El DNI debe tener al menos 7 caracteres'),
    check('nombre').notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),
    check('apellido').notEmpty().withMessage('El apellido es obligatorio')
        .isLength({ min: 3 }).withMessage('El apellido debe tener al menos 3 caracteres'),
    check('email').notEmpty().withMessage('Debe proporcionar un email valido')
        .isEmail().withMessage('Formato de email inválido'),
];

class EstudianteController {
    constructor() { }

    async consultarTodos(req: Request, res: Response): Promise<void> {
        try {
            const estudiantes = await estudianteRepository.find();
            res.render('listarEstudiantes', { pagina: 'Listar Estudiantes', estudiantes });
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).json({ message: err.message });
            }
        }
    }

    async consultarUno(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const idNumber = Number(id);
        if (isNaN(idNumber)) {
            res.status(400).json({ message: 'ID inválido, debe ser un número' });
        }
        try {
            const estudiante = await estudianteRepository.findOne({ where: { id: idNumber } });
            if (!estudiante) {
                res.status(404).json({ message: "Estudiante no encontrado" })
            }

            res.json(estudiante);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).json({ message: err.message });
            }
        }
    }

    async insertar(req: Request, res: Response): Promise<void> {
        const errorAlValidar = validationResult(req)
        if (!errorAlValidar.isEmpty()) {
            res.status(400).json({ errorAlValidar: errorAlValidar.array() })
        }

        try {
            const estudianteCurso = estudianteRepository.create(req.body);
            const guardarEstudiante = await estudianteRepository.save(estudianteCurso);
            res.status(201).json(guardarEstudiante)
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).json({ message: err.message });
            }
        }
    }

    async modificar(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const estudiante = await estudianteRepository.findOne({ where: { id: parseInt(id) } })

            if (!estudiante) {
                res.status(404).send('Estudiante no encontrado')
                return
            }

            estudianteRepository.merge(estudiante, req.body)

            await estudianteRepository.save(estudiante)
            
            res.redirect('/estudiantes/listarEstudiantes')
        } catch (error) {
            console.error('Error al modificar el estudiante:', error)
            res.status(500).send('Error del servidor')
        }
    }

    async eliminar(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            await AppDataSource.transaction(async transactionalEntityManager => {
                const cursosEstudiantesRepository = transactionalEntityManager.getRepository(CursosEstudiantesModel);
                const estudianteRepository = transactionalEntityManager.getRepository(EstudianteModel);
    
                const cursosRelacionados = await cursosEstudiantesRepository.count({ where: { estudiante: { id: Number(id) } } });
                if (cursosRelacionados > 0) {
                    throw new Error('Estudiante cursando materias, no se puede eliminar');
                }
                const deleteResult = await estudianteRepository.delete(id);
    
                if (deleteResult.affected === 1) {
                    return res.json({ mensaje: 'Estudiante eliminado' }); 
                } else {
                    throw new Error('Estudiante no encontrado');
                }
            });
        } catch (err: unknown) {
            if (err instanceof Error) {
                res.status(400).json({ mensaje: err.message });
            } else {
                res.status(400).json({ mensaje: 'Error' });
            }
        }
    }
}

export default new EstudianteController();