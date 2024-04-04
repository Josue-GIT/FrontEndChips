import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ServicioService } from 'src/app/service/servicio/servicio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-servicio',
  templateUrl: './agregar-servicio.component.html',
  styleUrls: ['./agregar-servicio.component.css']
})
export class AgregarServicioComponent {
  registroError: string = "";
  registroForm: FormGroup;
  archivoBase64: string | null = null;

  constructor(private formBuilder: FormBuilder,
    private servicioService: ServicioService,
    public dialogRef: MatDialogRef<AgregarServicioComponent>) { 
    this.registroForm = this.formBuilder.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
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

  registrarServicio(): void {
    if (this.registroForm.valid && this.archivoBase64) {
      const servicioData = new FormData();
      servicioData.append('titulo', this.registroForm.get('titulo')?.value);
      servicioData.append('descripcion', this.registroForm.get('descripcion')?.value);
      servicioData.append('img', this.archivoBase64);
      this.servicioService.registrarServicio(servicioData).subscribe(
        (response: any) => {
          Swal.fire({
            icon: 'success',
            title: '¡Servicio registrado exitosamente!',
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
            title: 'Error al registrar el servicio',
            text: 'Hubo un problema al registrar el servicio. Por favor, inténtalo de nuevo más tarde.',
            confirmButtonText: 'Cerrar'
          });
          console.error('Error al registrar el servicio:', error);
        }
      );
    } else {
      this.registroForm.markAllAsTouched();
      // Manejo de errores si el formulario no es válido o la imagen no está seleccionada
    }
  }
  
    cerrarModal(): void {
      this.dialogRef.close();
    }
}
