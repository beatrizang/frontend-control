import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ControlesComponent } from './componentes/controles/controles.component';
import { FormControlComponent } from './componentes/form-control/form-control.component';
import { FormPersonasComponent } from './componentes/form-personas/form-personas.component';
import { LoginComponent } from './componentes/login/login.component';
import { PersonasComponent } from './componentes/personas/personas.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  {path:'',redirectTo:'inicio',pathMatch:'full'},
  {path:'inicio', component:PersonasComponent},
  {path:'personas/form',component:FormPersonasComponent, canActivate:[AuthGuard,RoleGuard],data:{role:'ROLE_ADMIN'}},
  {path:'personas/form/:id',component:FormPersonasComponent,  canActivate:[AuthGuard,RoleGuard],data:{role:'ROLE_ADMIN'}
},
  {path:'inicio/page/:page', component:PersonasComponent},
  {path:'login',component:LoginComponent},
  {path:'controles/:id',component:ControlesComponent},
  {path:'controles/form',component:FormControlComponent},
  {path:'controles/form/:id',component:FormControlComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
