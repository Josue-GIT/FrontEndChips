import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroService } from 'src/app/service/registro/registro.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  archivoBase64: string | null = null;
  registroError: string = "";
  registroForm : FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private registroService: RegistroService) {
    this.registroForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
    });
   }
   onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String: string = reader.result as string;
        this.archivoBase64 = base64String.split(',')[1]; 
      };
      reader.readAsDataURL(file);
    }
  }

  registrar() {
    if (this.registroForm.valid && this.archivoBase64) {
      const registroData = new FormData();
      registroData.append('username', this.registroForm.get('username')?.value);
      registroData.append('email', this.registroForm.get('email')?.value);
      registroData.append('password', this.registroForm.get('password')?.value);
      registroData.append('nombre', this.registroForm.get('nombre')?.value);
      registroData.append('apellido', this.registroForm.get('apellido')?.value);
      registroData.append('rolId', '1');
      registroData.append('img', this.archivoBase64);
      this.registroService.registrar(registroData).subscribe({
        next: (userData) => {
          console.log(userData);
        },
        error: (errorData) => {
          console.error(errorData);
          this.registroError = errorData;
        },
        complete: () => {
          console.info("Registro completo");
          this.router.navigateByUrl('/home');
          this.registroForm.reset();
        }
      });
    } else {
      this.registroForm.markAllAsTouched();
      alert("Error");
    }
  }
}