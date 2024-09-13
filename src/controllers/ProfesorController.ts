import { Request, Response } from "express";

class ProfesorController {
    constructor() {}

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
            res.send("insertar profesor")
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
            res.send("modificar profesor")
        } catch (err) {
            if (err instanceof Error){
                res.status(500).send(err.message)
            }
        }
    }

    async eliminar   (req: Request, res: Response):Promise<void> {
        const {id} = req.params
        try {
            res.send("modificar profesor")
        } catch (err) {
            if (err instanceof Error){
                res.status(500).send(err.message)
            }
        }
    }
}

export default new ProfesorController()