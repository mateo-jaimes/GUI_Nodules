import { Component, OnInit } from '@angular/core';
import { RegistroService } from 'src/app/services/registro.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-registro',
  templateUrl: './list-registro.component.html',
  styleUrls: ['./list-registro.component.css']
})
export class ListRegistroComponent implements OnInit {

  
  
  constructor(private registroService:RegistroService) { }

  registros:any[] = [];

  ngOnInit(): void {
    this.getTipoRegistros();
  }

  getTipoRegistros(){
    this.registroService.lista().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.registros=res;
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
    this.registroService.delete(tipoUser.id).subscribe({
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
