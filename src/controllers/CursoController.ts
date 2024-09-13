import { Request, Response } from "express";
import { AppDataSource } from "../db/db";
import { CursoModel } from "../models/CursoModel";

const cursoRepository = AppDataSource.getRepository(CursoModel)

class CursoController {
    constructor() {}

    async consultarTodos(req: Request, res: Response):Promise<void> {
        try{
            const cursos = await cursoRepository.find()
            res.json(cursos)
        }catch (err) {
            if (err instanceof Error) {
                res.status(500).json({message: err.message})
            }
        }
    }

    async consultarUno (req: Request, res: Response):Promise<void> {
        try{
            const curso = await cursoRepository.findOneBy({ id: parseInt(req.params.id) })
            if (!curso) {
                res.status(404).json({ message: "Curso no encontrado"})
            } else {
                res.json(curso)
            }
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).json({message: err.message})
            }
        }
    }

    async insertar (req: Request, res:Response):Promise<void> {
        try {
            const crearCurso = cursoRepository.create(req.body)
            const guardarCurso = await cursoRepository.save(crearCurso)
            res.json(guardarCurso)
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).json({message: err.message})
            }
        }
    }

    async modificar (req: Request, res: Response):Promise<void> {
        try {
            const modificarCurso = await cursoRepository.findOneBy({ id: parseInt(req.params.id) })
            if (!modificarCurso) {
                res.status(500).json({ message: "curso no encontrado"})
                return
            }
            cursoRepository.merge(modificarCurso, req.body)
            const cursoResult = await cursoRepository.save(modificarCurso)
            res.json(modificarCurso)
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).json({message: err.message})
            }
        }
    }

    async eliminar   (req: Request, res: Response):Promise<void> {
        try {
            const eliminarCurso = await cursoRepository.delete({ id: parseInt(req.params.id) })
            if (eliminarCurso.affected === 0) {
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

export default new CursoController()