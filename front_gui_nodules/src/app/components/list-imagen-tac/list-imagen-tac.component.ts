import { Component, OnInit } from '@angular/core';
import { ImagenTacService } from 'src/app/services/imagen-tac.service';

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
        if(res.exitosa){
          this.imagenesTac=res.objeto;
          console.log(this.imagenesTac);
        }
      },
      error:err=>{
        console.log(err);
      }
    })
  }


  borrar(tipoUser:any){
    this.imagenTacService.delete(tipoUser.id,tipoUser).subscribe({
      next:res=>{
        this.ngOnInit();
      },
      error:err=>{
        console.log(err);
      }
    })
  }

}
