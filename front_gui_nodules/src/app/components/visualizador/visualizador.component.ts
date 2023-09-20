import { Component, OnInit,ElementRef,NgZone } from '@angular/core';
import {reactToAngular} from 'react-to-angular';
import { viewer } from '../../../../../';

@Component({
  selector: 'app-visualizador',
  templateUrl: './visualizador.component.html',
  styleUrls: ['./visualizador.component.css']
})
export class VisualizadorComponent implements OnInit {

  constructor(private elementRef: ElementRef, private ngZone: NgZone) { }

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      reactToAngular('myReactApp', viewer, [], this.elementRef.nativeElement);
    });
  }

}
