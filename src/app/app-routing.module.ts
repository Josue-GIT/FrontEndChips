import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MedicoComponent } from './pages/medico/medico.component';
import { HttpClientModule } from '@angular/common/http';
import { ServicioComponent } from './pages/servicio/servicio.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { MascotaComponent } from './pages/mascota/mascota.component';



const routes: Routes = [
  {path: '', component: HomeComponent },
  {path: 'home', component: HomeComponent },
  {path: 'medicos', component: MedicoComponent},
  {path: 'servicios', component: ServicioComponent},
  { path: 'iniciar-sesion', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'mascotas', component: MascotaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule], 
  exports: [RouterModule]
})
export class AppRoutingModule { }