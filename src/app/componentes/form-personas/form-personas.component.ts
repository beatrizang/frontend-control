import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Personas } from 'src/app/clases/personas';
import { PersonasService } from 'src/app/servicios/personas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-personas',
  templateUrl: './form-personas.component.html',
  styleUrls: ['./form-personas.component.css']
})
export class FormPersonasComponent implements OnInit {

  persona: Personas = new Personas();
  public errores: string[];

  constructor(private personaService:PersonasService, private router: Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarPersona();
  }

  cargarPersona():void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if(id){
        this.personaService.getPersona(id).subscribe((persona) => this.persona = persona)
      }
    })
  }

  crearPersona():void{
    this.personaService.crearPersona(this.persona).subscribe(
      json => {
        this.router.navigate(['/inicio'])
        Swal.fire('Nueva Persona',`Persona ${json.persona.apellido} creada con éxito`,'success');
      },
      err => {
        this.errores = err.error.errors as string[];
      }
    );
  }

  modificarPersona():void{
    this.personaService.modificarPersona(this.persona).subscribe(
      json => {
        this.router.navigate(['/inicio'])
        Swal.fire('Persona Modificada',`Persona ${json.persona.apellido} actualizada con éxito`,'success');
      },
      err => {
        this.errores = err.error.errors as string[];
      }
    )
  }

}
