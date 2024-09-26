import { Request, Response } from "express";
import { AppDataSource } from "../db/db";
import { CursosEstudiantesModel } from "../models/CursosEstudiantesModel";

const inscripcionRepository = AppDataSource.getRepository(CursosEstudiantesModel)

class InscripcionController {

    constructor() { }

    async consultarTodos(req: Request, res: Response): Promise<void> {
        try {
            const inscripciones = await inscripcionRepository.find();
            res.json(inscripciones);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).json({ message: err.message });
            }
        }
    }

    async consultarUno(req: Request, res: Response): Promise<void> {
        const { estudiante_id, curso_id } = req.params;
        try {
            const inscripcion = await inscripcionRepository.findOneBy({
                estudiante_id: parseInt(estudiante_id),
                curso_id: parseInt(curso_id)
            });

            if (!inscripcion) {
                res.status(404).json({ message: "Inscripción no encontrada" });
                return 
            }

            res.json(inscripcion);

        } catch (err) {
            if (err instanceof Error) {
                res.status(500).json({ message: err.message });
                return 
            }
        }
    }

    async insertar(req: Request, res: Response): Promise<void> {

        try {
            const crearInscripcion = inscripcionRepository.create(req.body);
            const guardarInscripcion = await inscripcionRepository.save(crearInscripcion);
            res.status(201).json(guardarInscripcion); // Cambiar a 201 para creación exitosa
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).json({ message: err.message });
                return 
            }
        }
    }

    async modificar(req: Request, res: Response): Promise<void> {

        const { estudiante_id, curso_id } = req.params;

        try {
            const modificarInscripcion = await inscripcionRepository.findOneBy({
                estudiante_id: parseInt(estudiante_id),
                curso_id: parseInt(curso_id)
            });

            if (!modificarInscripcion) {
                res.status(404).json({ message: "Inscripción no encontrada" });
                return 
            }

            inscripcionRepository.merge(modificarInscripcion, req.body);
            const inscripcionResult = await inscripcionRepository.save(modificarInscripcion);

            res.json(inscripcionResult);

        } catch (err) {
            if (err instanceof Error) {
                res.status(500).json({ message: err.message });
                return 
            }
        }
    }

    async eliminar(req: Request, res: Response): Promise<void> {

        const { estudiante_id, curso_id } = req.params;

        try {
            const eliminarInscripcion = await inscripcionRepository.delete({
                estudiante_id: parseInt(estudiante_id),
                curso_id: parseInt(curso_id)
            });

            if (eliminarInscripcion.affected === 0) {
                res.status(404).json({
                    message: "Inscripción no encontrada"
                });
                return
            }

            res.status(200).json({
                message: "Inscripción eliminada correctamente"
            });

        } catch (err) {
            if (err instanceof Error) {
                res.status(500).json({
                    message: err.message
                })
            }
        }

    }
}

export default new InscripcionController();