import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServicioService } from 'src/app/service/servicio/servicio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-servicio',
  templateUrl: './editar-servicio.component.html',
  styleUrls: ['./editar-servicio.component.css']
})
export class EditarServicioComponent {
  registroError: string = "";
  registroForm: FormGroup;
  archivoBase64: string | null = null;

  constructor(private formBuilder: FormBuilder,
    private servicioService: ServicioService,
    public dialogRef: MatDialogRef<EditarServicioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      this.registroForm = this.formBuilder.group({
        titulo: [data.titulo, Validators.required],
        descripcion: [data.descripcion, Validators.required],
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


  editarServicio(): void {
    if (this.registroForm.valid && this.archivoBase64) {
      const servicioData = new FormData();
      servicioData.append('titulo', this.registroForm.get('titulo')?.value);
      servicioData.append('descripcion', this.registroForm.get('descripcion')?.value);
      servicioData.append('img', this.archivoBase64);
      const servicioId = this.data.idservicio
      this.servicioService.editarServicio(servicioId, servicioData).subscribe(
        (response: any) => {
          Swal.fire({
            icon: 'success',
            title: '¡Servicio editado exitosamente!',
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
            title: 'Error al editar el servicio',
            text: 'Hubo un problema al editar el servicio. Por favor, inténtalo de nuevo más tarde.',
            confirmButtonText: 'Cerrar'
          });
          console.error('Error al editar el servicio:', error);
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
