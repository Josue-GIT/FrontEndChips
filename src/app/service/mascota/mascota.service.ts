import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Especie, Mascota } from '../model/mascota';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {

  private apiUrl = 'http://localhost:8090/mascotas';
  private especiesUrl = 'http://localhost:8090/especies/listar';

  constructor(private http: HttpClient) { }

  obtenerMascotasUsuario(usuarioId: number): Observable<Mascota[]> {
    const url = `${this.apiUrl}/listar/usuario/${usuarioId}`; // Ajusta la ruta de la API según sea necesario
    return this.http.get<Mascota[]>(url);
  }

  registrarMascota(mascota: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/guardar`, mascota);
  }

  obtenerEspecies(): Observable<Especie[]> {
    return this.http.get<Especie[]>(this.especiesUrl);
  }
  
}
