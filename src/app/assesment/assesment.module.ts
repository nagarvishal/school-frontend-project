import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { CreateassesementComponent } from './createassesement/createassesement.component';
import { TakeassesmentComponent } from './takeassesment/takeassesment.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxEditorModule } from 'ngx-editor';
import { AppModule } from '../app.module';
import { StartAssesmentComponent } from './start-assesment/start-assesment.component';
import { ReviewAssesmentComponent } from './review-assesment/review-assesment.component';
import { AssServiceService } from './ass-service.service';
import { TemplateModule } from '../templates/templates.module';


@NgModule({
    declarations:[
        CreateassesementComponent,
        TakeassesmentComponent,
        StartAssesmentComponent,
        ReviewAssesmentComponent
    ],
    imports:[
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxEditorModule,
        BrowserModule,
        TemplateModule
    ],
    providers:[AssServiceService],
    exports:[
        CreateassesementComponent,
        TakeassesmentComponent
    ]
})
export class AssesmentModule{}