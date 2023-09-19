import { Component, OnInit } from '@angular/core';
import { TipoRegistroService } from 'src/app/services/tipo-registro.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-tipo-registro',
  templateUrl: './list-tipo-registro.component.html',
  styleUrls: ['./list-tipo-registro.component.css']
})
export class ListTipoRegistroComponent implements OnInit {

  
  constructor(private tipoRegistroService:TipoRegistroService) { }

  tipoRegistro:any[] = [];

  ngOnInit(): void {
    this.getTipoRegistros();
  }

  getTipoRegistros(){
    this.tipoRegistroService.lista().subscribe({
      next:(res:any)=>{
        this.tipoRegistro=res;
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
    this.tipoRegistroService.delete(tipoUser.id).subscribe({
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
