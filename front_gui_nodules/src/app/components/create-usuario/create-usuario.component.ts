import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TipoUsuarioService } from 'src/app/services/tipo-usuario.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-create-usuario',
  templateUrl: './create-usuario.component.html',
  styleUrls: ['./create-usuario.component.css']
})
export class CreateUsuarioComponent implements OnInit {

  userForm: FormGroup;

  userId:string = '';
  edit:boolean = false;
  userEdit:any={};
  tipoUsaurioList:any=[];

  constructor(public fb: FormBuilder, private activatedRoute: ActivatedRoute, private usuarioService: UsuarioService, private tipoUsuarioServie:TipoUsuarioService) { 
    this.userForm = this.fb.group({
      nombre: ['',[Validators.required]],
      apellido: ['',[Validators.required]],
      username: ['',[Validators.required]],
      telefono: ['',[Validators.required]],
      pass: ['',[Validators.required]],
      email: ['',[Validators.required]],
      tipo_usuario: ['',[Validators.required]],
    });
  }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    this.getTipoUsuarios();
    this.userId = params['id'];
    if(this.userId !== undefined){
      this.edit=true;
      this.getUserEdit()
    } 
  }

  getTipoUsuarios(){
    this.tipoUsuarioServie.lista().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.tipoUsaurioList=res.objeto;
      },
      error:error=>{
        console.log(error);
      }
    })
  }

  getUserEdit(){
    this.usuarioService.getById(this.userId).subscribe({
      next:res=>{
        console.log(res);
        this.userEdit=res.objeto;
        this.fillForm();
      },
      error:err=>{
        console.log(err);
      }
    })
  }

  fillForm(){
    this.userForm.get('nombre')!.setValue(this.userEdit.nombre);
    this.userForm.get('apellido')!.setValue(this.userEdit.apellido);
    this.userForm.get('email')!.setValue(this.userEdit.email);
    this.userForm.get('telefono')!.setValue(this.userEdit.telefono);
    this.userForm.get('pass')!.setValue(this.userEdit.pass);
    this.userForm.get('username')!.setValue(this.userEdit.username);
    this.userForm.get('tipo_usuario')!.setValue(this.userEdit.tipoUsuario);
  }


  onCreate(){
      this.usuarioService.create(this.userForm.value).subscribe({
        next:res=>{
          console.log(res);
        },
        error:err=>{

        },
      })
  }

  onEdit(){
    let usuario:any={};
      this.usuarioService.update(this.userId,usuario).subscribe({
        next:res=>{

        },
        error:err=>{

        },
      })
  }

  irAtras(){
    window.history.back();
  }


}
