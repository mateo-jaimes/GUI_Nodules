import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParametroService {

  authUrl = environment.authUrl+'Parametro/';

  constructor(private httpClient:HttpClient) { }

  public lista(): Observable<any[]>{
    return this.httpClient.get<any[]>(this.authUrl + 'getAll');
  }
  public delete(id : string, parametro: any): Observable<any>{
    return this.httpClient.put<any>(this.authUrl + `delete/${id}`, parametro);
  }
  public getById(id: string): Observable<any>{
    let api = `${this.authUrl}getById`
    let params = new HttpParams();
    params = params.append('id', id);
    return this.httpClient.get(api,{params: params});
  }
  public update(parametro: any): Observable<any>{
    return this.httpClient.post<any>(this.authUrl + `update`, parametro);
  }
  public create(parametro: any): Observable<any>{
    return this.httpClient.post<any>(this.authUrl + 'create',parametro);
  }
}
