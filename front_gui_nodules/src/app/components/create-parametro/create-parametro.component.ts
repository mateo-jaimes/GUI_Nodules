import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ParametroService } from 'src/app/services/parametro.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-parametro',
  templateUrl: './create-parametro.component.html',
  styleUrls: ['./create-parametro.component.css']
})
export class CreateParametroComponent implements OnInit {

  
  parametroForm: FormGroup;

  parametroId:string = '';
  edit:boolean = false;
  parametroEdit:any={};

  constructor(public fb: FormBuilder, private activatedRoute: ActivatedRoute, private parametroService: ParametroService) { 
    this.parametroForm = this.fb.group({
      parametro: ['',[Validators.required]],
      valor: ['',[Validators.required]],
      usuarioModifica: [1],
    });
  }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    this.parametroId = params['id'];
    if(this.parametroId !== undefined){
      this.edit=true;
      this.getParametroEdit()
    } 
  }

  getParametroEdit(){
    this.parametroService.getById(this.parametroId).subscribe({
      next:res=>{
        console.log(res);
        this.parametroEdit=res.objeto;
        this.fillForm();
      },
      error:err=>{
        console.log(err);
      }
    })
  }

  fillForm(){
    this.parametroForm.get('parametro')!.setValue(this.parametroEdit.parametro);
    this.parametroForm.get('valor')!.setValue(this.parametroEdit.valor);
  }


  onCreate(){
      this.parametroService.create(this.parametroForm.value).subscribe({
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
    this.parametroEdit.parametro = this.parametroForm.value.parametro;
    this.parametroEdit.valor = this.parametroForm.value.valor;
      this.parametroService.update(this.parametroEdit).subscribe({
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
