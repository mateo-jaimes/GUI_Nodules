import { Component, OnInit } from '@angular/core';
import { ImagenTacService } from 'src/app/services/imagen-tac.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-imagen-tac',
  templateUrl: './list-imagen-tac.component.html',
  styleUrls: ['./list-imagen-tac.component.css']
})
export class ListImagenTacComponent implements OnInit {

  
  constructor(private imagenTacService:ImagenTacService) { }

  imagenesTac:any[] = [];

  ngOnInit(): void {
    this.getTipoRegistros();
  }

  getTipoRegistros(){
    this.imagenTacService.lista().subscribe({
      next:(res:any)=>{
        this.imagenesTac=res;
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
    this.imagenTacService.delete(tipoUser.id).subscribe({
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
