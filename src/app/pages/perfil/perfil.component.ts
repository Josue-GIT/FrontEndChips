import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';
import { Usuario } from 'src/app/service/model/usuario';
import { PerfilService } from 'src/app/service/perfil/perfil.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit{

  loggedInUserId: number | null = null;
  user: Usuario | null = null;
  
  constructor(private authService: AuthService,
    private perfilService: PerfilService,
    private dialog: MatDialog,
    private sanitizer: DomSanitizer,
    private router:Router) { }

  ngOnInit(): void {
    this.loggedInUserId = this.authService.getLoggedInUserId();
    if (!this.loggedInUserId) {
      this.router.navigate(['/home']);
    }
    this.obtenerPerfilUsuarioEnSesion();
  }

  dataToImage(dataURI: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl('data:image/*;base64,' + dataURI);
  }

  obtenerPerfilUsuarioEnSesion(): void {
    if (this.loggedInUserId) {
      this.perfilService.obtenerPerfil(this.loggedInUserId).subscribe(
        (usuario: Usuario) => {
          console.log('Perfil del usuario en sesión:', usuario);
          this.user = usuario;
        },
        (error) => {
          console.error('Error al obtener el perfil del usuario en sesión:', error);
        }
      );
    }
  }
}
