import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegistroService } from 'src/app/services/registro.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-registro',
  templateUrl: './detalle-registro.component.html',
  styleUrls: ['./detalle-registro.component.css']
})
export class DetalleRegistroComponent implements OnInit {

  constructor(
      private activatedRoute: ActivatedRoute,
      private registroService:RegistroService
    ) { }

  registroUuid:string = '';
  resultDetail:any={};
  jsonString:string="";

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    this.registroUuid = params['uuid'];
    this.getResultDetails();
  }

  getResultDetails(){
    console.log(this.registroUuid);
    this.registroService.getByUuid(this.registroUuid).subscribe({
      next:res=>{
        console.log(res);
        this.resultDetail=res;
        this.jsonString = JSON.stringify(this.resultDetail, null, 2);
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
