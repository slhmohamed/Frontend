import {Component, OnInit} from '@angular/core';
import { get } from 'scriptjs';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError} from '@angular/router';
import {timer} from "rxjs";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  currentRoute: string;
  title = 'GestionEvenementFront';
  constructor(private router: Router) {
    this.currentRoute = "";
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        
        window.scrollTo(0,0);
      }})
  }


  
}

