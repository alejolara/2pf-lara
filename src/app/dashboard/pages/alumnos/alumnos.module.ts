import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlumnosComponent } from './alumnos.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AlumnoFormDialogComponent } from './components/alumno-form-dialog/alumno-form-dialog.component';
import { AlumnosTableComponent } from './components/alumnos-table/alumnos-table.component';
import { AlumnosService } from './alumno.service';
import { AlumnoMockService } from './mocks/alumno-mock.service';
import { AlumnoDetailComponent } from './pages/alumno-detail/alumno-detail.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AlumnosComponent,
    AlumnoFormDialogComponent,
    AlumnosTableComponent,
    AlumnoDetailComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule],
  exports: [AlumnosComponent],
  providers: [
    {
      provide: 'IS_DEV',
      useValue: false,
    },
  ],
})
export class AlumnosModule {}
