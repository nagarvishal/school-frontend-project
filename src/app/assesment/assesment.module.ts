import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { CreateassesementComponent } from './createassesement/createassesement.component';
import { TakeassesmentComponent } from './takeassesment/takeassesment.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxEditorModule } from 'ngx-editor';
import { AppModule } from '../app.module';


@NgModule({
    declarations:[
        CreateassesementComponent,
        TakeassesmentComponent
    ],
    imports:[
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxEditorModule,
        BrowserModule
    ],
    providers:[],
    exports:[
        CreateassesementComponent,
        TakeassesmentComponent
    ]
})
export class AssesmentModule{}