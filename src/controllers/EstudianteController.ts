import { Request, Response } from "express"
/*
class EstudianteController {
    constructor(){}

    async consultarTodos(req: Request, res: Response):Promise<void> {
        try{
            res.send("conssultar todos")
        }catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message)
            }
        }
    }

    async consultarUno (req: Request, res: Response):Promise<void> {
        const {id} = req.params
        try{
            res.send("consultar uno")
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message)
            }
        }
    }

    async insertar (req: Request, res:Response):Promise<void> {
        const {nombre, descripcion, profesor_id} = req.body
        try {
            res.send("insertar estyduate")
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message)
            }
        }
    }

    async modificar (req: Request, res: Response):Promise<void> {
        const {id} = req.params
        const {nombre,descripcion,profesor_id} = req.body
        try {
            res.send("modificar estudiante")
        } catch (err) {
            if (err instanceof Error){
                res.status(500).send(err.message)
            }
        }
    }

    async eliminar   (req: Request, res: Response):Promise<void> {
        const {id} = req.params
        try {
            res.send("modificar estudiante")
        } catch (err) {
            if (err instanceof Error){
                res.status(500).send(err.message)
            }
        }
    }
}

export default new EstudianteController()*/

import { AppDataSource } from "../db/db";
import { EstudianteModel } from "../models/EstudianteModel";

const estudianteRespository = AppDataSource.getRepository(EstudianteModel)

export const consultarTodos = async (req: Request, res: Response) => {
    const estudiante = await estudianteRespository.find()
    res.json(estudiante)
}

export const consultarUno = async (req: Request, res: Response) => {
    const estudiante = await estudianteRespository.findOneBy({ id: parseInt(req.params.id)})
    res.json(estudiante)
}

export const insertar = async (req: Request, res: Response) => {
    const estudiante = estudianteRespository.create(req.body)
    const result = await estudianteRespository.save(estudiante)
}

export const modificar = async (req: Request, res: Response) => {
    const estudiante = await estudianteRespository.findOneBy({ id: parseInt(req.params.id )})
    if (!estudiante) {
        return res.status(404).json({ message: "Curso no encontrado"})
    }

    estudianteRespository.merge(estudiante, req.body)
    const result = await estudianteRespository.save(estudiante)
    res.json(result)
}