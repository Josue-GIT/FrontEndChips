import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MedicoService } from 'src/app/service/medico/medico.service';
import { Medico } from 'src/app/service/model/medico';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit{

  medicos: Medico[] = [];

  constructor(private medicoService: MedicoService,
    private sanitizer : DomSanitizer) { }
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
}
