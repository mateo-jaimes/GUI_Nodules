import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

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
        if(res){
          this.users=res;
          console.log(this.users);
        }
      },
      error:err=>{
        Swal.fire({
          title: 'Error',
          text:err.error.exception,
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      }
    })
  }


  borrar(user:any){
    this.usuarioService.delete(user.id).subscribe({
      next:res=>{
        this.ngOnInit();
      },
      error:err=>{
        Swal.fire({
          title: 'Error',
          text:err.error.exception,
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
        console.log(err);
      }
    })
  }

}
