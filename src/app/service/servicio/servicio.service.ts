import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Servicio } from '../model/servicio';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  private apiUrl = 'http://localhost:8090/servicios';

  constructor(private http: HttpClient) { }

  obtenerServicios(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(`${this.apiUrl}/listar`);
  }

  registrarServicio(servicio: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/guardar`, servicio);
  }

  editarServicio(servicioId: number, servicio: FormData): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/editar/${servicioId}`, servicio);
  }
  
  eliminarServicio(servicioId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/eliminar/${servicioId}`);
  }
}
