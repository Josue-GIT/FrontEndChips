import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Servicio } from 'src/app/service/model/servicio';
import { ServicioService } from 'src/app/service/servicio/servicio.service';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css']
})
export class ServicioComponent implements OnInit{

  servicios: Servicio[] = [];

  constructor(private servicioService: ServicioService,
    private sanitizer : DomSanitizer) { }
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
}
