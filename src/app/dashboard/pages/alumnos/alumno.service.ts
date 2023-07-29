import { Injectable } from '@angular/core';
import { CreateAlumnoData, UpdateAlumnoData, Alumno } from './models';
import { BehaviorSubject, Observable, Subject, delay, map, of, take } from 'rxjs';
import { NotifierService } from 'src/app/core/services/notifier.service';

const ALUMNO_DB: Observable<Alumno[]> = of([
  {
    id: 1,
    nombre: "Juan",
    apellido: "Pérez",
    email: "juan.perez@example.com",
    password: "perez",
    dni: 12345678
  },
  {
    id: 2,
    nombre: "María",
    apellido: "González",
    email: "maria.gonzalez@example.com",
    password: "maria",
    dni: 87654321
  },
  {
    id: 3,
    nombre: "Pedro",
    apellido: "Ramírez",
    email: "pedro.ramirez@example.com",
    password: "ramirez",
    dni: 56789012
  }
]).pipe(delay(1000));

@Injectable({
  providedIn: 'root',
})
export class AlumnosService {
  private _alumnos$ = new BehaviorSubject<Alumno[]>([]);
  private alumnos$ = this._alumnos$.asObservable();

  constructor(private notifier: NotifierService) {}

  loadAlumnos(): void {
    ALUMNO_DB.subscribe({
      next: (alumnosFromDb) => this._alumnos$.next(alumnosFromDb),
    });
  }

  getAlumnos(): Observable<Alumno[]> {
    return this.alumnos$;
  }

  getAlumnoById(id: number) {
    return this.alumnos$.pipe(
      take(1),
      map(( alumnos ) =>  alumnos.find((u) => u.id === id)),
    )
  }

  createAlumno(alumno: CreateAlumnoData): void {
    this.alumnos$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this._alumnos$.next([
          ...arrayActual,
          { ...alumno, id: arrayActual.length + 1 },
        ]);
        this.notifier.showSuccess('Alumno creado');
      },
    });
  }

  updateAlumnoById(id: number, AlumnoActualizado: UpdateAlumnoData): void {
    this.alumnos$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this._alumnos$.next(
          arrayActual.map((u) =>
            u.id === id ? { ...u, ...AlumnoActualizado } : u
          )
        );
        this.notifier.showSuccess('Alumno Actualizado');
      },
    });
  }

  deleteAlumnoById(id: number): void {
    this._alumnos$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this._alumnos$.next(arrayActual.filter((u) => u.id !== id));
        this.notifier.showSuccess('Alumno eliminado');
      },
    });
  }
}
