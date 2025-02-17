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
    cassesment:number = -1;
    assesmentQA:any = [];
    constructor(private aservice: AssServiceService, private service: CommonserviceService) {
        this.fetchDetails();
    }
    async fetchDetails(){
        var url =  "/assesment/fetch";
        await this.aservice.generalGetApiCall(this,url,{},"assesments");
        var url = "/assesment/student/answers";
        await this.aservice.generalGetApiCall(this,url,{ user_id : sessionStorage.getItem("user_id") },"studentAssesment");
    }
    findAssesment(assesment_id:string){
        for(let assesment of this.assesments){
            if(assesment.assesment_id == assesment_id){
                return assesment;
            }
        }
        return null;
    }
    async clickOnAssesment(index:number){
        this.cassesment = index;
        const url = `/assesment/question/${this.studentAssesment[index].assesment_id}`;
        await this.aservice.generalGetApiCall(this,url,{},"assesmentQA");
    }

}
