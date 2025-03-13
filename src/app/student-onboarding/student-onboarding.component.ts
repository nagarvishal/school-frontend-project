import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { Envirment } from '../../envirment/envirment.variables';
import { CommonserviceService } from '../_services/commonservice.service';

@Component({
  selector: 'app-student-onboarding',
  templateUrl: './student-onboarding.component.html',
  styleUrl: './student-onboarding.component.css',
  standalone: false,
})
export class StudentOnboardingComponent {
  form: any;
  form1:any;
  step: number = 0;
  is_clicked: boolean = false;
  class:string = "";
  students:any = [];
  cstudent:any = {};
  is_edith = false;
  user_id:string="";
  role:string="";
  selectedFile: File | null = null;


  constructor(public fb: FormBuilder,@Inject(CommonserviceService) private service:CommonserviceService) {
    this.form = this.createform();
  }
  createform(){
    return this.fb.group({
        first_name: [this.cstudent.first_name ? this.cstudent.first_name : '', [Validators.required]],
        last_name: [this.cstudent.last_name ? this.cstudent.last_name : '', [Validators.required]],
        email: [
            this.cstudent.email ? this.cstudent.email : '',
          [
            Validators.required,
            Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
          ],
        ],
        father_name:   [this.cstudent.father_name  ? this.cstudent.father_name : '', [Validators.required]],
        mother_name:   [this.cstudent.mother_name  ? this.cstudent.mother_name : '', [Validators.required]],
        adhar_number:  [this.cstudent.adhar_number ? this.cstudent.adhar_number : '', [Validators.required]],
        mobile_no:     [this.cstudent.mobile_no ? this.cstudent.mobile_no : '', [Validators.required]],
        role:          [this.cstudent.role ? this.cstudent.role : '', [Validators.required]],
        date_of_birth: [this.cstudent.date_of_birth ? this.cstudent.date_of_birth : '', [Validators.required]],
        gender:        [this.cstudent.gender ? this.cstudent.gender : '', [Validators.required]],
        address:       [this.cstudent.address ? this.cstudent.address : '', [Validators.required]],
        enrollment_date: [this.cstudent.enrollment_date ? this.cstudent.enrollment_date : '', [Validators.required]],
        class:         [this.cstudent.class ? this.cstudent.class : '',[Validators.required]],
        stream:        [this.cstudent.stream ? this.cstudent.stream : '',[]],
        subjects:      this.fb.array(this.cstudent.subjects ? this.cstudent.subjects : []),
        section:       [this.cstudent.section ? this.cstudent.section : '',[Validators.required]],
        status: [this.cstudent.status == 1 ? 1 : 0],
      });
  }

  nextStep() {
    if (this.step == 0) this.step = this.step + 1;
    console.log(this.step);
  }

  prevStep() {
    if (this.step == 1) this.step = this.step - 1;
  }

  get student() {
    if(this.is_edith==false)
        return this.form.controls;
    else{
        return this.form1.controls;
    }
  }

  addStudent() {
      const url = Envirment.url+"/user";
      const headers = this.service.defaultHeader();
      const reqbody = this.form.value;
      this.service.postAPICall(url,reqbody,headers).subscribe({
          next:(response)=>{
            console.log(response);
          },
          error:(e)=>{
            console.log(e);
          },
          complete:()=>{
            console.log("process has been completed");
          }
      })
  }

  downloadFile(filename:string)
  {
    if(this.role && this.user_id && filename){
        const url = Envirment.url+`/user/document/${this.role}/${this.user_id}/${filename}`;
        const headers = this.service.defaultHeader();
        this.service.getAPICall(url,headers).subscribe({
            next:(response)=>{
                let presigned_url = response.data;
                window.open(presigned_url, '_blank');
                console.log("response=>",response);
            },
            error:(e)=>{
                console.log("error",e);
            },
            complete:()=>{
                console.log("process has been compeleted");
            }
        })
    }
    else{
        console.log("invalid user/user(user_id,role,filename) not selectted ");
    }
  }
  onChangeFile($event:any, span1:any , filename:string){
    if(this.role && this.user_id && filename){
        const url = Envirment.url+`/user/document/${this.role}/${this.user_id}/${filename}`;
        const headers = this.service.defaultHeader("file_upload");

        const input = $event.target as HTMLInputElement;
        
        if (input.files && input.files.length > 0) {
            this.selectedFile = input.files[0];
        }
        if (!this.selectedFile) {
            alert('Please select a file first!');
            return;
        }

        const formData = new FormData();
        formData.append('file', this.selectedFile);
        
        this.service.postAPICall(url,formData,headers).subscribe({
            next : (response)=>{
                console.log(response);
            },
            error:(e)=>{
                console.log(e);
            },
            complete:()=>{
                console.log("process has been compeleted");
            }
        })
    }
    else{
        console.log("invalid user seleted created/selected");
    }
  }

  changeSubject(htmlelement:any){
    const subjects = this.form.get("subjects") as FormArray;
    subjects.push(new FormControl(htmlelement.value));
  }

  changeclass(){
    const url = Envirment.url + `/user?class=${this.class}`;
    const headers = this.service.defaultHeader();
    this.service.getAPICall(url,headers).subscribe({
        next:(response)=>{
            this.students = response.data;
            this.students.sort((element1:any,element2:any)=>{
                if(element1.first_name > element2.first_name)return 1;
                else return -1;
            })
        },
        error:(e)=>{
            console.log(e);
        },
        complete:()=>{
            console.log("process has been completed");
        }
    })
    console.log(this.class);
  }




  removeSubject(index:number){
    this.student.subjects.removeAt(index);
    console.log(this.form);
  }

  changestudent(element:any)
  {
    let user_id = element.value;
    for(let i=0;i<this.students.length;i++){
        if(this.students[i].user_id == user_id){
            this.is_edith = true;
            this.cstudent = this.students[i];
            this.role = this.cstudent.role;
            this.user_id = this.cstudent.user_id;
            this.form1 = this.createform();
            break;
        }
    }
    console.log(this.cstudent);
  }
}
