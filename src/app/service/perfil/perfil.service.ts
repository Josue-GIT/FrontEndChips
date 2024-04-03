import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  private apiUrl = 'http://localhost:8090';

  constructor(private http: HttpClient) { }

  obtenerPerfil(usuarioId: number): Observable<Usuario> {
    const url = `${this.apiUrl}/usuarios/listar/${usuarioId}`;
    return this.http.get<Usuario>(url);
  }
}