import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Envirment } from '../../envirment/envirment.variables';
import { CommonserviceService } from '../_services/commonservice.service';

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
    user_id:string = "";
    role:string = "";
    teachers:any = [];
    cteacher:any = {};
    form1:any;
    is_edith:boolean = false;
    selectedFile: File | null = null;

    
    constructor(public fb: FormBuilder,@Inject(CommonserviceService) private service:CommonserviceService) {
        this.form = this.createform();
        this.fetchTeachers();
    }
    createform(){
        return this.fb.group({
            first_name: [this.cteacher.first_name ? this.cteacher.first_name : "", [Validators.required]],
            last_name: [this.cteacher.last_name ? this.cteacher.last_name : '', [Validators.required]],
            email: [
                this.cteacher.email ? this.cteacher.email : '',
                [
                    Validators.required,
                    Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
                ],
            ],
            father_name: [this.cteacher.father_name  ? this.cteacher.father_name : '', [Validators.required]],
            mother_name: [this.cteacher.mother_name  ? this.cteacher.mother_name : '', [Validators.required]],
            adhar_number: [this.cteacher.adhar_number ? this.cteacher.adhar_number : '', [Validators.required]],
            mobile_no: [this.cteacher.mobile_no ? this.cteacher.mobile_no : '', [Validators.required]],
            role: [this.cteacher.role ? this.cteacher.role : '', [Validators.required]],
            date_of_birth: [this.cteacher.date_of_birth ? this.cteacher.date_of_birth : '', [Validators.required]],
            gender: [this.cteacher.gender ? this.cteacher.gender : '', [Validators.required]],
            address: [this.cteacher.address ? this.cteacher.address : '', [Validators.required]],
            enrollment_date: [this.cteacher.enrollment_date ? this.cteacher.enrollment_date : '', [Validators.required]],
            account_no: [this.cteacher.account_no ? this.cteacher.account_no : '', [Validators.required]],
            ifsc_code: [this.cteacher.ifsc_code ? this.cteacher.ifsc_code : '', [Validators.required]],
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
        if(this.is_edith){
            return this.form1.controls;
        }
        else{
            return this.form.controls;
        }
    }
    onChangeFile($event:any,htmlelement:any,filename:string){
        console.log(htmlelement);
        console.log(htmlelement.textContent);
        htmlelement.textContent = $event.target.files[0].name;
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
            console.log(`invalid ${this.role}/${this.user_id}/${filename}`);
        }
    }
    addTeacher() {
        const url = Envirment.url+"/user";
        const headers = this.service.defaultHeader();
        const reqbody = this.form.value;
        this.service.postAPICall(url,reqbody,headers).subscribe({
            next:(response)=>{
                this.role = response.data.role;
                this.user_id = response.data.user_id;
            },
            error:(e)=>{
                console.log(e);
            },
            complete:()=>{
                console.log("process has been compeleted");
            }
        })
        console.log(this.form.value);
    }
    fetchTeachers(){
        const url = Envirment.url + `/user?role=Teacher`;
        const headers = this.service.defaultHeader();
        this.service.getAPICall(url,headers).subscribe({
            next:(response)=>{
                console.log(response);
                this.teachers = response.data;
            },
            error:(e)=>{
                console.log(e);
            },
            complete:()=>{
                console.log("process has been complete");
            }
        })
    }
    changeTeacher(element:any){
        let user_id = element.value;
        for(let i=0;i<this.teachers.length;i++){
            if(this.teachers[i].user_id == user_id){
                this.is_edith = true;
                this.cteacher = this.teachers[i];
                this.role = this.cteacher.role;
                this.user_id = this.cteacher.user_id;
                this.form1 = this.createform();
            }
        }
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


}
