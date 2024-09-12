import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from "typeorm";
import { CursoModel } from "./CursoModel";

@Entity()
export class EstudianteModel {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    dni: number | undefined

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

    @ManyToMany(()=> CursoModel)
    @JoinTable({
        name: 'curso_estudiantes',
        joinColumn: { name: 'estudiante_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'curso_id' , referencedColumnName: 'id'}
    })
    curso: CursoModel[] | undefined
}