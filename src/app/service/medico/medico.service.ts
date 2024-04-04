import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Medico } from '../model/medico';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  private apiUrl = 'http://localhost:8090/medicos';

  constructor(private http: HttpClient) { }

  obtenerMedicos(): Observable<Medico[]> {
    return this.http.get<Medico[]>(`${this.apiUrl}/listar`);
  }

  registrarMedico(medico: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/guardar`, medico);
  }

  editarMedico(medicoId: number, medico: FormData): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/editar/${medicoId}`, medico);
  }
  
  eliminarMedico(medicoId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/eliminar/${medicoId}`);
  }
}
