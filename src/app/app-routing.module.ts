import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MedicoComponent } from './pages/medico/medico.component';
import { HttpClientModule } from '@angular/common/http';
import { ServicioComponent } from './pages/servicio/servicio.component';



const routes: Routes = [
  {path: 'home', component: HomeComponent },
  {path: 'medicos', component: MedicoComponent},
  {path: 'servicios', component: ServicioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule], // Asegúrate de importar HttpClientModule aquí
  exports: [RouterModule]
})
export class AppRoutingModule { }