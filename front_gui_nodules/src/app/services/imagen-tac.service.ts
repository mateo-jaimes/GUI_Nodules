import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImagenTacService {

  authUrl = environment.authUrl+'api/imagenTacs';

  constructor(private httpClient:HttpClient) { }

  public lista(): Observable<any[]>{
    return this.httpClient.get<any[]>(this.authUrl);
  }
  public delete(id : string): Observable<any>{
    return this.httpClient.delete<any>(this.authUrl + `/${id}`);
  }
  public getById(id: string): Observable<any>{
    let api = `${this.authUrl}/${id}`
    return this.httpClient.get(api);
  }
  public update(id : string, ImagenTac: any): Observable<any>{
    return this.httpClient.put<any>(`${this.authUrl}/${id}`, ImagenTac);
  }
  public create(ImagenTac: any): Observable<any>{
    return this.httpClient.post<any>(this.authUrl,ImagenTac);
  }
}
