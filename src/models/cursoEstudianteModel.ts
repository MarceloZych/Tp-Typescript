import { Entity, Column, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { EstudianteModel } from "./EstudianteModel";
import { CursoModel } from "./CursoModel";

@Entity('cursos_estudiantes')
export class CursoEstudianteModel {
    @PrimaryColumn()
    public estudiante_id: number

    @PrimaryColumn()
    public curso_id: number

    @Column({ type: 'float' })
    public nota: number

    @Column({ type: 'date' })
    public fecha: Date

    @ManyToOne(()=> EstudianteModel, (estudiante)=> estudiante.curso)
    @JoinColumn({ name: 'estudiante_id' })
    public estudiante: EstudianteModel

    @ManyToOne(()=> CursoModel, (curso)=> curso.estudiante)
    @JoinColumn({ name: 'curso_id' })
    public curso: CursoModel
}