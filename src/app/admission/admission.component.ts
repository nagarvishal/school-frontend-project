import { Component } from '@angular/core';

@Component({
  selector: 'app-admission',
  templateUrl: './admission.component.html',
  styleUrl: './admission.component.css'
})
export class AdmissionComponent {
  index:number = 0;
  changeindex(index:number){
    this.index = index;
  }
}
