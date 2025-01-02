import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CommonserviceService } from '../_services/commonservice.service';



@Component({
  selector: 'app-comunication',
  templateUrl: './comunication.component.html',
  styleUrl: './comunication.component.css'
})
export class ComunicationComponent {
  editorValue:string = "";
}
