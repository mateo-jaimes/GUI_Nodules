import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ListUsuarioComponent } from './components/list-usuario/list-usuario.component';
import { VisualizadorComponent } from './components/visualizador/visualizador.component';

const routes: Routes = [
  {
    path:'auth/login',
    component:LoginComponent
  },
  {
    path:'usuario/listar',
    component:ListUsuarioComponent
  },
  {
    path:'view',
    component:VisualizadorComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
