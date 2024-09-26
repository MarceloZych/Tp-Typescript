import { Request, Response } from "express";
import { AppDataSource } from "../db/db";
import { ProfesorModel } from "../models/ProfesorModel";
import { check, validationResult } from "express-validator";

const profesorRepository = AppDataSource.getRepository(ProfesorModel);

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

class ProfesorController {

    constructor() { }

    async consultarTodos(req: Request, res: Response): Promise<void> {
        console.log("Consultando todos los profesores...");
        try {
            const profesores = await profesorRepository.find();
            res.render('listarProfesores', { pagina: 'Listar Profesores', profesores});
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
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
            const profesor = await profesorRepository.findOne({ where: { id:idNumber } });
            if (!profesor) {
                res.status(404).send("Profesor no encontrado");
                return;
            }
            res.render('modificarProfesor', {profesor, pagina: 'Modificar Profesor'});
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }

    async insertar(req: Request, res: Response): Promise<void> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return
        }

        try {
            const nuevoProfesor = profesorRepository.create(req.body);
            const profesorGuardado = await profesorRepository.save(nuevoProfesor);
            res.status(201).json(profesorGuardado);
            return res.redirect('/profesores/listarProfesores');
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).json({ message: err.message });
            }
        }
    }

    async modificar(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const profesor = await profesorRepository.findOne({
                where : {id: parseInt(id)}
            });

            if (!profesor) {
                res.sendStatus(404).send('Profesor no encotrado');
                return
            }

            profesorRepository.merge(profesor, req.body);
            await profesorRepository.save(profesor);
            return res.redirect('/profesores/listarProfesores');
        } catch (err) {
            if (err instanceof Error) {
                res.sendStatus((500)).send(err.message);
            }
        }
    }


    async eliminar(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const idNumber = Number(id);
    
        if (isNaN(idNumber)) {
            res.status(400).json({ message: 'ID inválido, debe ser un número' });
            return;
        }
    
        try {
            const resultado = await profesorRepository.delete(idNumber);
    
            if (resultado.affected === 0) {
                res.status(404).json({ message: 'Profesor no encontrado' });
                return;
            }
    
            res.status(200).json({ message: 'Profesor eliminado correctamente' });
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }
}

export default new ProfesorController();