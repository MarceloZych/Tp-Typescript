import { createConnection } from "mysql2/promise"
import { DataSource } from "typeorm"
import * as dotenv from 'dotenv'
import { Profesor } from '../models/ProfesorModel'
import { Estudiante } from '../models/EstudianteModel'
import { Curso } from '../models/CursoModel'
dotenv.config()

const port: number = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306

async function createDatabaseIfNotExists() {
    const connection = await createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    })
    await connection.query(`CREATE DATABASE IF NOT EXIST $`)
}