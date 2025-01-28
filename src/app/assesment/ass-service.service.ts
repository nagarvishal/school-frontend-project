import { Injectable } from '@angular/core';
import { Envirment } from '../../envirment/envirment.variables';
import { CommonserviceService } from '../_services/commonservice.service';

@Injectable()
export class AssServiceService {

  constructor(private service:CommonserviceService) { }
  
  
  
  async fetchasnwers(this:any,filter:any={}){

  }
  async fetchAttempedAssesments(this:any,filter:any={}){
    
  }

  async fetchAssesment(this:any,filter:any={}){
      let strfilter = "";
      const tags = ["assesment_id","title","description","duration","subject_id","class","createdAt","updatedAt"];
      let index=0;
      for(let key of Object.keys(filter)){
        if(tags.includes(key) && index==0) strfilter = strfilter + `?${key}=${filter[key]}`;
        else strfilter = strfilter + `&${key}=${filter[key]}`;
      }
      const url = Envirment.url + `/assesment/fetch`;
      const headers = this.service.defaultHeader();
      this.service.getAPICall(url,headers).subscribe({
          next:(response:any)=>{
              this.assesments = response.data;
          },
          error:(e:Error)=>{
              console.log("error,",e);
          },
          complete:()=>{
              console.log("process has been completed");
          }
      })
  }
  async fetchquestion(this:any,filter:any={}){

  }
  async fetchsubject(this:any){
      const url = Envirment.url+"/subject";
      const headers = this.service.defaultHeader();
      this.service.getAPICall(url,headers).subscribe({
          next:(response:any)=>{
              this.subjects = response.data;
          },
          error:(e:Error)=>{
              console.log("this is and error",e);
          },
          complete:()=>{
              console.log("subject fetch successfully");
          }
      }).closed;
  }
}
