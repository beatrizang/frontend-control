
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError, map, tap } from 'rxjs';
import { Personas } from '../clases/personas';
import { AuthloginService } from './authlogin.service';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  private urlEndPoint: string = 'http://localhost:8080/api/personas';

  constructor(private http:HttpClient, private router:Router, private authService:AuthloginService) { }

  getPersonas(page: number):Observable<any[]>{
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      tap((response:any) => {
        (response.content as Personas[]).forEach(persona =>{
          console.log(persona.nombre);
        });
      }),
      map((response:any) => {
        (response.content as Personas[]).map(persona => {
          persona.apellido = persona.apellido.toUpperCase();
          persona.nombre = persona.nombre.toUpperCase();
          return persona;
        });
        return response;
      }),
      tap(response =>{
        (response.content as Personas[]).forEach(persona => {
          console.log(persona.nombre);
        });
      })
    );
  }

  crearPersona(persona: Personas):Observable<any>{
    return this.http.post<Personas>(this.urlEndPoint,persona).pipe(
      catchError(e => {
        if(e.status==400){
          return throwError(e);
        }
        return throwError(e);
      })
    );
  }

  getPersona(id):Observable<Personas>{
    return this.http.get<Personas>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e =>{
        if(e.status != 401 && e.error.mensaje){
        this.router.navigate(['/inicio']);
        console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  modificarPersona(persona: Personas):Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${persona.id_persona}`,persona).pipe(
      catchError(e => {

        if(e.status==400){
          return throwError(e);
        }

        return throwError(e);
      })
    );
  }

  eliminarPersona(id: number):Observable<Personas>{
    return this.http.delete<Personas>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }
}
