import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthloginService } from 'src/app/servicios/authlogin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public authService:AuthloginService, private router:Router) { }

  ngOnInit(): void {
  }

  logout():void{
    let username = this.authService.usuario.username;
    this.authService.logout();
    Swal.fire('Logout',`Adios ${username} has cerrado sesion`,'info');
    this.router.navigate(['/login']);
  }
}
