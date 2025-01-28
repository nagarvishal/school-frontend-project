import { Component, Inject } from '@angular/core';
import { CommonserviceService } from '../../_services/commonservice.service';
import { Envirment } from '../../../envirment/envirment.variables';
import { FormBuilder } from '@angular/forms';
import { Validators } from 'ngx-editor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-takeassesment',
  templateUrl: './takeassesment.component.html',
  styleUrl: './takeassesment.component.css'
})
export class TakeassesmentComponent {
    subjects: any = [];
    form:any;
    assesments: any;
    
    constructor(@Inject(CommonserviceService) public service:CommonserviceService,public fb:FormBuilder,private router:Router ){
        this.fetchsubject();
        this.createFormGroup();
    }
    createFormGroup(){
        this.form = this.fb.group({
            class : ['',[Validators.required]],
            subject_id : ['',[Validators.required]],
            assesment_id : ['',[Validators.required]]
        })
    }

    get formvalue(){
      return this.form.controls;
    }

    fetchsubject(){
        const url = Envirment.url+"/subject";
        const headers = this.service.defaultHeader();
        this.service.getAPICall(url,headers).subscribe({
            next:(response)=>{
                this.subjects = response.data;
            },
            error:(e)=>{
                console.log("this is and error",e);
            },
            complete:()=>{
                console.log("subject fetch successfully");
            }
        }).closed;
    }

    fetchAssesment(){
      const url = Envirment.url + `/assesment/fetch?subject_id=${this.form.value["subject_id"]}&class=${this.form.value["class"]}`;
      const headers = this.service.defaultHeader();
      this.service.getAPICall(url,headers).subscribe({
          next:(response:any)=>{
              this.assesments = response.data;
          },
          error:(e)=>{
              console.log("error,",e);
          },
          complete:()=>{
              console.log("process has been completed");
          }
      })
    }

    submitForm(){
      console.log(this.form.value);
    }
    startAssesment(){
      const assesment_id = this.form.value["assesment_id"];
      const classes = this.form.value["class"];
      const subject_id = this.form.value["subject_id"];
      if(assesment_id){
        this.router.navigate(["assesment/start"],{queryParams:{assesment_id:assesment_id,class:classes,subject_id:subject_id}});
      }
    }

    changeSubject(){
      if(this.form.value["subject_id"] && this.form.value["class"]){
        this.fetchAssesment();
      }
    }

}
