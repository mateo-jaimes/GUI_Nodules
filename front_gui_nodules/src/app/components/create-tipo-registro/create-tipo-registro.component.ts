import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TipoRegistroService } from 'src/app/services/tipo-registro.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-tipo-registro',
  templateUrl: './create-tipo-registro.component.html',
  styleUrls: ['./create-tipo-registro.component.css']
})
export class CreateTipoRegistroComponent implements OnInit {

  
  tipoRegistroForm: FormGroup;

  tipoRegistroId:string = '';
  edit:boolean = false;
  tipoRegistroEdit:any={};

  constructor(public fb: FormBuilder, private activatedRoute: ActivatedRoute, private tipoRegistroService: TipoRegistroService) { 
    this.tipoRegistroForm = this.fb.group({
      tipoRegistro: ['',[Validators.required]],
    });
  }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    this.tipoRegistroId = params['id'];
    if(this.tipoRegistroId !== undefined){
      this.edit=true;
      this.getTipoRegistroEdit()
    } 
  }

  getTipoRegistroEdit(){
    this.tipoRegistroService.getById(this.tipoRegistroId).subscribe({
      next:res=>{
        console.log(res);
        this.tipoRegistroEdit=res.objeto;
        this.fillForm();
      },
      error:err=>{
        console.log(err);
      }
    })
  }

  fillForm(){
    this.tipoRegistroForm.get('tipoRegistro')!.setValue(this.tipoRegistroEdit.tipoRegistro);
  }


  onCreate(){
      this.tipoRegistroService.create(this.tipoRegistroForm.value).subscribe({
        next:res=>{
          Swal.fire({
            title: 'Creación Exitosa',
            icon: 'success',
            confirmButtonText: 'Aceptar',
          });
          this.irAtras();
        },
        error:err=>{
          Swal.fire({
            title: 'Error',
            text: err.message,
            icon: 'error',
            confirmButtonText: 'Aceptar',
          })
        },
      })
  }

  onEdit(){
    this.tipoRegistroEdit.tipoRegistro = this.tipoRegistroForm.value.tipoRegistro
      this.tipoRegistroService.update(this.tipoRegistroEdit).subscribe({
        next:res=>{
          Swal.fire({
            title: 'Edición Exitosa',
            icon: 'success',
            confirmButtonText: 'Aceptar',
          });
          this.irAtras();
        },
        error:err=>{

        },
      })
  }

  irAtras(){
    window.history.back();
  }

}
