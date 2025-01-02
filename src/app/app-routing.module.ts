import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { FacuiltyComponent } from './facuilty/facuilty.component';
import { ExamCariculamComponent } from './exam-cariculam/exam-cariculam.component';
import { StudentOnboardingComponent } from './student-onboarding/student-onboarding.component';
import { TeacherOnboardingComponent } from './teacher-onboarding/teacher-onboarding.component';
import { ProfileComponent } from './profile/profile.component';
import { MarksComponent } from './marks/marks.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { ComunicationComponent } from './comunication/comunication.component';
import { StudyMeterialComponent } from './study-meterial/study-meterial.component';
import { TimetableComponent } from './timetable/timetable.component';
import { AdmissionComponent } from './admission/admission.component';
import { FacilitiesComponent } from './facilities/facilities.component';


const routes:Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component:LoginComponent},
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'facuilties', component: FacuiltyComponent },
  { path: 'exam-cariculam',component:ExamCariculamComponent},
  { path: 'student-onboarding', component: StudentOnboardingComponent },
  { path: 'teacher-onboarding', component: TeacherOnboardingComponent },
  { path: 'profile',component:ProfileComponent},
  { path: 'marks',component:MarksComponent},
  { path: 'attendance',component:AttendanceComponent},
  { path: 'communication',component:ComunicationComponent},
  { path: 'studay-material',component:StudyMeterialComponent},
  { path: 'home', component: HomeComponent },
  { path: 'timetable', component:TimetableComponent},
  { path: 'admission', component:AdmissionComponent},
  { path:'facilities',component:FacilitiesComponent},
  { path: 'tc', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
