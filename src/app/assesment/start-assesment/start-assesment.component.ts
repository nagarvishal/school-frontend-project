import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Envirment } from '../../../envirment/envirment.variables';
import { CommonserviceService } from '../../_services/commonservice.service';

@Component({
  selector: 'app-start-assesment',
  templateUrl: './start-assesment.component.html',
  styleUrl: './start-assesment.component.css'
})
export class StartAssesmentComponent implements OnInit {
  assesment_id:string = "";
  questions:any = [];
  constructor(private route : ActivatedRoute, public service : CommonserviceService ){

  }

  changeAssesment(){
      if(this.assesment_id){
          const url = Envirment.url + `/assesment/question/fetch/${this.assesment_id}`;
          const headers = this.service.defaultHeader();
          const response = this.service.getAPICall(url,headers).subscribe({
              next:(response)=>{
                  if(response && response.data){
                      this.questions = response.data;
                      console.log(this.questions);
                  }
                  else{
                      this.questions = [];
                  }
              },
              error:(e)=>{
                  this.questions = [];
                  console.log(e);
              },
              complete:()=>{
                  console.log("process has been completed");
              }
            })
      }
    }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((value)=>{
      this.assesment_id = value.get("assesment_id");
      this.changeAssesment();
    })
  }
}
