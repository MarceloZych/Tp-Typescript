import { createConnection } from "mysql2/promise"
import { DataSource } from "typeorm"
import * as dotenv from 'dotenv'
import { ProfesorModel } from '../models/ProfesorModel'
import { EstudianteModel } from '../models/EstudianteModel'
import { CursoModel } from '../models/CursoModel'
dotenv.config()

const port: number = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306

async function createDatabaseIfNotExists() {
    const connection = await createConnection({
        host: process.env.DB_HOST,
        port: port,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    })
    await connection.query(`CREATE DATABASE IF NOT EXIST $`)
}

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: port,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [ProfesorModel, EstudianteModel, CursoModel],
    synchronize: true,
    logging: true
})

export async function initializeDataBase() {
    await createDatabaseIfNotExists();
    await AppDataSource.initialize()
}