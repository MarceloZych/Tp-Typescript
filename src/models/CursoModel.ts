import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, 
    JoinTable, CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm'
import { ProfesorModel } from './ProfesorModel'
import { EstudianteModel } from './EstudianteModel'

@Entity()
export class CursoModel {
    @PrimaryGeneratedColumn()
    id: number  

    @Column()
    nombre: string

    @Column('text')
    descripcion: string

    @CreateDateColumn()
    createAt: Date

    @UpdateDateColumn()
    updateAt: Date

    @ManyToOne(()=> ProfesorModel, profesor => profesor.cursos)
    @JoinColumn({name:'Profesores_id'})
    profesor: ProfesorModel

    @ManyToMany(()=> EstudianteModel)
    @JoinTable({
        name: 'cursos_estudiantes',
        joinColumn: { name: 'curso_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'estudiante_id', referencedColumnName: 'id' }
    })
    estudiante: EstudianteModel
}