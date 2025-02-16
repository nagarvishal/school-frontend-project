import { Component } from '@angular/core';
import { AssServiceService } from '../ass-service.service';
import { CommonserviceService } from '../../_services/commonservice.service';
import { Envirment } from '../../../envirment/envirment.variables';

@Component({
  selector: 'app-review-assesment',
  templateUrl: './review-assesment.component.html',
  styleUrl: './review-assesment.component.css'
})
export class ReviewAssesmentComponent {
    name: string = "vihsal nagar";
    assesments: any = [];
    studentAssesment: any = [];
    constructor(private aservice: AssServiceService, private service: CommonserviceService) {
        this.fetchDetails();
    }
    async fetchDetails(){
        var url =  "/assesment/fetch";
        await this.aservice.generalGetApiCall(this,url,{},"assesments");
        var url = "/assesment/student/answers";
        await this.aservice.generalGetApiCall(this,url,{ user_id : sessionStorage.getItem("user_id") },"studentAssesment");
    }
}
