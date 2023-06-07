import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CommonModule} from "@angular/common";
 
  
import {BlogSingleComponent} from "./blog-single/blog-single.component";
 
 
import {SignIn1Component} from "./sign-in1/sign-in1.component";
 
import {AdminDashboardComponent} from "./admin-dashboard/admin-dashboard.component";
import {AdminTablesComponent} from "./admin-tables/admin-tables.component";
 
 import { ProfilComponent } from './dashboard/profil/profil.component';
import { ListMembreComponent } from './dashboard/list-membre/list-membre.component';
import { ImpayeComponent } from './dashboard/impaye/impaye.component';
import { ListClientComponent } from './dashboard/list-client/list-client.component';
import { ListImpayeComponent } from './dashboard/list-impaye/list-impaye.component';
 
const routes: Routes = [
  {path: "impaye", component: ImpayeComponent},
  {path: "", component: SignIn1Component},
   
  
  {path: "blog1", component: BlogSingleComponent},
 
  
  {path: "login", component: SignIn1Component},
 
  {path: "dashboard", component: AdminDashboardComponent},
  {path: "tables", component: AdminTablesComponent},
  {path: "tables", component: AdminTablesComponent},
   
 
  {path: "profil", component: ProfilComponent}, 
  {path: "list-membre", component: ListMembreComponent}, 
  {path: "list-impayé", component:ListImpayeComponent }, 
  {path: "list-client", component: ListClientComponent}, 
  {path: "imaye", component: ImpayeComponent}, 
   




];



export const AppRoutingModule = RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' });
