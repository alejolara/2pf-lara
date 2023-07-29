import { Alumno } from "../models";

export class AlumnoMockService {
  private alumnos: Alumno[] = [
    {
      id: 1,
      nombre: 'alejo',
      apellido: 'lara',
      email: 'alejo@mail.com',
      password: '12345',
      dni: 12345,
    },
  ];
  getAlumnos(): Alumno[] {
    return this.alumnos;
  }
}
