import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { CursoModel } from "./CursoModel";

@Entity('profesor')
export class ProfesorModel {
    
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    dni: string
    
    @Column()
    nombre: string

    @Column()
    apellido: string

    @Column()
    email: string

    @Column()
    materia: string

    @Column()
    telefono: string

    @CreateDateColumn()
    createAt: Date

    @UpdateDateColumn()
    updateAt: Date

    @OneToMany(()=> CursoModel, (curso)=> curso.profesor)
    cursos!: CursoModel[]
}