import { Entity, Column, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { EstudianteModel } from "./EstudianteModel";
import { CursoModel } from "./CursoModel";

@Entity('cursos_estudiantes')
export class CursoEstudianteModel {
    @PrimaryColumn()
    public estudiante_id: number | undefined

    @PrimaryColumn()
    public curso_id: number | undefined

    @Column({ type: 'float' })
    public nota: number | undefined

    @Column({ type: 'date' })
    public fecha: Date | undefined

    @ManyToOne(()=> EstudianteModel, (estudiante)=> estudiante.curso)
    @JoinColumn({ name: 'estudiante_id' })
    public estudiante: EstudianteModel | undefined

    @ManyToOne(()=> CursoModel, (curso)=> curso.estudiante)
    @JoinColumn({ name: 'curso_id' })
    public curso: CursoModel | undefined
}