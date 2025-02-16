import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HeadersComponent } from './headers/headers.component';
import { FootersComponent } from './footers/footers.component';
import { SidebarsComponent } from './sidebars/sidebars.component';
import { Router, RouterModule } from '@angular/router';


@NgModule({
    declarations:[

    
    HeadersComponent,
    FootersComponent,
    SidebarsComponent
  ],
    imports:[
        CommonModule,
        BrowserModule,
        RouterModule
    ],
    providers:[],
    exports:[
        HeadersComponent,
        FootersComponent,
        SidebarsComponent
    ]
})
export class TemplateModule{}