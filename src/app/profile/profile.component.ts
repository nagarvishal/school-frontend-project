import { Component } from '@angular/core';
import { CommonserviceService } from '../_services/commonservice.service';
import { Envirment } from '../../envirment/envirment.variables';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  standalone:false
})
export class ProfileComponent {
  userdata:any;
  index:number = 0;
  constructor(public service:CommonserviceService){
    this.fetchuser();
  }
  fetchuser(){
    if(sessionStorage){
      var user_id = sessionStorage.getItem("user_id");
      const url = Envirment.url+"/user"+"/"+user_id;
      const headers = this.service.defaultHeader();

      this.service.getAPICall(url,headers).subscribe({
        next:(response)=>{
          this.userdata = response.data;
          console.log("this.userdata=>",this.userdata);
        },
        error:(e)=>{
          console.log(e);
        },
        complete:()=>{
          console.log("successfully fetched user data");
        }
      })
    }

  }
  changeindex(index:number){
    this.index = index;
  }
}
