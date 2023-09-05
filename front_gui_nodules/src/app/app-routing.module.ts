import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ListUsuarioComponent } from './components/list-usuario/list-usuario.component';
import { VisualizadorComponent } from './components/visualizador/visualizador.component';
import { CreateUsuarioComponent } from './components/create-usuario/create-usuario.component';
import { ListTipoUsuarioComponent } from './components/list-tipo-usuario/list-tipo-usuario.component';
import { CreateTipoUsuarioComponent } from './components/create-tipo-usuario/create-tipo-usuario.component';
import { ListImagenTacComponent } from './components/list-imagen-tac/list-imagen-tac.component';
import { CreateImagenTacComponent } from './components/create-imagen-tac/create-imagen-tac.component';
import { ListParametroComponent } from './components/list-parametro/list-parametro.component';
import { CreateParametroComponent } from './components/create-parametro/create-parametro.component';
import { ListRegistroComponent } from './components/list-registro/list-registro.component';
import { CreateRegistroComponent } from './components/create-registro/create-registro.component';
import { ListTipoRegistroComponent } from './components/list-tipo-registro/list-tipo-registro.component';
import { CreateTipoRegistroComponent } from './components/create-tipo-registro/create-tipo-registro.component';

const routes: Routes = [
  {
    path:'auth/login',
    component:LoginComponent
  },
  {
    path:'imagenesTac/listar',
    component:ListImagenTacComponent
  },
  {
    path:'imagenesTac/crear',
    component:CreateImagenTacComponent
  },
  {
    path:'imagenesTac/editar/:id',
    component:CreateImagenTacComponent
  },
  {
    path:'parametros/listar',
    component:ListParametroComponent
  },
  {
    path:'parametros/crear',
    component:CreateParametroComponent
  },
  {
    path:'parametros/editar/:id',
    component:CreateParametroComponent
  },
  {
    path:'registros/listar',
    component:ListRegistroComponent
  },
  {
    path:'registros/crear',
    component:CreateRegistroComponent
  },
  {
    path:'registros/editar/:id',
    component:CreateRegistroComponent
  },
  {
    path:'tipoRegistros/listar',
    component:ListTipoRegistroComponent
  },
  {
    path:'tipoRegistros/crear',
    component:CreateTipoRegistroComponent
  },
  {
    path:'tipoRegistros/editar/:id',
    component:CreateTipoRegistroComponent
  },
  {
    path:'tipoUsuarios/listar',
    component:ListTipoUsuarioComponent
  },
  {
    path:'tipoUsuarios/crear',
    component:CreateTipoUsuarioComponent
  },
  {
    path:'tipoUsuarios/editar/:id',
    component:CreateTipoUsuarioComponent
  },
  {
    path:'usuario/listar',
    component:ListUsuarioComponent
  },
  {
    path:'usuario/crear',
    component:CreateUsuarioComponent
  },
  {
    path:'usuario/editar/:id',
    component:CreateUsuarioComponent
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
