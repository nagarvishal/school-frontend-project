import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-teacher-onboarding',
  templateUrl: './teacher-onboarding.component.html',
  styleUrl: './teacher-onboarding.component.css',
  standalone: false,
})
export class TeacherOnboardingComponent {
  form: any;
  step: number = 0;
  is_clicked: boolean = false;
  constructor(public fb: FormBuilder) {
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
      father_name: ['', [Validators.required]],
      mother_name: ['', [Validators.required]],
      adhar_number: ['', [Validators.required]],
      mobile_no: ['', [Validators.required]],
      role: ['', [Validators.required]],
      date_of_birth: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      address: ['', [Validators.required]],
      enrollment_date: ['', [Validators.required]],
      account_no: ['', [Validators.required]],
      ifsc_code: ['', [Validators.required]],

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
  get teacher() {
    return this.form.controls;
  }
  onChangeFile($event:any,htmlelement:any){
    console.log(htmlelement);
    console.log(htmlelement.textContent);
    htmlelement.textContent = $event.target.files[0].name;
  }
  addTeacher() {}
}
