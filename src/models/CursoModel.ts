import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, 
    JoinTable, CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm'
import { ProfesorModel } from './ProfesorModel'
import { EstudianteModel } from './EstudianteModel'

@Entity()
export class CursoModel {
    @PrimaryGeneratedColumn()
    id: number | undefined  

    @Column()
    nombre: string | undefined

    @Column('text')
    descripcion: string | undefined

    @CreateDateColumn()
    createAt: Date | undefined

    @UpdateDateColumn()
    updateAt: Date | undefined

    @ManyToOne(()=> ProfesorModel, profesor => profesor.cursos)
    @JoinColumn({name:'Profesores_id'})
    profesor: ProfesorModel | undefined

    @ManyToMany(()=> EstudianteModel)
    @JoinTable({
        name: 'cursos_estudiantes',
        joinColumn: { name: 'curso_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'estudiante_id', referencedColumnName: 'id' }
    })
    estudiante: EstudianteModel | undefined
}