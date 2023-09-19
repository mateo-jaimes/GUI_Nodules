import { Component, OnInit } from '@angular/core';
import { TipoUsuarioService } from 'src/app/services/tipo-usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-tipo-usuario',
  templateUrl: './list-tipo-usuario.component.html',
  styleUrls: ['./list-tipo-usuario.component.css']
})
export class ListTipoUsuarioComponent implements OnInit {

  
  constructor(private tipoUsuarioService:TipoUsuarioService) { }

  tipoUsuarios:any[] = [];

  ngOnInit(): void {
    this.getTipoUsuarios();
  }

  getTipoUsuarios(){
    this.tipoUsuarioService.lista().subscribe({
      next:(res:any)=>{
        this.tipoUsuarios=res;
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


  borrar(tipoUser:any){
    this.tipoUsuarioService.delete(tipoUser.id).subscribe({
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
      }
    })
  }

}
