import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AgregarServicioComponent } from 'src/app/modal-pages/servicio/agregar-servicio/agregar-servicio.component';
import { EditarServicioComponent } from 'src/app/modal-pages/servicio/editar-servicio/editar-servicio.component';
import { Servicio } from 'src/app/service/model/servicio';
import { ServicioService } from 'src/app/service/servicio/servicio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css']
})
export class ServicioComponent implements OnInit{

  servicios: Servicio[] = [];

  constructor(private servicioService: ServicioService,
    private sanitizer : DomSanitizer,
    private dialog: MatDialog) { }
  ngOnInit(): void {
    this.cargarServicios();
  }

  dataToImage(dataURI: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl('data:image/*;base64,' + dataURI);
  }

  cargarServicios(): void {
    this.servicioService.obtenerServicios().subscribe(
      (data: Servicio[]) => {
        this.servicios = data;
      },
      (error) => {
        console.error('Error al obtener servicios:', error);
      }
    );
  }

  registrarServicio() {
    const dialogRef = this.dialog.open(AgregarServicioComponent, {
      width: '900px', 
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal de servicios se cerró');
      this.cargarServicios();
    });
  }
  
  editarServicio(servicioId: number): void {
    const servicio = this.servicios.find(e => e.idservicio === servicioId);
    const dialogRef = this.dialog.open(EditarServicioComponent, {
      width: '900px',
      data: servicio // Pasa el servicio como dato al modal de edición
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal de edición de servicio se cerró');
      this.cargarServicios(); 
    });
  }

  eliminarServicio(servicioId: number): void {
    Swal.fire({
      title: '¿Seguro que quieres eliminar este servicio?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar servicio'
    }).then((result) => {
      if (result.isConfirmed) {
        this.servicioService.eliminarServicio(servicioId).subscribe(
          () => {
            Swal.fire(
              'Servicio eliminado',
              'El servicio ha sido eliminado correctamente',
              'success'
            );
            // Recargar los servicios después de eliminar
            this.cargarServicios();
          },
          (error) => {
            console.error('Error al eliminar el servicio:', error);
            Swal.fire(
              'Error',
              'Hubo un error al eliminar el servicio. Por favor, inténtalo de nuevo más tarde.',
              'error'
            );
          }
        );
      }
    });
  }
}
