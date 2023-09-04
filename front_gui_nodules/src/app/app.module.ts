import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule }from '@angular/common/http';
import { FormsModule, ReactiveFormsModule }from '@angular/forms';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';
import { ListUsuarioComponent } from './components/list-usuario/list-usuario.component';
import { ListTipoUsuarioComponent } from './components/list-tipo-usuario/list-tipo-usuario.component';
import { ListTipoRegistroComponent } from './components/list-tipo-registro/list-tipo-registro.component';
import { ListRegistroComponent } from './components/list-registro/list-registro.component';
import { ListParametroComponent } from './components/list-parametro/list-parametro.component';
import { ListImagenTacComponent } from './components/list-imagen-tac/list-imagen-tac.component';
import { CreateUsuarioComponent } from './components/create-usuario/create-usuario.component';
import { CreateTipoUsuarioComponent } from './components/create-tipo-usuario/create-tipo-usuario.component';
import { CreateTipoRegistroComponent } from './components/create-tipo-registro/create-tipo-registro.component';
import { CreateRegistroComponent } from './components/create-registro/create-registro.component';
import { CreateParametroComponent } from './components/create-parametro/create-parametro.component';
import { CreateImagenTacComponent } from './components/create-imagen-tac/create-imagen-tac.component';
import { MenuComponent } from './components/menu/menu.component';
import { VisualizadorComponent } from './components/visualizador/visualizador.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListUsuarioComponent,
    ListTipoUsuarioComponent,
    ListTipoRegistroComponent,
    ListRegistroComponent,
    ListParametroComponent,
    ListImagenTacComponent,
    CreateUsuarioComponent,
    CreateTipoUsuarioComponent,
    CreateTipoRegistroComponent,
    CreateRegistroComponent,
    CreateParametroComponent,
    CreateImagenTacComponent,
    MenuComponent,
    VisualizadorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    TokenService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
