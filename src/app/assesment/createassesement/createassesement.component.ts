import { Component } from '@angular/core';
import { OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CommonserviceService } from '../../_services/commonservice.service';
import { Editor } from 'ngx-editor';
import { Toolbar } from 'ngx-editor';
import { Envirment } from '../../../envirment/envirment.variables';



@Component({
  selector: 'app-createassesement',
  templateUrl: './createassesement.component.html',
  styleUrl: './createassesement.component.css'
})
export class CreateassesementComponent implements OnInit {
  [x: string]: any;
  editor: Editor;
  colorPresets = ['red', '#FF0000', 'rgb(255, 0, 0)'];
  toolbar: Toolbar = [
      ['bold', 'italic'],
      ['underline', 'strike'],
      ['code', 'blockquote'],
      ['ordered_list', 'bullet_list'],
      [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
      ['link', 'image'],
      ['text_color', 'background_color'],
      ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  html = '';
  aform:any;
  qform:any;
  aqform:any;
  invalid:boolean = false;
  subjects:any = [];
  cassesment_id = "";
  assesments:any = [];
  storedQuestions:any = [];
  abcd:any = ['A','B','C','D','E','F'];

  constructor(public fb:FormBuilder,public service:CommonserviceService){
    this.createAForm();
    this.createAQForm();
    console.log(this.aform);
    this.fetchsubject();
    this.fetchAssesment();
    this.createAQForm();
  }
  get assesment(){
    return this.aform.controls;

  }

  get aquestion(){
    return this.aqform.controls;
  }

  get question(){
    return this.qform.controls;
  }

  createAForm(){
    this.aform = this.fb.group({
      title:['',Validators.required],
      description:['',Validators.required],
      duration:[0,Validators.required],
      subject_id:['',Validators.required],
      class:['',Validators.required],
      question_ids:['']
    })
  }


  createAQForm(){
    this.aqform = this.fb.group({
      assesment_id : ['',Validators.required],
      questions:this.fb.array([])
    })
  }

  createQForm(){
    return this.fb.group({
        question_text:['',[Validators.required]],
        question_type:['',[Validators.required]],
        options:this.fb.array([]),
        marks:[0,[Validators.required]],
        answer:['',[Validators.required]]
    })
 }

  addQuestion(){
      this.editor = new Editor();
      const questionform = this.createQForm();
      this.aquestion.questions.push(questionform);
      console.log(this.aqform);
      return;
  } 
  deleteQuestion(index:number,q:any){
      console.log("Q-Controllers => ",q);
      this.aquestion.questions.removeAt(index);
      return;
  }
  addOptionToQuestion(qcontroller:any){
      this.editor = new Editor();
      qcontroller.controls.options.push(new FormControl('',[Validators.required]));
  }

  deleteOption(i:number,qcontroller:any){
    qcontroller.controls.options.removeAt(i);

}

fetchAssesment(){
    const url = Envirment.url + "/assesment/fetch";
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

addAssesment(){
    console.log(this.aform.value);
    const url = Envirment.url + "/assesment/add";
    const headers = this.service.defaultHeader();
    const request = this.aform.value;
    request.duration = Number(request.duration);
    request.question_ids = [];
    
    this.service.postAPICall(url,request,headers).subscribe({
        next:(response)=>{
            this.cassesment_id = response.data.assesment_id;
            console.log("cassesment_id=>",this.cassesment_id);
        },
        error:(e)=>{
            console.log(e);
        },
        complete:()=>{
            console.log("process has been completed");
        }
    })
  }

  addAQuestion(){
    console.log(this.aqform.value);
    const url = Envirment.url + "/assesment/question/add";
    const header = this.service.defaultHeader();
    const request = this.aqform.value;
    this.service.postAPICall(url,request,header).subscribe({
        next:(response:any)=>{
            console.log(response);
        },
        error:(e)=>{
            console.log(e);
        },
        complete:()=>{
            console.log("Process Has Been Completed");
        }
    })
  }

  changeAssesment(){
    const assesment_id = this.aqform.value["assesment_id"];
    if(assesment_id){
        const url = Envirment.url + `/assesment/question/${assesment_id}`;
        const headers = this.service.defaultHeader();
        const response = this.service.getAPICall(url,headers).subscribe({
            next:(response)=>{
                if(response && response.data){
                    this.storedQuestions = response.data;
                }
                else{
                    this.storedQuestions = [];
                }
            },
            error:(e)=>{
                this.storedQuestions = [];
                console.log(e);
            },
            complete:()=>{
                console.log("process has been completed");
            }
          })
    }
  }

  deleteStoredQuestion(index:number){
    const question_id = this.storedQuestions[index].question_id;
    const url = Envirment.url + `/assesment/question/delete/${question_id}`;
    const headers = this.service.defaultHeader();
    const request = {};
    console.log(url);
    console.log(headers);
    console.log(request);
    this.service.postAPICall(url,request,headers).subscribe({
        next:(response)=>{
            console.log(response);
            this.changeAssesment();
        },
        error:(e)=>{
            console.log(e);
        },
        complete:()=>{
            console.log("process has been completed");
        }
    })
  }

  ngOnDestroy(): void {
    console.log('html=>', this.html);
    this.editor.destroy();
  }

  ngOnInit(): void {
      this.editor = new Editor();
  }

}
