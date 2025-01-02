import { Component } from '@angular/core';
import { Form, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
  standalone: false,
})
export class ContactComponent {
  mailform: any;
  constructor(public fb: FormBuilder) {
    this.mailform = fb.group({
      fullname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('')]],
      subject: ['', [Validators.required]],
      content: ['', [Validators.required]],
    });
  }
  submitform(){
    
  }
}
