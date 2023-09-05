import { Component, OnInit } from '@angular/core';
import { RegistroService } from 'src/app/services/registro.service';

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
        if(res.exitosa){
          this.registros=res.objeto;
          console.log(this.registros);
        }
      },
      error:err=>{
        console.log(err);
      }
    })
  }


  borrar(tipoUser:any){
    this.registroService.delete(tipoUser.id,tipoUser).subscribe({
      next:res=>{
        this.ngOnInit();
      },
      error:err=>{
        console.log(err);
      }
    })
  }

}
