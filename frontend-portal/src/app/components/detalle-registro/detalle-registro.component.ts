import { Component, ElementRef, Renderer2, OnInit } from '@angular/core';
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
      private registroService:RegistroService,
      private el: ElementRef, private renderer: Renderer2
    ) { }

  registroUuid:string = '';
  resultDetail:any={};
  jsonString:string="";
  imageShow:string="data:image/png;";

  isLoading:boolean=false;

  ngOnInit(): void {
    this.isLoading = true;
    const params = this.activatedRoute.snapshot.params;
    this.registroUuid = params['uuid'];
    this.getResultDetails();
    const imageContainer = this.el.nativeElement.querySelector('.image-container');
    const image = imageContainer.querySelector('img');

    let isZoomed = false;

    this.renderer.listen(imageContainer, 'click', () => {
      isZoomed = !isZoomed;

      if (isZoomed) {
        this.renderer.addClass(imageContainer, 'zoomed');
      } else {
        this.renderer.removeClass(imageContainer, 'zoomed');
      }
    });
  }

  getColorBackground(id: number): string {
    switch (id) {
      case 1:
        return '#f70707'; //red
      case 2:
        return '#e2f720'; //yellow
      case 3:
        return '#e2f720'; //yellow
      case 4:
        return '#28de18'; //green
      default:
        return 'transparent'; // Color por defecto o transparente si no coincide con ninguno
    }
  }
  getResultDetails(){
    console.log(this.registroUuid);
    this.registroService.getByUuid(this.registroUuid).subscribe({
      next:res=>{
        this.isLoading = false;
        console.log(res);
        this.resultDetail=res;
        this.imageShow += this.resultDetail.imagenPrevia;
        this.jsonString = JSON.stringify(this.resultDetail, null, 2);
      },
      error:err=>{
        this.isLoading = false;
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