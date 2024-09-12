import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { CursoModel } from './CursoModel'

@Entity('profesores')
export class ProfesorModel {
    @PrimaryGeneratedColumn()
    id: number | undefined

    @Column()
    dni: string | undefined
    
    @Column()
    nombre: string | undefined

    @Column()
    apellido: string | undefined

    @Column()
    email: string | undefined

    @Column()
    profesion: string | undefined

    @Column()
    telefono: string | undefined

    @CreateDateColumn()
    createAt: Date | undefined

    @UpdateDateColumn()
    updateAt: Date | undefined

    @OneToMany(()=> CursoModel, (curso)=> curso.profesor)
    cursos: CursoModel[] | undefined
}