import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Controles } from '../clases/controles';

@Injectable({
  providedIn: 'root'
})
export class ControlesService {

  private urlEndPoint: string = 'http://localhost:8080/api/controles';

  private httpHeaders = new HttpHeaders({'Content-type' : 'application/json'})

  constructor(private http:HttpClient) { }

  getControles():Observable<Controles[]>{
    return this.http.get<Controles[]>(this.urlEndPoint);
  }

  crearControl(control: Controles):Observable<Controles>{
    return this.http.post<Controles>(this.urlEndPoint,control, {headers:this.httpHeaders});
  }

  getControl(id):Observable<Controles>{
    return this.http.get<Controles>(`${this.urlEndPoint}/${id}`);
  }

  modificarControl(control: Controles):Observable<Controles>{
    return this.http.put<Controles>(`${this.urlEndPoint}/${control.id_control}`,control,{headers:this.httpHeaders});
  }

  eliminarControl(id: number):Observable<Controles>{
    return this.http.delete<Controles>(`${this.urlEndPoint}/${id}`,{headers:this.httpHeaders});
  }
}
