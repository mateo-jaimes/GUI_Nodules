import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private router:Router, public fb: FormBuilder, private activatedRoute: ActivatedRoute, private parametroService: ParametroService) { 
    this.parametroForm = this.fb.group({
      parametro: ['',[Validators.required]],
      valor: ['',[Validators.required]],
      descripcion: ['',[Validators.required]],
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
        this.parametroEdit=res;
        this.fillForm();
      },
      error:err=>{
        Swal.fire({
          title: 'Error',
          text:err.error.exception,
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      },
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
          }).then(() => {
            this.router.navigate(['parametros/listar']);
          })
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
      this.parametroService.update(this.parametroId,this.parametroForm.value).subscribe({
        next:res=>{
          Swal.fire({
            title: 'Edición Exitosa',
            icon: 'success',
            confirmButtonText: 'Aceptar',
          }).then(() => {
            this.router.navigate(['parametros/listar']);
          })
        },
        error:err=>{
          Swal.fire({
            title: 'Error',
            text:err.error.exception,
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
        },
      })
  }

  irAtras(){
    window.history.back();
  }

}
