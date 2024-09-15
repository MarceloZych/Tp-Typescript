import { Request, Response } from "express";
import { AppDataSource } from "../db/db";
import { CursoEstudianteModel } from "../models/CursoEstudianteModel";

const inscripcionRepository = AppDataSource.getRepository(CursoEstudianteModel)

class InscripcionController {
    constructor() {}

    async consultarTodos(req: Request, res: Response):Promise<void> {
        try{
            const inscripcion = await inscripcionRepository.find()
            res.json(inscripcion)
        }catch (err) {
            if (err instanceof Error) {
                res.status(500).json({message: err.message})
            }
        }
    }

    async consultarUno (req: Request, res: Response):Promise<void> {
        const { estudiante_id, curso_id } = req.params
        try{
            const inscripcion = await inscripcionRepository.findOneBy({ estudiante_id: parseInt(estudiante_id), curso_id: parseInt(curso_id) })
            if (!inscripcion) {
                res.status(404).json({ message: "Inscripcion no encontrado"})
            } else {
                res.json(inscripcion)
            }
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).json({message: err.message})
            }
        }
    }

    async insertar (req: Request, res:Response):Promise<void> {
        try {
            const crearInscripcion = inscripcionRepository.create(req.body)
            const guardarInscripcion = await inscripcionRepository.save(crearInscripcion)
            res.json(guardarInscripcion)
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).json({message: err.message})
            }
        }
    }

    async modificar (req: Request, res: Response):Promise<void> {
        const { estudiante_id, curso_id } = req.params
        try {
            const modificarInscripcion = await inscripcionRepository.findOneBy({ estudiante_id: parseInt(estudiante_id), curso_id: parseInt(curso_id) })
            if (!modificarInscripcion) {
                res.status(500).json({ message: "curso no encontrado"})
                return
            }
            inscripcionRepository.merge(modificarInscripcion, req.body)
            const inscripcionResult = await inscripcionRepository.save(modificarInscripcion)
            res.json(modificarInscripcion)
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).json({message: err.message})
            }
        }
    }

    async eliminar   (req: Request, res: Response):Promise<void> {
        const { estudiante_id, curso_id } = req.params
        try {
            const eliminarInscripcion = await inscripcionRepository.delete({ estudiante_id: parseInt(estudiante_id), curso_id: parseInt(curso_id) })
            if (eliminarInscripcion.affected === 0) {
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

export default new InscripcionController()