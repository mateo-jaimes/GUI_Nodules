import { Component, OnInit } from '@angular/core';
import { ParametroService } from 'src/app/services/parametro.service';

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
        if(res.exitosa){
          this.parametros=res.objeto;
          console.log(this.parametros);
        }
      },
      error:err=>{
        console.log(err);
      }
    })
  }


  borrar(tipoUser:any){
    this.parametroService.delete(tipoUser.id,tipoUser).subscribe({
      next:res=>{
        this.ngOnInit();
      },
      error:err=>{
        console.log(err);
      }
    })
  }

}
