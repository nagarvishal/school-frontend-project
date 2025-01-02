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
  step: number = 0;
  is_clicked: boolean = false;
  constructor(public fb: FormBuilder,@Inject(CommonserviceService) private service:CommonserviceService) {
    this.form = fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ],
      ],
      father_name:   ['', [Validators.required]],
      mother_name:   ['', [Validators.required]],
      adhar_number:  ['', [Validators.required]],
      mobile_no:     ['', [Validators.required]],
      role:          ['', [Validators.required]],
      date_of_birth: ['', [Validators.required]],
      gender:        ['', [Validators.required]],
      address:       ['', [Validators.required]],
      enrollment_date: ['', [Validators.required]],
      class:['',[Validators.required]],
      stream:['',[]],
      subjects:fb.array([]),
      section:['',[Validators.required]],
      status: [0],
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
    return this.form.controls;
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

  onChangeFile($event:any, span1:any){
    const url = Envirment.url+"/sutdent";

  }
  changeSubject(htmlelement:any){
    const subjects = this.form.get("subjects") as FormArray;
    subjects.push(new FormControl(htmlelement.value));
  }
  removeSubject(index:number){
    this.student.subjects.removeAt(index);
    console.log(this.form);
  }
}
