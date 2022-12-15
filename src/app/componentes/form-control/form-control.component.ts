import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Controles } from 'src/app/clases/controles';
import { ControlesService } from 'src/app/servicios/controles.service';
import { PersonasService } from 'src/app/servicios/personas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.css']
})
export class FormControlComponent implements OnInit {

  control:Controles = new Controles();

  constructor(private personaService:PersonasService,
              private activatedRoute: ActivatedRoute,
              private controlesService: ControlesService,
              private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params =>{
      let personaId = +params.get('personaId');
      this.personaService.getPersona(personaId).subscribe(persona => this.control.persona = persona);
    });
  }

  crearControl():void{
    this.controlesService.crearControl(this.control).subscribe(control => {
      Swal.fire('Nuevo Control','Control creado con exito','success');
      this.router.navigate(['/controles',control.persona.id_persona]);
    })
  }

}
