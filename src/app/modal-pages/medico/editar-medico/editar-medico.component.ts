import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MedicoService } from 'src/app/service/medico/medico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-medico',
  templateUrl: './editar-medico.component.html',
  styleUrls: ['./editar-medico.component.css']
})
export class EditarMedicoComponent {
  registroError: string = "";
  registroForm: FormGroup;
  archivoBase64: string | null = null;
  dias: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  horas: string[] = [];
  constructor(private formBuilder: FormBuilder,
    private medicoService: MedicoService,
    public dialogRef: MatDialogRef<EditarMedicoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      this.registroForm = this.formBuilder.group({
        nombre: [data.nombre, Validators.required],
        diaInicio: [data.diaInicio, Validators.required],
        diaFin: [data.diaFin, Validators.required],
        horaInicio: [data.horaInicio, [Validators.required, this.validateHora]],
        horaFin: [data.horaFin, [Validators.required, this.validateHora]],
    }, {
        validators: [this.validateDiasHoras]
    });
    for (let i = 0; i < 24; i++) {
      for (let j = 0; j < 60; j += 15) {
          const hora = `${i < 10 ? '0' + i : i}:${j < 10 ? '0' + j : j}`;
          this.horas.push(hora);
      }
  }
  }


  validateDiasHoras(group: FormGroup) {
    const diaInicio = group.get('diaInicio')?.value;
    const diaFin = group.get('diaFin')?.value;
    const horaInicio = group.get('horaInicio')?.value;
    const horaFin = group.get('horaFin')?.value;

    if (diaInicio === diaFin && horaInicio >= horaFin) {
        return { diasHorasInvalidos: true };
    }

    return null;
}

  validateHora(control: AbstractControl): ValidationErrors | null {
  const horaRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/; // Formato de hora HH:mm

  if (!horaRegex.test(control.value)) {
      return { horaInvalida: true };
  }

  return null;
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

  editarMedico(): void {
    if (this.registroForm.valid && this.archivoBase64) {
      const medicoData = new FormData();
      medicoData.append('nombre', this.registroForm.get('nombre')?.value);
      medicoData.append('diaInicio', this.registroForm.get('diaInicio')?.value);
      medicoData.append('horaInicio', this.registroForm.get('horaInicio')?.value);
      medicoData.append('diaFin', this.registroForm.get('diaFin')?.value);
      medicoData.append('horaFin', this.registroForm.get('horaFin')?.value);
      medicoData.append('img', this.archivoBase64);
      const medicoId = this.data.idmedico;
      this.medicoService.editarMedico(medicoId, medicoData).subscribe(
        (response: any) => {
          Swal.fire({
            icon: 'success',
            title: '¡Medico editado exitosamente!',
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
            title: 'Error al editar el medico',
            text: 'Hubo un problema al editar el medico. Por favor, inténtalo de nuevo más tarde.',
            confirmButtonText: 'Cerrar'
          });
          console.error('Error al editar el medico:', error);
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
