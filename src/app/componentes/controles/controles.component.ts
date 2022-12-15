import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Controles } from 'src/app/clases/controles';
import { Personas } from 'src/app/clases/personas';
import { ControlesService } from 'src/app/servicios/controles.service';
import { PersonasService } from 'src/app/servicios/personas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-controles',
  templateUrl: './controles.component.html',
  styleUrls: ['./controles.component.css']
})
export class ControlesComponent implements OnInit {

  persona: Personas = new Personas();
  

  constructor(private personaService: PersonasService,
    private activatedRoute: ActivatedRoute,
    private controlService:ControlesService) { }

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

  eliminar(control: Controles){
    Swal.fire({
      title: 'Estas seguro de eliminar este control?',
      text: "Al realizar esta acción no hay vuelta atrás!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar!',
      cancelButtonText: 'No, Cancelar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.controlService.eliminarControl(control.id_control).subscribe(
          response =>{
            this.persona.controles = this.persona.controles.filter(c => c !== control)
            Swal.fire(
              'Eliminado!',
              `El control ${control.id_control} fue eliminado con éxito.`,
              'success'
            )
          }
        )

      }
    })
  }

}
