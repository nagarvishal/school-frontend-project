import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Envirment } from '../../../envirment/envirment.variables';
import { CommonserviceService } from '../../_services/commonservice.service';
import { Moment } from 'moment';

@Component({
  selector: 'app-start-assesment',
  templateUrl: './start-assesment.component.html',
  styleUrl: './start-assesment.component.css'
})
export class StartAssesmentComponent implements OnInit {
    assesment_id:string = "";
    questions:any = [];
    assesment:any = {};
    duration:number;
    answers:any = {};
    /** 0 -> current active
     *  1 -> visited not answered
     *  2 -> answered
     */
    qstatus:any = [];
    cquestion:any = 0;
    cquestion_index:number = 0;

    hours:number
    minutes:number
    seconds:number
    time: number = 0;
    interval:any;
    abcd:any = ['A','B','C','D','E','F'];
    class:string;
    subject_id:string;

    submitResponse(){
        
    }
    startTimer() {
        this.interval = setInterval(() => {
        if(this.hours==0 && this.minutes==0 && this.seconds==0){
            this.submitAssesment();
            this.pauseTimer();
        }
        else if(this.minutes==0 && this.seconds==0){
            this.hours = this.hours-1;
            this.minutes = 59;
            this.seconds = 59;
        }
        else if(this.seconds==0){
            this.minutes = this.minutes-1;
            this.seconds=59;
        }
        else{
            this.seconds = this.seconds-1;
        }
        
        },1000)
    }

    pauseTimer() {
        clearInterval(this.interval);
    }
    constructor(private route : ActivatedRoute, public service : CommonserviceService ){
        this.startTimer();
    }

    nextQuestion(){
        if(this.cquestion_index<this.questions.length){
            this.cquestion_index = this.cquestion_index+1;
            this.cquestion = this.questions[this.cquestion_index]; 
        }
    }
    previousQuestion(){
        if(this.cquestion_index>0){
            this.cquestion_index = this.cquestion_index-1;
            this.cquestion = this.questions[this.cquestion_index];
        }
    }
    clickedQuestion(index:number){
        if(this.qstatus[this.cquestion_index]!=2){
            this.qstatus[this.cquestion_index]=1;
        }
        this.cquestion_index = index;
        if(this.qstatus[this.cquestion_index]!=2){
            this.qstatus[this.cquestion_index]=0;
        }
        this.cquestion = this.questions[this.cquestion_index]; 
    }
  fetchAssesmentQuestions(){
      if(this.assesment_id){
          const url = Envirment.url + `/assesment/question/fetch/${this.assesment_id}`;
          const headers = this.service.defaultHeader();
          const response = this.service.getAPICall(url,headers).subscribe({
                next:(response)=>{
                    if(response && response.data){
                        this.questions = response.data;
                        this.cquestion_index = 0;
                        this.cquestion = this.questions[this.cquestion_index];
                        for(let i=0;i<this.questions.length;i++){
                            this.answers[this.questions[i].question_id] = [];
                            if(this.questions[i].question_type=='psq'){
                                this.answers[this.questions[i].question_id][0] = "";
                            }
                            if(i==0) this.qstatus[i] = 0;
                            else this.qstatus[i] = -1;
                        }
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
    fetchAssesment(){
        const url = Envirment.url + `/assesment/fetch?assesment_id=${this.assesment_id}`;
        const headers = this.service.defaultHeader();
        this.service.getAPICall(url,headers).subscribe({
            next:(response:any)=>{
                this.assesment = response.data[0];
                this.duration = this.assesment.duration;
                this.hours = Math.floor(this.duration/60);
                this.minutes = this.duration-60*this.hours;
                this.seconds = 0;

                console.log(this.hours);
                console.log(this.minutes);
                console.log(this.seconds);


            },
            error:(e)=>{
                console.log("error,",e);
            },
            complete:()=>{
                console.log("process has been completed");
            }
        })
    }
    clickOption(option:string){
        if(this.answers[this.cquestion.question_id].includes(option)){
            let index = this.answers[this.cquestion.question_id].indexOf(option);
            if(index>-1){
                this.answers[this.cquestion.question_id].splice(index,1);
            }
        }
        else{
            this.answers[this.cquestion.question_id].push(option);
        }
        if(this.answers[this.cquestion.question_id].length>0){
            this.qstatus[this.cquestion_index] = 2;
        }
        else{
            this.qstatus[this.cquestion_index] = 0;
        }
    }
    changeInput(){
        if(this.answers[this.cquestion.question_id][0]){
            this.qstatus[this.cquestion_index] = 2;
        }
        else{
            this.qstatus[this.cquestion_index] = 0;
        }

    }
    checkOptionClicked(option:string):boolean{
        if(this.answers[this.cquestion.question_id].includes(option)){
            return true;
        }
        else{
            return false;
        }
    }

    submitAssesment() {
        const user_id = sessionStorage.getItem("user_id");
        const url = Envirment.url+"/assesment/answer/submit";
        const headers = this.service.defaultHeader();
        const reqbody = {
            assesment_id : this.assesment_id,
            class : this.class,
            subject_id : this.subject_id,
            answers : this.answers,
            user_id : sessionStorage.getItem("user_id"),
        }
        this.service.postAPICall(url,reqbody,headers).subscribe({
            next:(response)=>{
                console.log(response);
            },
            error:(e)=>{
                console.log(e);
            },
            complete:()=>{
                console.log("process has been competed");
            }
        })

    }

    ngOnInit(): void {
        this.route.queryParamMap.subscribe((value)=>{
            this.assesment_id = value.get("assesment_id");
            this.class = value.get("class");
            this.subject_id = value.get("subject_id");
            this.fetchAssesmentQuestions();
            this.fetchAssesment();
        })
    }
}
