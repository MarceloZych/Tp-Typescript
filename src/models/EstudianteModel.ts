import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from "typeorm";
import { CursoModel } from "./CursoModel";

@Entity('estudiante')
export class EstudianteModel {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    dni: number

    @Column()
    nombre: string

    @Column()
    apellido: string
    
    @Column()
    email: string

    @Column()
    telefono: string   
    
    @CreateDateColumn()
    createAt: Date

    @UpdateDateColumn()
    updateAt: Date

    @ManyToMany(()=> CursoModel)
    @JoinTable({
        name: 'cursos_estudiantes',
        joinColumn: { name: 'estudiante_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'curso_id' , referencedColumnName: 'id'}
    })
    cursos: CursoModel[]
}