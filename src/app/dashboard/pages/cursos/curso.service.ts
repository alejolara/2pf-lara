import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { CreateCursoData, UpdateCursoData, Curso } from './interface/cursos.interface';

@Injectable({
  providedIn: 'root',
})
export class CursoService {
  private _cursos$ = new BehaviorSubject<Curso[]>([]);

  private cursos$ = this._cursos$.asObservable();
  constructor() {}

  getCursos(): Observable<Curso[]> {
    return this._cursos$.asObservable();
  }

  loadCursos(): void {
    this._cursos$.next([
      {
        id: 1,
        nombre: 'js',
        descripcion: 'curso de js',
        precio: 1000,
        duracion: "2 meses",
      },
      {
        id: 2,
        nombre: 'php',
        descripcion: 'curso de php',
        precio: 500,
        duracion: "6 meses",
      },
      {
        id: 3,
        nombre: 'angular',
        descripcion: 'curso de angular',
        precio: 800,
        duracion: "3 meses",
      },
    ]);
  }

  create(): void {
    this._cursos$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this._cursos$.next([
          ...arrayActual,
          {
            id: arrayActual.length + 1,
            nombre: 'Random nombre',
            descripcion: 'Random descripcion',
            precio: 5400,
            duracion: "23",
          },
        ]);
      },
    });
  }
  onCreateCurso(curso: CreateCursoData): void {
    this._cursos$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this._cursos$.next([
          ...arrayActual,
          { ...curso, id: arrayActual.length + 1 },
        ]);
      },
    });
  }
  deleteById(id: number): void {
    this._cursos$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this._cursos$.next(
          arrayActual.filter((p) => p.id !== id),
        );
      }
    })
  }
}
