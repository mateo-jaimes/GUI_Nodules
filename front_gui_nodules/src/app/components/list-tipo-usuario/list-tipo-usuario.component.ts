import { Component, OnInit } from '@angular/core';
import { TipoUsuarioService } from 'src/app/services/tipo-usuario.service';

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
        if(res.exitosa){
          this.tipoUsuarios=res.objeto;
          console.log(this.tipoUsuarios);
        }
      },
      error:err=>{
        console.log(err);
      }
    })
  }


  borrar(tipoUser:any){
    this.tipoUsuarioService.delete(tipoUser.id,tipoUser).subscribe({
      next:res=>{
        this.ngOnInit();
      },
      error:err=>{
        console.log(err);
      }
    })
  }

}
