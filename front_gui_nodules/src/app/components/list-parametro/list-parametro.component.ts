import { Component, OnInit } from '@angular/core';
import { ParametroService } from 'src/app/services/parametro.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-parametro',
  templateUrl: './list-parametro.component.html',
  styleUrls: ['./list-parametro.component.css']
})
export class ListParametroComponent implements OnInit {

  constructor(private parametroService:ParametroService) { }

  parametros:any[] = [];

  ngOnInit(): void {
    this.getTipoRegistros();
  }

  getTipoRegistros(){
    this.parametroService.lista().subscribe({
      next:(res:any)=>{
        this.parametros=res;
        console.log(this.parametros);
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
    this.parametroService.delete(tipoUser.id).subscribe({
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
