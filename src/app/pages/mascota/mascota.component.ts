import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';
import { MascotaService } from 'src/app/service/mascota/mascota.service';
import { Mascota } from 'src/app/service/model/mascota';

@Component({
  selector: 'app-mascota',
  templateUrl: './mascota.component.html',
  styleUrls: ['./mascota.component.css']
})
export class MascotaComponent implements OnInit{

  loggedInUserId: number | null = null;
  mascotas: Mascota[] | null = null;

  constructor(private authService: AuthService,
    private mascotaService: MascotaService,
    private dialog: MatDialog,
    private sanitizer: DomSanitizer,
    private router:Router) { }

  ngOnInit(): void {
    this.loggedInUserId = this.authService.getLoggedInUserId();
    if (!this.loggedInUserId) {
      this.router.navigate(['/home']);
    }
    this.obtenerMascotasDeUsuario();
  }
  
  dataToImage(dataURI: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl('data:image/*;base64,' + dataURI);
  }

  obtenerMascotasDeUsuario(): void {
    if (this.loggedInUserId) {
      this.mascotaService.obtenerMascotasUsuario(this.loggedInUserId).subscribe(
        (animal: Mascota[]) => {
          console.log('Mascota del usuario en sesión:', animal);
          this.mascotas = animal;
        },
        (error) => {
          console.error('Error al obtener la mascota del usuario en sesión:', error);
        }
      );
    }
  }
}
