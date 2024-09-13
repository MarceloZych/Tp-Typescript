import { Request, Response } from "express";
import { AppDataSource } from "../db/db";
import { EstudianteModel } from "../models/EstudianteModel";

const estudianteRepository = AppDataSource.getRepository(EstudianteModel)

class EstudianteController {
    constructor() {}

    async consultarTodos(req: Request, res: Response):Promise<void> {
        try{
            const estudiante = await estudianteRepository.find()
            res.json(estudiante)
        }catch (err) {
            if (err instanceof Error) {
                res.status(500).json({message: err.message})
            }
        }
    }

    async consultarUno (req: Request, res: Response):Promise<void> {
        try{
            const estudiante = await estudianteRepository.findOneBy({ id: parseInt(req.params.id) })
            if (!estudiante) {
                res.status(404).json({ message: "Curso no encontrado"})
            } else {
                res.json(estudiante)
            }
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).json({message: err.message})
            }
        }
    }

    async insertar (req: Request, res:Response):Promise<void> {
        try {
            const estudianteCurso = estudianteRepository.create(req.body)
            const guardarEstudiante = await estudianteRepository.save(estudianteCurso)
            res.json(guardarEstudiante)
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).json({message: err.message})
            }
        }
    }

    async modificar (req: Request, res: Response):Promise<void> {
        try {
            const modificarEstudiante = await estudianteRepository.findOneBy({ id: parseInt(req.params.id) })
            if (!modificarEstudiante) {
                res.status(500).json({ message: "curso no encontrado"})
                return
            }
            estudianteRepository.merge(modificarEstudiante, req.body)
            const estudianteResult = await estudianteRepository.save(modificarEstudiante)
            res.json(estudianteResult)
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).json({message: err.message})
            }
        }
    }

    async eliminar   (req: Request, res: Response):Promise<void> {
        try {
            const eliminarEstudiante = await estudianteRepository.delete({ id: parseInt(req.params.id) })
            if (eliminarEstudiante.affected === 0) {
                res.status(404).json({ message: "Curso no encontrado" })
            } else {
                res.status(200).json({ message: "Curso eliminado correctamente"})
            }
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).json({message: err.message})
            }
        }
    }
}

export default new EstudianteController()