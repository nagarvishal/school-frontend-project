import { Component } from '@angular/core';
import { AssServiceService } from '../ass-service.service';
import { CommonserviceService } from '../../_services/commonservice.service';

@Component({
  selector: 'app-review-assesment',
  templateUrl: './review-assesment.component.html',
  styleUrl: './review-assesment.component.css'
})
export class ReviewAssesmentComponent {

  assesments:any = [];
  studentAssesment:any = [];
  constructor(private aservice:AssServiceService,private service:CommonserviceService){
    // fetchassesment();
    // fetchAnswers();
    aservice.fetchAssesment(this);
    aservice.fetchAttempedAssesments(this);

  }
}
