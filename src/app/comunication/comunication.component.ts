import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CommonserviceService } from '../_services/commonservice.service';

import { Editor } from 'ngx-editor';
import { Toolbar } from 'ngx-editor';
import { Envirment } from '../../envirment/envirment.variables';

@Component({
  selector: 'app-comunication',
  templateUrl: './comunication.component.html',
  styleUrl: './comunication.component.css'
})
export class ComunicationComponent {
  editor: Editor;
    colorPresets = ['red', '#FF0000', 'rgb(255, 0, 0)'];
    toolbar: Toolbar = [
        // default value
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
    form:any;
    tempArray:Array<any>;
    isedith:boolean = false;
    index:number = -1;
    ctemplate:any = {};
    users:any = [];
    arrusers:any = [];
    limit :number = 7;
    cuser:string = "";
    ccuser:string = "";
    bccuser:string = "";
    invalid:boolean = false;
    constructor(public fb:FormBuilder,public services:CommonserviceService){
        this.createform();
        this.fetchusers();
    }

    get template(){
        return this.form.controls;
    }

    printhtml() {
        console.log('html=>', this.html);
    }

    createform(){
        this.form = this.fb.group({
            typeto:['',[Validators.required]],
            to_users:this.fb.array([]),
            to_classes:['',[]],
            subject: [this.ctemplate?.data?.subject ? this.ctemplate?.data?.subject : '',[Validators.required]],
            html:[this.ctemplate?.data?.message?.html ? this.ctemplate?.data?.message?.html : '',[Validators.required]],
            text:[this.ctemplate?.data?.message?.text ? this.ctemplate?.data?.message?.text : ''],
            cc:this.fb.array([]),
            bcc:this.fb.array([]),
            for_email:[true,[]],
            for_sms:[false,[]],
            for_whatsupp:[false,[]]
        });
    }

    fetchusers(){
        const url = Envirment.url+"/user";
        const headers = this.services.defaultHeader();
        this.services.getAPICall(url,headers).subscribe({
            next:(response:any)=>{
                this.users = response.data;
            },
            error:(e)=>{
                console.log(e);
            },
            complete:()=>{
                console.log("process has been completed");
            }
        })
    }
    sendMail(){
        console.log(this.form);
        if(this.form.invalid){
          this.invalid = true;
        }
        else{
            const url = Envirment.url+"/communication";
            const headers = this.services.defaultHeader();
            const request = this.form.value;
            this.services.postAPICall(url,request,headers).subscribe({
                next:(response)=>{
                  console.log(response);
                },
                error:(e)=>{
                  console.log(e)
                },
                complete:()=>{
                  console.log("process has been completed");
                }
            })
            console.log(this.form.value);
        }
    }

    changeCUser(value:number){
      if(value==1){
          if(this.cuser!=""){
              let value = this.cuser;
              let i=0;
              this.arrusers = [];
              while(i<this.users.length && this.arrusers.length<7){
                  if(this.users[i].email.includes(value) || this.users[i].first_name.includes(value) || this.users[i].last_name.includes(value)){
                      this.arrusers.push(this.users[i]);
                  }
                  i++;
              }
              console.log("this.arrusers=>",this.arrusers);
          }
          else{
            this.arrusers = [];
          }
      }
      else if(value==2){
        if(this.ccuser!=""){
          let value = this.ccuser;
          let i=0;
          this.arrusers = [];
          while(i<this.users.length && this.arrusers.length<7){
              if(this.users[i].email.includes(value) || this.users[i].first_name.includes(value) || this.users[i].last_name.includes(value)){
                  this.arrusers.push(this.users[i]);
              }
              i++;
          }
          console.log("this.arrusers=>",this.arrusers);
          }
          else{
              this.arrusers = [];
          }
      }
      else{
          if(this.bccuser!=""){
              let value = this.bccuser;
              let i=0;
              this.arrusers = [];
              while(i<this.users.length && this.arrusers.length<7){
                  if(this.users[i].email.includes(value) || this.users[i].first_name.includes(value) || this.users[i].last_name.includes(value)){
                      this.arrusers.push(this.users[i]);
                  }
                  i++;
              }
              console.log("this.arrusers=>",this.arrusers);
            }
            else{
                this.arrusers = [];
           }
      }
    }

    optionclick(email:string,value:number){
        if(value==1){
          this.cuser = "";
          this.arrusers=[];
          const usersemail = this.form.get("to_users") as FormArray;
          usersemail.push(new FormControl(email));
        }
        else if(value==2){
          this.ccuser = "";
          this.arrusers=[];
          const usersemail = this.form.get("cc") as FormArray;
          usersemail.push(new FormControl(email));
        }
        else{
          this.bccuser = "";
          this.arrusers=[];
          const usersemail = this.form.get("bcc") as FormArray;
          usersemail.push(new FormControl(email));
        }
    }

    removeOption(index:number,value:number){
        if(value==1)
            this.template.to_users.removeAt(index);
        else if(value==2)
            this.template.cc.removeAt(index)
        else  this.template.bcc.removeAt(index);
      
    }
    
    adduser(email:string){

    }
    removeuser(index:number){

    }

    ngOnDestroy(): void {
        console.log('html=>', this.html);
        this.editor.destroy();
    }

    ngOnInit(): void {
            this.editor = new Editor();
    }
}
