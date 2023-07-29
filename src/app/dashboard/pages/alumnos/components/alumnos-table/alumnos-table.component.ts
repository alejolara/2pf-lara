import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Alumno } from '../../models';


@Component({
  selector: 'app-alumnos-table',
  templateUrl: './alumnos-table.component.html',
  styleUrls: []
})
export class AlumnosTableComponent {
  displayedColumns: string[] = ['id', 'fullName', 'email', 'dni' ,'actions'];

  @Input()
  dataSource: Alumno[] = [];

  @Output()
  deleteAlumno = new EventEmitter<Alumno>();

  @Output()
  editAlumno = new EventEmitter<Alumno>();
}
