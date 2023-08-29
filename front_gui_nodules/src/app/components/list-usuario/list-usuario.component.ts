import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-list-usuario',
  templateUrl: './list-usuario.component.html',
  styleUrls: ['./list-usuario.component.css']
})
export class ListUsuarioComponent implements OnInit {

  constructor(private usuarioService:UsuarioService) { }

  users:any[] = [];

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.usuarioService.lista().subscribe({
      next:(res:any)=>{
        if(res.exitosa){
          this.users=res.objeto;
          console.log(this.users);
        }
      },
      error:err=>{

      }
    })
  }


  borrar(user:any){
    this.usuarioService.delete(user.nombreUsuario,user).subscribe({
      next:res=>{
        this.ngOnInit();
      },
      error:err=>{
        console.log(err);
      }
    })
  }

}
