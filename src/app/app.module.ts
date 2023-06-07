import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
 
import {CommonModule, DatePipe, NgOptimizedImage} from "@angular/common";
 
 
import { BlogSingleComponent } from './blog-single/blog-single.component';
 
 
import { SignIn1Component } from './sign-in1/sign-in1.component';
 
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminTablesComponent } from './admin-tables/admin-tables.component';
 
import { SidebarComponent } from './components/sidebar/sidebar.component';
 
import { ListMembreComponent } from './dashboard/list-membre/list-membre.component';
import { HttpClientModule } from '@angular/common/http';
import { HotToastModule } from '@ngneat/hot-toast';
 
import { ProfilComponent } from './dashboard/profil/profil.component';
 
 
import { ImpayeComponent } from './dashboard/impaye/impaye.component';
import { ListClientComponent } from './dashboard/list-client/list-client.component';
import { ListImpayeComponent } from './dashboard/list-impaye/list-impaye.component';

@NgModule({
  declarations: [
    AppComponent,
  
     
   
    BlogSingleComponent,
    
    
    SignIn1Component,
   
    AdminDashboardComponent,
    AdminTablesComponent,
     
    SidebarComponent,
    
    ListMembreComponent,
    
    ProfilComponent,
   
    
         ImpayeComponent,
         ListClientComponent,
         ListImpayeComponent
  ],
  imports: [CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    NgOptimizedImage,
    HttpClientModule, 
    HotToastModule.forRoot()
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
