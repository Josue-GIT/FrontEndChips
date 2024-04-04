import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';

import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { MedicoComponent } from './pages/medico/medico.component';
import { ServicioComponent } from './pages/servicio/servicio.component';
import { LoginComponent } from './auth/login/login.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatOptionModule } from '@angular/material/core';
import { RegistroComponent } from './auth/registro/registro.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { MascotaComponent } from './pages/mascota/mascota.component';
import { AgregarMascotaComponent } from './modal-pages/mascota/agregar-mascota/agregar-mascota.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatRadioModule} from '@angular/material/radio';
import { EditarMascotaComponent } from './modal-pages/mascota/editar-mascota/editar-mascota.component';
import { AgregarMedicoComponent } from './modal-pages/medico/agregar-medico/agregar-medico.component';
import { EditarMedicoComponent } from './modal-pages/medico/editar-medico/editar-medico.component';
import { AgregarServicioComponent } from './modal-pages/servicio/agregar-servicio/agregar-servicio.component';
import { EditarServicioComponent } from './modal-pages/servicio/editar-servicio/editar-servicio.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    MedicoComponent,
    ServicioComponent,
    LoginComponent,
    RegistroComponent,
    PerfilComponent,
    MascotaComponent,
    AgregarMascotaComponent,
    EditarMascotaComponent,
    AgregarMedicoComponent,
    EditarMedicoComponent,
    AgregarServicioComponent,
    EditarServicioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatOptionModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    MatCardModule,
    MatIconModule, 
    MatDialogModule,
    MatToolbarModule,
    MatAutocompleteModule,
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
