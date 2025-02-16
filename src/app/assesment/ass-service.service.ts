import { Injectable } from '@angular/core';
import { Envirment } from '../../envirment/envirment.variables';
import { CommonserviceService } from '../_services/commonservice.service';

@Injectable()
export class AssServiceService {

    constructor(private service: CommonserviceService) { }

    async generateQuery(filter:object={}){
        let str = "";
        let index = 0;
        for(let key of Object.keys(filter)){
            if(index==0){
                str = str + `?${key}=${filter[key]}`
            }
            else{
                str = str + `&${key}=${filter[key]}`
            }
        }
        return str;
    }

    async generalGetApiCall(thiss: any, url: string, filter: object = {}, variable_name: string="") {
        const apiurl = Envirment.url + url + await this.generateQuery(filter);
        const headers = this.service.defaultHeader();
        console.log(apiurl);
        console.log(headers);
        this.service.getAPICall(apiurl,headers).subscribe({
            next : (response:any)=>{
                console.log(variable_name);
                thiss[variable_name] = response.data;
            },
            error:(e)=>{
                
                console.log("Error Comes from backend",e);
            },
            complete:()=>{
                console.log("process had been completed");
            }
        })
    }

    async generalPostApiCall(thiss:any, url:string, reqbody:object = {}, filter:object = {}, variable_name: string=""){
        const apiurl = Envirment.url + url + await this.generateQuery(filter);
        const headers = this.service.defaultHeader();
        const request = reqbody;
        this.service.postAPICall(apiurl,reqbody,headers).subscribe({
            next:(response:any)=>{
                if(variable_name){
                    thiss[variable_name] = response.data;
                }
            },
            error:(e)=>{
                console.log(e);
            },
            complete:()=>{
                console.log("process has been completed");
            }
        }).unsubscribe();
    }


}
