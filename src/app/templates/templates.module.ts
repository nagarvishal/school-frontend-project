import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HeadersComponent } from './headers/headers.component';
import { FootersComponent } from './footers/footers.component';
import { SidebarsComponent } from './sidebars/sidebars.component';
import { Router, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';


@NgModule({
    declarations:[

    
    HeadersComponent,
    FootersComponent,
    SidebarsComponent,
    HomeComponent
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
        SidebarsComponent,
        HomeComponent
    ]
})
export class TemplateModule{}