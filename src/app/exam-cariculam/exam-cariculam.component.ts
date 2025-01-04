import { Component, Inject } from '@angular/core';
import { CommonserviceService } from '../_services/commonservice.service';
import { Envirment } from '../../envirment/envirment.variables';
import { Form, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-exam-cariculam',
  templateUrl: './exam-cariculam.component.html',
  styleUrl: './exam-cariculam.component.css'
})
export class ExamCariculamComponent {
  exams:any;
  arrexam:any;
  subjects:any;
  arrsubject:any;
  index:number = 0;
  sform:any;
  eform:any;
  esform:any;
  cform:any;
  offset:number = 0;
  limit:number  = 5;
  view:number = 1;
  arrsubjectexam:Array<any> = [];
  a_arrsubjectexam:Array<any> = [];
  c_subject:string = "";

  constructor(private service:CommonserviceService,private fb:FormBuilder){
      this.fetchexam();
      this.fetchsubject();
      this.createeform();
      this.createsform();
      this.createesform();

  }
  get subject(){
      return this.sform.controls;
  }
  get exam(){
      return this.eform.controls;
  }
  get subjectexam(){
    return this.esform.controls;
  }
  createesform(){
    this.esform = this.fb.group({
      subject_id:['',Validators.required],
      exam_id:['',Validators.required]
    })
  }
  changeview(){
    if(this.view==0)this.view=1;
    else this.view=0;
  }
  increaseoffset(){
    if(this.index==0){
        if(this.offset+this.limit <= this.subjects.length) {
            this.offset = this.offset+this.limit;
        }
        this.arrsubject = [];
        for(let i = this.offset;i<this.subjects.length && i<this.offset+this.limit;i++){
            this.arrsubject.push(this.subjects[i]);
        }
    }
    else if(this.index==1){
        if(this.offset+this.limit <= this.exams.length) {
          this.offset = this.offset+this.limit;
        }
        this.arrexam = [];
        for(let i = this.offset;i<this.exams.length && i<this.offset+this.limit;i++){
            this.arrexam.push(this.exams[i]);
        }
    }
    else{
      if(this.offset+this.limit <= this.arrsubjectexam.length) {
        this.offset = this.offset+this.limit;
      }
      this.a_arrsubjectexam = [];
      for(let i = this.offset;i<this.arrsubjectexam.length && i<this.offset+this.limit;i++){
        this.a_arrsubjectexam.push(this.arrsubjectexam[i]);
    }
    }
  }
  decreaseoffset(){
      if(this.index==0){
          if(this.offset-this.limit<0)this.offset = 0;
          else this.offset = this.offset-this.limit;
          this.arrsubject = [];
          for(let i = this.offset;i<this.subjects.length && i<this.offset+this.limit;i++){
            this.arrsubject.push(this.subjects[i]);
          }
      }
      else if(this.index==1){
        if(this.offset-this.limit<0)this.offset = 0;
        else this.offset = this.offset-this.limit;
        this.arrexam = [];
        for(let i=this.offset;i<this.exams.length && i<this.offset+this.limit;i++){
          this.arrexam.push(this.exams[i]);
        }
      }
      else{
        if(this.offset-this.limit<0)this.offset = 0;
        else this.offset = this.offset-this.limit;
        this.a_arrsubjectexam = [];
        for(let i=this.offset;i<this.arrsubjectexam.length && i<this.offset+this.limit;i++){
          this.a_arrsubjectexam.push(this.arrsubjectexam[i]);
        }
      }
  }
  createsform(){
      this.sform = this.fb.group({
        subject:['',[Validators.required]]
      })
  }
  createeform(){
      this.eform = this.fb.group({
          exam_name:['',[Validators.required]],
          max_marks:[0,[Validators.required]]
      })
  }
  fetchexam(){
      const url = Envirment.url+"/exam";
      const headers = this.service.defaultHeader();
      this.service.getAPICall(url,headers).subscribe({
        next:(response)=>{
            this.exams = response.data;
            console.log(this.exams);
            this.arrexam = [];
            for(let i=this.offset;i<this.offset+this.limit;i++){
              this.arrexam.push(this.exams[i]);
            }
        },
        error:(e)=>{
            console.log("this is and error",e);
        },
        complete:()=>{
            console.log("subject fetch successfully");
        }
      }).closed;
  }
  fetchsubject(){
      const url = Envirment.url+"/subject";
      const headers = this.service.defaultHeader();
      this.service.getAPICall(url,headers).subscribe({
          next:(response)=>{
              this.subjects = response.data;
              console.log(this.subjects);
              this.arrsubject = [];
              for(let i=this.offset;i<this.offset+this.limit;i++){
                this.arrsubject.push(this.subjects[i]);
              }
          },
          error:(e)=>{
              console.log("this is and error",e);
          },
          complete:()=>{
              console.log("subject fetch successfully");
          }
      }).closed;
  }
  changeindex(index:number){
      this.index = index;
      this.offset = 0;
      this.view=1;
  }
  addSubject(){
      const url = Envirment.url+"/subject/add";
      const headers = this.service.defaultHeader();
      const request = this.sform.value;
      this.service.postAPICall(url,request,headers).subscribe({
          next:(response:any)=>{
            console.log(response);
            this.createsform();
            this.fetchsubject();
          },
          error:(e)=>{
            console.log(e);
          },
          complete:()=>{
            console.log("process has been completed");
          }
      }).closed;
  }
  deleteSubject(){
      const url = Envirment.url+`/subject/delete/${this.sform.value.subject}`;
      const headers = this.service.defaultHeader();
      const request = {};
      this.service.postAPICall(url,request,headers).subscribe({
          next:(response:any)=>{
            console.log(response);
            this.createsform();
            this.fetchsubject();
          },
          error:(e)=>{
            console.log(e);
          },
          complete:()=>{
            console.log("process has been completed");
          }
      }).closed;
  }
  addExam(){
      const url = Envirment.url+"/exam/add";
      const headers = this.service.defaultHeader();
      const request = this.eform.value;
      request.max_marks = Number(request.max_marks);
      console.log("request=>",request);
      this.service.postAPICall(url,request,headers).subscribe({
          next:(response:any)=>{
            console.log(response);
            this.createeform();
            this.fetchexam();
          },
          error:(e)=>{
            console.log(e);
          },
          complete:()=>{
            console.log("process has been completed");
          }
      }).closed;
  }
  deleteExam(){
      const url = Envirment.url+`/exam/delete/${this.eform.value.exam_name}`;
      const headers = this.service.defaultHeader();
      const request = this.eform.value;
      console.log("request=>",request);
      this.service.postAPICall(url,request,headers).subscribe({
          next:(response:any)=>{
            console.log(response);
            this.createeform();
            this.fetchexam();
          },
          error:(e)=>{
            console.log(e);
          },
          complete:()=>{
            console.log("process has been completed");
          }
      }).closed;
  }
  changeSubject(subject_id:string){
      for(let data of this.subjects) if(data.subject_id==subject_id) this.c_subject = data.subject;

      const url = Envirment.url+"/subject-exam"+"/"+subject_id;
      const headers = this.service.defaultHeader();
      this.service.getAPICall(url,headers).subscribe({
          next:(response)=>{
            this.arrsubjectexam = [];
            this.arrsubjectexam = response.data;
            console.log(response);
            this.a_arrsubjectexam = [];
            for(let i=this.offset;i<this.offset+this.limit;i++){
              this.a_arrsubjectexam.push(this.arrsubjectexam[i]);
            }
          },
          error:(e)=>{
            console.log(e);
          },
          complete:()=>{
            console.log("subject has been created");
          }
      })
  }
  deleteSubjectExam(){
      let subject_id = this.esform.value.subject_id;
      let exam_id =  this.esform.value.exam_id;
      let subject:string = "";
      let exam_name:string = "";
      for(let data of this.subjects) if(data.subject_id==subject_id) subject = data.subject;
      for(let data of this.exams) if(data.exam_id==exam_id) exam_name = data.exam_name;
      const url = Envirment.url+"/subject-exam/delete";
      const headers = this.service.defaultHeader();
      const request = {
        subject_id:subject_id,
        subject:subject,
        exam_id:exam_id,
        exam_name:exam_name
    }
    this.service.postAPICall(url,request,headers).subscribe({
        next:(response)=>{
          console.log(response);
          this.changeSubject(subject_id);
        },
        error:(e)=>{
          console.log("error=>",e)
        },
        complete:()=>{
          console.log("process has been completed");
        }
    })
  }
  addSubjectExam(){
      let subject_id = this.esform.value.subject_id;
      let exam_id =  this.esform.value.exam_id;
      let subject:string = "";
      let exam_name:string = "";
      for(let data of this.subjects) if(data.subject_id==subject_id) subject = data.subject;
      for(let data of this.exams) if(data.exam_id==exam_id) exam_name = data.exam_name;
      const url = Envirment.url+"/subject-exam/add";
      const headers = this.service.defaultHeader();
      const request = {
          subject_id:subject_id,
          subject:subject,
          exam_id:exam_id,
          exam_name:exam_name
      }
      this.service.postAPICall(url,request,headers).subscribe({
          next:(response)=>{
            console.log(response);
            this.changeSubject(subject_id);
          },
          error:(e)=>{
            console.log("error=>",e)
          },
          complete:()=>{
            console.log("process has been completed");
          }
      })
  }
  addCirculum(){

  }
  updateCirculum(){

  }
}
