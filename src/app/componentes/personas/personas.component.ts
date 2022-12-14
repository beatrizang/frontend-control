import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { Personas } from 'src/app/clases/personas';
import { AuthloginService } from 'src/app/servicios/authlogin.service';
import { PersonasService } from 'src/app/servicios/personas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {

  personas: Personas[];
  paginador: any;

  constructor(private personasService: PersonasService,
              private activatedRoute: ActivatedRoute,
              public authService: AuthloginService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let page:number = +params.get('page');
      if(!page){
        page = 0;
      }
      this.personasService.getPersonas(page).pipe(
        tap((response:any) => {
          (response.content as Personas[]).forEach(persona => {
            console.log(persona.nombre)
          });
        })
      ).subscribe(response => {
        this.personas = response.content as Personas[];
        this.paginador = response;
      });
    }
    );
  }

  eliminarPersona(persona: Personas):void{
    Swal.fire({
      title: 'Estas seguro de eliminar esta persona?',
      text: "Al realizar esta acción no hay vuelta atrás!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar!',
      cancelButtonText: 'No, Cancelar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.personasService.eliminarPersona(persona.id_persona).subscribe(
          response =>{
            this.personas = this.personas.filter(pers => pers !== persona)
            Swal.fire(
              'Eliminada!',
              `La persona ${persona.apellido} fue eliminada con éxito.`,
              'success'
            )
          }
        )

      }
    })
  }

}
