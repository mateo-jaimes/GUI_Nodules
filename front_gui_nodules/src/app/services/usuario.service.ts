import { HttpClient, HttpParams } from '@angular/common/http';
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
  public delete(userId : string, usuario: any): Observable<any>{
    return this.httpClient.put<any>(this.authUrl + `delete/${userId}`, usuario);
  }
  public getById(userId: string): Observable<any>{
    let api = `${this.authUrl}getById`
    let params = new HttpParams();
    params = params.append('id', userId);
    return this.httpClient.get(api,{params: params});
  }
  public update(userId : string, usuario: any): Observable<any>{
    return this.httpClient.put<any>(this.authUrl + `update/${userId}`, usuario);
  }
  public create(nuevoUsuario: any): Observable<any>{
    return this.httpClient.post<any>(this.authUrl + 'create',nuevoUsuario);
  }
}
