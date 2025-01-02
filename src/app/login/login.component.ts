import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Envirment } from '../../envirment/envirment.variables';
import { HttpHeaders } from '@angular/common/http';
import { CommonserviceService } from '../_services/commonservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form:any;
  constructor(private fb : FormBuilder,private service:CommonserviceService,private router:Router){
    this.form = fb.group({
      email:['',[Validators.required,Validators.pattern('')]],
      adhar_number:['',[Validators.required]]
    })
  }
  submitform(){
      const url = Envirment.url+"/login";
      const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
      });
      const request = this.form.value;
      this.service.postAPICall(url,request,headers).subscribe({
          next:(response:any)=>{
            sessionStorage.setItem('user_id',response.data["user_id"]);
            sessionStorage.setItem('first_name',response.data["first_name"]);
            sessionStorage.setItem('last_name',response.data["last_name"]);
            sessionStorage.setItem('adhar_number',response.data["adhar_number"]);
            sessionStorage.setItem('in-auth-token',response.data["in-auth-token"]);

            this.router.navigate(['/']);
          },
          error:(e)=>{
            console.log(e);
          },
          complete:()=>{
            console.log("process has been compeleted");
          }
      })
    }
}
