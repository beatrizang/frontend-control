import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Controles } from 'src/app/clases/controles';
import { ControlesService } from 'src/app/servicios/controles.service';
import { PersonasService } from 'src/app/servicios/personas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formmod-control',
  templateUrl: './formmod-control.component.html',
  styleUrls: ['./formmod-control.component.css']
})
export class FormmodControlComponent implements OnInit {

  control:Controles = new Controles();

  constructor(private activatedRoute: ActivatedRoute,
              private controlesService: ControlesService,
              private router: Router) { }

  ngOnInit(): void {
    this.cargarControl();
  }

  cargarControl(){
    this.activatedRoute.paramMap.subscribe(params =>{
      let id = +params.get('id');
      this.controlesService.getControl(id).subscribe(control => this.control = control);
    });
  }

  modificarControl():void{
    this.controlesService.modificarControl(this.control).subscribe(
      json => {
        this.router.navigate(['/controles',this.control.persona.id_persona]);
        Swal.fire('Control Modificado','Control actualizado con éxito','success');
      }
    )
  }

}
