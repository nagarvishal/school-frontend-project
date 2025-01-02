import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import BrowserAnimationsModule
import { MessageService } from 'primeng/api';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { AceModule } from 'ngx-ace-wrapper';
import { ACE_CONFIG } from 'ngx-ace-wrapper';
import { AceConfigInterface } from 'ngx-ace-wrapper';
import { NgxEditorModule } from 'ngx-editor';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { StudentOnboardingComponent } from './student-onboarding/student-onboarding.component';
import { TeacherOnboardingComponent } from './teacher-onboarding/teacher-onboarding.component';
import { MarksComponent } from './marks/marks.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { TimetableComponent } from './timetable/timetable.component';
import { StudyMeterialComponent } from './study-meterial/study-meterial.component';
import { ComunicationComponent } from './comunication/comunication.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { FacuiltyComponent } from './facuilty/facuilty.component';
import { AdmissionComponent } from './admission/admission.component';
import { LatestUpdateComponent } from './latest-update/latest-update.component';
import { FacilitiesComponent } from './facilities/facilities.component';
import { LoginComponent } from './login/login.component';
import { ExamCariculamComponent } from './exam-cariculam/exam-cariculam.component';
import { SidebarComponent } from './sidebar/sidebar.component';
const DEFAULT_ACE_CONFIG: AceConfigInterface = {
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ProfileComponent,
    StudentOnboardingComponent,
    TeacherOnboardingComponent,
    MarksComponent,
    AttendanceComponent,
    TimetableComponent,
    StudyMeterialComponent,
    ComunicationComponent,
    AboutComponent,
    ContactComponent,
    FacuiltyComponent,
    AdmissionComponent,
    LatestUpdateComponent,
    FacilitiesComponent,
    LoginComponent,
    ExamCariculamComponent,
    SidebarComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbDropdownModule,
    BrowserAnimationsModule,
    ToastModule,
    MonacoEditorModule.forRoot(),
    AceModule,
    NgxEditorModule,
  ],
  providers: [
    {
      provide: ACE_CONFIG,
      useValue: DEFAULT_ACE_CONFIG,
    },
    MessageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
