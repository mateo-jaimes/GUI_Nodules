import { Component, OnInit } from '@angular/core';
import { TipoRegistroService } from 'src/app/services/tipo-registro.service';

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
        if(res.exitosa){
          this.tipoRegistro=res.objeto;
          console.log(this.tipoRegistro);
        }
      },
      error:err=>{
        console.log(err);
      }
    })
  }


  borrar(tipoUser:any){
    this.tipoRegistroService.delete(tipoUser.id,tipoUser).subscribe({
      next:res=>{
        this.ngOnInit();
      },
      error:err=>{
        console.log(err);
      }
    })
  }

}
