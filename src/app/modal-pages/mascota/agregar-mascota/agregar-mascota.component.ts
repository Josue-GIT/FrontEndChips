import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/service/auth/auth.service';
import { MascotaService } from 'src/app/service/mascota/mascota.service';
import { Especie } from 'src/app/service/model/mascota';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-mascota',
  templateUrl: './agregar-mascota.component.html',
  styleUrls: ['./agregar-mascota.component.css']
})
export class AgregarMascotaComponent implements OnInit{
  registroError: string = "";
  registroForm: FormGroup;
  archivoBase64: string | null = null;
  loggedInUserId: number | null = null;
  especies: Especie[] = [];
  sexos: string[] = ['macho', 'hembra'];
  especieControl = new FormControl();
  
  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private mascotaService: MascotaService,
    public dialogRef: MatDialogRef<AgregarMascotaComponent>) { 
    this.registroForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      sexo: ['', Validators.required],
      edad: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loggedInUserId = this.authService.getLoggedInUserId();
    this.obtenerEspecies(); 
  }

  obtenerEspecies(): void {
    this.mascotaService.obtenerEspecies().subscribe(
      (especies: Especie[]) => {
        this.especies = especies;
      },
      (error: any) => {
        console.error('Error al obtener las especies:', error);
      }
    );
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String: string = reader.result as string;
        this.archivoBase64 = base64String.split(',')[1];
        console.log(this.archivoBase64);
      };
      reader.readAsDataURL(file);
    }
  }

  displaySexo(value: string): string {
    return value === 'macho' ? 'Macho' : 'Hembra';
  }

  displayEspecie(especie: Especie): string {
    return especie ? especie.nombre : '';
}
registrarMascota(): void {
  if (this.registroForm.valid && this.archivoBase64) {
      const especieSeleccionada = this.especieControl.value;
      if (especieSeleccionada) {
          const mascotaData = new FormData();
          mascotaData.append('nombre', this.registroForm.get('nombre')?.value);
          mascotaData.append('sexo', this.registroForm.get('sexo')?.value);
          mascotaData.append('edad', this.registroForm.get('edad')?.value);
          mascotaData.append('img', this.archivoBase64);
          mascotaData.append('especieId', especieSeleccionada.idespecie); // Aquí solo enviamos el ID
          mascotaData.append('usuarioId', String(this.loggedInUserId));
          this.mascotaService.registrarMascota(mascotaData).subscribe(
              (response: any) => {
                  Swal.fire({
                      icon: 'success',
                      title: '¡Mascota registrada exitosamente!',
                      showConfirmButton: false,
                      timer: 1500
                  }).then(() => {
                      this.dialogRef.close(true);
                      this.cerrarModal();
                  });
              },
              (error: any) => {
                  Swal.fire({
                      icon: 'error',
                      title: 'Error al registrar la mascota',
                      text: 'Hubo un problema al registrar la mascota. Por favor, inténtalo de nuevo más tarde.',
                      confirmButtonText: 'Cerrar'
                  });
                  console.error('Error al registrar la mascota:', error);
              }
          );
      } else {
          // Mostrar mensaje de error si no se ha seleccionado una especie
          Swal.fire({
              icon: 'error',
              title: 'Especie no seleccionada',
              text: 'Por favor, selecciona una especie para la mascota.',
              confirmButtonText: 'Cerrar'
          });
      }
  } else {
      this.registroForm.markAllAsTouched();
  }
}
  

  cerrarModal(): void {
    this.dialogRef.close();
  }
}
