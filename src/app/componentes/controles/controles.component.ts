import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Personas } from 'src/app/clases/personas';
import { PersonasService } from 'src/app/servicios/personas.service';

@Component({
  selector: 'app-controles',
  templateUrl: './controles.component.html',
  styleUrls: ['./controles.component.css']
})
export class ControlesComponent implements OnInit {

  persona: Personas = new Personas();

  constructor(private personaService: PersonasService,
    private activatedRoute: ActivatedRoute) { }

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

}
