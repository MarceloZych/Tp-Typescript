"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.intializeDatabase = intializeDatabase;
const promise_1 = require("mysql2/promise");
const typeorm_1 = require("typeorm");
const dotenv = __importStar(require("dotenv"));
const ProfesorModel_1 = require("../models/ProfesorModel");
const EstudianteModel_1 = require("../models/EstudianteModel");
const CursosEstudiantesModel_1 = require("../models/CursosEstudiantesModel");
const CursoModel_1 = require("../models/CursoModel");
dotenv.config();
const port = process.env.BD_PORT ? parseInt(process.env.BD_PORT, 10) : 3306;
function createDatabaseIfNotExists() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const connection = yield (0, promise_1.createConnection)({
                host: process.env.DB_HOST,
                port,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD
            });
            yield connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
            connection.end();
        }
        catch (error) {
            console.error('Error al crear la base de datos: ', error);
            throw error;
        }
    });
}
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [ProfesorModel_1.Profesor, EstudianteModel_1.Estudiante, CursoModel_1.Curso, CursosEstudiantesModel_1.CursoEstudiante],
    synchronize: false,
    logging: true
});
function intializeDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        yield createDatabaseIfNotExists();
        yield exports.AppDataSource.initialize();
    });
}
