import { Component, OnInit } from '@angular/core';
import { Router, TitleStrategy } from '@angular/router';
import { Usuario } from 'src/app/clases/usuario';
import { AuthloginService } from 'src/app/servicios/authlogin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario:Usuario;

  constructor(private authService: AuthloginService, private router: Router) { 
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      Swal.fire('Login',`Hola ${this.authService.usuario.username} ya estas autenticado!`,'info');
      this.router.navigate(['/inicio']);
    }
  }

  login():void{
    console.log(this.usuario);
    if(this.usuario.username == null || this.usuario.password == null){
      Swal.fire('Error Login','Username o Password vacios!','error');
      return;
    }

    this.authService.login(this.usuario).subscribe(response => {
      console.log(response);

      this.authService.guardarusuario(response.access_token);
      this.authService.guardarToken(response.access_token);

      let usuario = this.authService.usuario;

      this.router.navigate(['/inicio']);
      Swal.fire('Login',`Hola ${usuario.username}, has iniciado sesión con éxito`,'success');
    }, err =>{
      if(err.status == 400){
        Swal.fire('Error Login','Username o Password incorrectas!','error');
      }
    }
    );
  }

}
