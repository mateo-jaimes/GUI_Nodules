import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  authUrl = environment.authUrl+'Usuario/';

  constructor(private httpClient:HttpClient) { }

  public lista(): Observable<any[]>{
    return this.httpClient.get<any[]>(this.authUrl + 'getAll');
  }
  public delete(userName : string, usuario: any): Observable<any>{
    return this.httpClient.put<any>(this.authUrl + `delete/${userName}`, usuario);
  }
}
