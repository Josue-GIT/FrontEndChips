import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AgregarMedicoComponent } from 'src/app/modal-pages/medico/agregar-medico/agregar-medico.component';
import { EditarMedicoComponent } from 'src/app/modal-pages/medico/editar-medico/editar-medico.component';
import { MedicoService } from 'src/app/service/medico/medico.service';
import { Medico } from 'src/app/service/model/medico';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit{

  medicos: Medico[] = [];

  constructor(private medicoService: MedicoService,
    private sanitizer : DomSanitizer,
    private dialog: MatDialog,) { }
  ngOnInit(): void {
    this.cargarMedicos();
  }

  dataToImage(dataURI: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl('data:image/*;base64,' + dataURI);
  }

  cargarMedicos(): void {
    this.medicoService.obtenerMedicos().subscribe(
      (data: Medico[]) => {
        this.medicos = data;
      },
      (error) => {
        console.error('Error al obtener medicos:', error);
      }
    );
  }

  registrarMedico() {
    const dialogRef = this.dialog.open(AgregarMedicoComponent, {
      width: '900px', 
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal de medicos se cerró');
      this.cargarMedicos();
    });
  }

  editarMedico(medicoId: number): void {
    const medico = this.medicos.find(e => e.idmedico === medicoId);
    const dialogRef = this.dialog.open(EditarMedicoComponent, {
      width: '900px',
      data: medico // Pasa el medico como dato al modal de edición
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal de edición de medico se cerró');
      this.cargarMedicos(); 
    });
  }

  eliminarMedico(medicoId: number): void {
    Swal.fire({
      title: '¿Seguro que quieres eliminar este medico?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar medico'
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicoService.eliminarMedico(medicoId).subscribe(
          () => {
            Swal.fire(
              'Medico eliminado',
              'El medico ha sido eliminado correctamente',
              'success'
            );
            // Recargar los medicos después de eliminar
            this.cargarMedicos();
          },
          (error) => {
            console.error('Error al eliminar el medico:', error);
            Swal.fire(
              'Error',
              'Hubo un error al eliminar el medico. Por favor, inténtalo de nuevo más tarde.',
              'error'
            );
          }
        );
      }
    });
  }
  
}
