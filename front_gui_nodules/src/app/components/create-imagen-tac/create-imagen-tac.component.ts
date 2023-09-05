import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ImagenTacService } from 'src/app/services/imagen-tac.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-imagen-tac',
  templateUrl: './create-imagen-tac.component.html',
  styleUrls: ['./create-imagen-tac.component.css']
})
export class CreateImagenTacComponent implements OnInit {

  
  imagenTacForm: FormGroup;

  imagenTacId:string = '';
  edit:boolean = false;
  imagenTacEdit:any={};

  constructor(public fb: FormBuilder, private activatedRoute: ActivatedRoute, private imagenTacService: ImagenTacService) { 
    this.imagenTacForm = this.fb.group({
      identificador: ['',[Validators.required]],
    });
  }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    this.imagenTacId = params['id'];
    if(this.imagenTacId !== undefined){
      this.edit=true;
      this.getImagenTacEdit()
    } 
  }

  getImagenTacEdit(){
    this.imagenTacService.getById(this.imagenTacId).subscribe({
      next:res=>{
        console.log(res);
        this.imagenTacEdit=res.objeto;
        this.fillForm();
      },
      error:err=>{
        console.log(err);
      }
    })
  }

  fillForm(){
    this.imagenTacForm.get('identificador')!.setValue(this.imagenTacEdit.identificador);
  }


  onCreate(){
      this.imagenTacService.create(this.imagenTacForm.value).subscribe({
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
    this.imagenTacEdit.identificador = this.imagenTacForm.value.identificador
      this.imagenTacService.update(this.imagenTacEdit).subscribe({
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
