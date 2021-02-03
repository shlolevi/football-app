import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import * as firebase from 'firebase';
import {filter} from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'כדורגל בשכונה';
  isDisplayLayout = false;
  constructor(private router: Router) {
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
  )
      .subscribe((event:NavigationEnd) => {
          if(event.url.indexOf('signin') !== -1 || event.url.indexOf('signup') !== -1 || event.url.length === 1){
              this.isDisplayLayout = false;
          }else{
            this.isDisplayLayout = true;
          }
      });
}
  ngOnInit() {
    // firebase.initializeApp({
    //   apiKey: "AIzaSyAXmmANvTBpPetwIC6KXu1nxTfKySQEZD4",
    //   authDomain: "angular-authentication-9b322.firebaseapp.com",
    //   databaseURL: "https://angular-authentication-9b322.firebaseio.com",
    //   projectId: "angular-authentication-9b322",
    //   storageBucket: "angular-authentication-9b322.appspot.com",
    //   messagingSenderId: "393043922685"
    // });
  }
  
}
