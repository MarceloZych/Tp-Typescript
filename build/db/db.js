"use strict";
// import { createConnection } from "mysql2/promise"
// import { DataSource } from "typeorm"
// import * as dotenv from 'dotenv'
// import { ProfesorModel } from '../models/ProfesorModel'
// import { EstudianteModel } from '../models/EstudianteModel'
// import { CursoModel } from '../models/CursoModel'
// dotenv.config()
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
exports.inicializeDatabase = inicializeDatabase;
// const port: number = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306
// async function createDatabaseIfNotExists() {
//     const connection = await createConnection({
//         host: process.env.DB_HOST,
//         port: port,
//         user: process.env.DB_USER,
//         password: process.env.DB_PASSWORD
//     })
//     await connection.query(`CREATE DATABASE IF NOT EXIST $`)
// }
// export const AppDataSource = new DataSource({
//     type: "mysql",
//     host: process.env.DB_HOST,
//     port: port,
//     username: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE,
//     entities: [ProfesorModel, EstudianteModel, CursoModel],
//     synchronize: true,
//     logging: true
// })
// export async function initializeDataBase() {
//     await createDatabaseIfNotExists();
//     await AppDataSource.initialize()
// }
const typeorm_1 = require("typeorm");
const promise_1 = require("mysql2/promise");
const EstudianteModel_1 = require("../models/EstudianteModel");
const CursoModel_1 = require("../models/CursoModel");
const ProfesorModel_1 = require("../models/ProfesorModel");
const CursoEstudianteModel_1 = require("../models/CursoEstudianteModel");
function createDatabaseIfNotExists() {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield (0, promise_1.createConnection)({
            host: "localhost",
            port: 3306,
            user: "root",
            password: "",
        });
        yield connection.query(`CREATE DATABASE IF NOT EXISTS universidad_marce`);
        yield connection.end();
    });
}
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    username: "root",
    password: "",
    database: "universidad_marce",
    entities: [EstudianteModel_1.EstudianteModel, CursoModel_1.CursoModel, ProfesorModel_1.ProfesorModel, CursoEstudianteModel_1.CursoEstudianteModel],
    synchronize: true, //lo puse en falso porque sino me crea la bd de nuevo
    logging: true
});
function inicializeDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        yield createDatabaseIfNotExists();
        yield exports.AppDataSource.initialize();
    });
}
