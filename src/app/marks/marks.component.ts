import { Component } from '@angular/core';
import { Envirment } from '../../envirment/envirment.variables';
import { CommonserviceService } from '../_services/commonservice.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-marks',
  templateUrl: './marks.component.html',
  styleUrl: './marks.component.css',
  standalone:false
})
export class MarksComponent {
  carray:Array<string> = ['1','2','3','4','5','6','7','8','9','10','11','12'];
  subjects:any = []
  exams:any = [];
  cclass:string = "";
  cexam_id:string = "";
  cexam_name:string = "";
  csubject_name:string = "";
  csubject_id:string = "";
  students:any = [];
  arrStudents:any = [];
  marks:any = {};
  limit:number=7;
  searchstring:string = "";
  offset:number = 0;
  noOfColumn:any;
  numOfButton: any;
  buttonArray: any = [];
  activeButton: string = '1';
  


  constructor(private service:CommonserviceService,private fb:FormBuilder){
    this.fetchsubject();
  }


  changeLimit(){
      console.log(Number(this.limit),"Number(this.limit) type",typeof(Number(this.limit)));
      this.arrStudents = [];
      for(let i=this.offset;i<this.students.length && i<Number(this.limit)+this.offset;i++){
          this.arrStudents.push(this.students[i]);
      }
      this.pagination();
      return;
  }
  changeSearch(){
    this.arrStudents = [];
    if(this.searchstring==""){
      this.students.sort((element1:any,element2:any)=>{
        if((element1.first_name + " " +element1.last_name) > (element2.first_name+" "+element2.last_name) )return 1;
        else return -1;
      })
    }
    else{
        this.students.sort((element1:any,element2:any)=>{
          const a = (element1.first_name.toLowerCase().includes(this.searchstring) || element1.last_name.toLowerCase().includes(this.searchstring))?1:0;
          const b = (element2.first_name.toLowerCase().includes(this.searchstring) || element2.last_name.toLowerCase().includes(this.searchstring))?1:0;
          console.log("this.searchstring",this.searchstring,element1.first_name,element2.first_name,b-a);
          return b-a;

        })
    }
    for(let i =this.offset;i<this.students.length && i<this.offset+Number(this.limit);i++){
      this.arrStudents.push(this.students[i]);
    }
  }
  changeOffset(){
      console.log(Number(this.limit),"Number(this.limit) type",typeof(Number(this.limit)));
      this.arrStudents = [];
      for(let i=this.offset;i<this.students.length && i<Number(this.limit)+this.offset;i++){
          this.arrStudents.push(this.students[i]);
      }
      return;
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

fetchsubjectexam(){
      const url = Envirment.url+`/subject-exam/${this.csubject_id}`;
      const headers = this.service.defaultHeader();
      this.service.getAPICall(url,headers).subscribe({
          next:(response)=>{
              this.exams = response.data;
          },
          error:(e)=>{
              console.log("this is and error",e);
          },
          complete:()=>{
              console.log("subject fetch successfully");
          }
      }).closed;
  }
  changeClassSubject(){
      if(this.cclass && this.csubject_id){
          this.cexam_id="";
          this.fetchsubjectexam();
          var subject_name = "";
          for(let subject of this.subjects){
            if(subject.subject_id==this.csubject_id){
              this.csubject_name = subject.subject;
              subject_name = subject.subject;
            }
          }
          const url = Envirment.url+`/user?subject=${subject_name}&class=${this.cclass}`;
          const headers = this.service.defaultHeader();
          this.service.getAPICall(url,headers).subscribe({
              next:(response)=>{
                  console.log(response);
                  this.students = response.data;
                  this.students.sort((element1:any,element2:any)=>{
                    if((element1.first_name + " " +element1.last_name) > (element2.first_name+" "+element2.last_name) )return 1;
                    else return -1;
                  })
                  this.arrStudents = [];
                  for(let i =this.offset;i<this.students.length && i<this.offset+Number(this.limit);i++){
                    this.arrStudents.push(this.students[i]);
                  }
                  this.pagination();
                  console.log("ALL Student Data=>",this.students);
              },
              error:(e)=>{
                  console.log("this is an error=>",e);
              },
              complete:()=>{
                  console.log("process has been completed");
              }
          })
      }
  }

  changeExam(){
    if(this.cclass && this.csubject_id && this.cexam_id){
        for(let exam of this.exams)if(exam.exam_id==this.cexam_id){this.cexam_name=exam.exam_name;break}
        const url = Envirment.url+`/student-subject-exam?class=${this.cclass}&subject_id=${this.csubject_id}&exam_id=${this.cexam_id}`;
        const headers = this.service.defaultHeader();
        this.service.getAPICall(url,headers).subscribe({
            next:(response)=>{
                this.marks = response.data;
                for(let data of response.data){
                  this.marks[data.student_id]=data;
                }
                for(let student of this.students){
                    if(!this.marks[student.user_id]){
                        this.marks[student.user_id] = {
                            student_id:student.user_id,
                            subject_id:this.csubject_id,
                            exam_id:this.cexam_id,
                            marks:-1
                        }
                    }
                }
                console.log("marks=>",this.marks);
            },
            error:(e)=>{
              console.log(e);
            },
            complete:()=>{
              console.log("Process Had Been Completed");
            }
        }).closed
      
    }
  }
  addStudentMark(user_id:string){
      console.log("this.marks[user_id]",this.marks[user_id]);
      const reqobj = this.marks[user_id];
      const url = Envirment.url+"/student-subject-exam";
      const headers = this.service.defaultHeader();
      this.service.postAPICall(url,reqobj,headers).subscribe({
          next:(response:any)=>{
            console.log(response);
            this.changeExam();
          },
          error:(e)=>{
            console.log(e);
          },
          complete:()=>{
            console.log("Marks Has Been Added/Updated");
          }
      })
    
  }

  pagination(){
        this.noOfColumn = this.students.length;
        this.numOfButton = Math.ceil((this.noOfColumn) / this.limit);
        this.buttonArray = [];
        if (this.numOfButton <= 7) {
          for (let index = 0; index <= this.numOfButton - 1; index = index + 1)this.buttonArray.push(index + 1);
        }
        else {
            for (let index = 0; index <= 6; index = index + 1) {
                if (index == 5)
                  this.buttonArray[index] = '.........';
                else if (index == 6)
                  this.buttonArray[index] = this.numOfButton;
                else
                  this.buttonArray[index] = index + 1;
        }
      }
  }

  navigationClick($event: any, element: any, parent: any){
    if (this.numOfButton <= 7) {
        this.activeButton = element.textContent;
        this.offset = (Number(element.textContent) - 1) * this.limit;
        this.changeOffset();
    }
    else{
        let valueMap = new Map();
        for (let index = 1; index <= 7; index = index + 1) {
            valueMap.set(parent.children[index].textContent, index);
        }
        let clickContent = element.textContent;
        if(clickContent!='.........')this.activeButton = element.textContent;
        if (valueMap.get(clickContent) == 1) {
            this.offset = (Number(element.textContent) - 1) * this.limit; this.changeOffset();
            for (let index = 1; index <= 6; index = index + 1) {
                if (index == 6)
                    parent.children[index].textContent = '.........';
                else
                    parent.children[index].textContent = index;
            }
        }
        else if (valueMap.get(clickContent) == 2) {
          if(element.textContent!='.........'){
              this.offset = (Number(element.textContent) - 1) * this.limit; this.changeOffset();
          }
        }
        else if (valueMap.get(clickContent) == 3) {
          if(element.textContent==3){
              this.offset = (Number(element.textContent) - 1) * this.limit; this.changeOffset();
          }
          else if(element.textContent==4){
              this.offset = (Number(element.textContent) - 1) * this.limit; this.changeOffset();
              for (let index = 1; index <= 6; index = index + 1) {
                  if (index == 6)
                      parent.children[index].textContent = '.........';
                  else
                      parent.children[index].textContent = index;
              }
          }
          else{
            this.offset = (Number(element.textContent) - 1) * this.limit; this.changeOffset();
            console.log(element.textContent);
            parent.children[6].textContent = '.........';
            let data = Number(element.textContent);
            parent.children[3].textContent = data-1;
            parent.children[4].textContent = data;
            parent.children[5].textContent = data+1;
            console.log("element_textcontent",Number(element.textContent-1));
          }
      }
      else if (valueMap.get(clickContent) == 4) {
          this.offset = (Number(element.textContent) - 1) * this.limit; this.changeOffset();
      }
      else if (valueMap.get(clickContent) == 5) {
        if(element.textContent==5){
          this.offset = (Number(element.textContent) - 1) * this.limit; this.changeOffset();
          parent.children[2].textContent='.........';
          if(parent.children[6].textContent=='.........'){
              if(element.textContent==this.numOfButton-3){
                for (let index = 7; index >= 2; index = index - 1) {
                    if (index == 2)
                        parent.children[index].textContent = '.........';
                    else
                        parent.children[index].textContent = this.numOfButton+index-7;    
                }
             }
            else{
                parent.children[3].textContent=Number(element.textContent)-1;
                parent.children[4].textContent=Number(element.textContent);
                parent.children[5].textContent=Number(element.textContent)+1;
            }
          }
        }
        else if(element.textContent==this.numOfButton-3){
           this.offset = (Number(element.textContent) - 1) * this.limit; this.changeOffset();
           if(parent.children[6].textContent=='.........'){
              for (let index = 7; index >= 2; index = index - 1) {
                  if (index == 2)
                      parent.children[index].textContent = '.........';
                  else
                      parent.children[index].textContent = this.numOfButton+index-7;    
              }
           }
        }
        else{
            this.offset = (Number(element.textContent) - 1) * this.limit; this.changeOffset();
            if(parent.children[6].textContent=='.........'){
                parent.children[3].textContent=Number(element.textContent)-1;
                parent.children[4].textContent=Number(element.textContent);
                parent.children[5].textContent=Number(element.textContent)+1;
            }
        }
      }
      else if (valueMap.get(clickContent) == 6) {
        if(element.textContent!='.........'){
            this.offset = (Number(element.textContent) - 1) * this.limit;
            this.changeOffset();
        }
      }
      else {
          this.offset = (Number(element.textContent) - 1) * this.limit;
          this.changeOffset();
          for (let index = 7; index >= 2; index = index - 1) {
              if (index == 2)
                  parent.children[index].textContent = '.........';
              else
                  parent.children[index].textContent = this.numOfButton+index-7;    
          }
      }
    }
}




}
