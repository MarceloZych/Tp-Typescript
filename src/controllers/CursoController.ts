import { Request, Response } from "express";
import { AppDataSource } from "../db/db";
import { CursoModel } from "../models/CursoModel";
import { ProfesorModel } from "../models/ProfesorModel";
import { check, validationResult } from "express-validator";

const cursoRepository = AppDataSource.getRepository(CursoModel);
const profesorRepository = AppDataSource.getRepository(ProfesorModel);

export const validar = () => {
    check('nombre')
        .notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ min: 3 }).withMessage('el nombre debe tener al menos 3 caracteres')
}

class CursoController {
    constructor() { }

    async consultarTodos(req: Request, res: Response): Promise<void> {
        try {
            const cursos = await cursoRepository.find({
                relations: ['profesor', 'estudiantes']
            });
            res.render('listarCursos', {listaCursos: cursos, pagina: 'Listar Cursos'})
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
            return;
        }
        try {
            const curso = await cursoRepository.findOne({ 
                where: { id: idNumber },
                relations: ['profesor', 'estudiantes']
            });
            if (!curso) {
                res.status(404).json({ message: "Estudiante no encontrado" });
                return;
            }
            res.render('modificarCurso', {curso, pagina: 'Modificar Curso'})
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).json({ message: err.message });
            }
        }
    }

    /*async mostrarCrearCurso(req: Request, res: Response): Promise<void> {
        try {
            const profesores = await profesorRepository.find(); // Obtener todos los profesores
            res.render('crearCursos', { profesores, pagina: 'Crear Curso' }); // Pasar profesores a la vista
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).json({ message: err.message });
            }
        }
    }*/

    async insertar(req: Request, res: Response): Promise<void> {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }

        try {
            const crearCurso = cursoRepository.create(req.body);
            const guardarCurso = await cursoRepository.save(crearCurso);
            res.status(201).json(guardarCurso);
            return res.redirect('cursos/listarCursos')
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).json({ message: err.message });
            }
        }
    }

    async modificar(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const modificarCurso = await cursoRepository.findOne({ where: { id: parseInt(id) } });
            
            if (!modificarCurso) {
                res.status(404).json({ message: "Curso no encontrado" });
                return
            }

            cursoRepository.merge(modificarCurso, req.body);
            await cursoRepository.save(modificarCurso);

            return res.redirect('/cursos/listarCursos')
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).json({ message: err.message });
            }
        }
    }

    async eliminar(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const eliminarCurso = await cursoRepository.delete({ id: parseInt(req.params.id) });

            if (eliminarCurso.affected === 0) {
                res.status(404).json({ message: "Curso no encontrado" });
                return
            }

            res.status(200).json({ message: "Curso eliminado correctamente" });
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).json({ message: err.message });
            }
        }
    }
}

export default new CursoController();