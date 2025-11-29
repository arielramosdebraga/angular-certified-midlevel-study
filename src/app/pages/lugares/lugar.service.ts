import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lugar } from './lugar';

@Injectable({
  providedIn: 'root',
})
export class LugarService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/lugares';

  salvar(lugar: Lugar): Observable<Lugar> {
    return this.http.post<Lugar>(this.apiUrl, lugar);
  }

  obterTodas(): Observable<Lugar[]> {
    return this.http.get<Lugar[]>(this.apiUrl);
  }
}
