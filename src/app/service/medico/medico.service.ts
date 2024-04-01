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
}
