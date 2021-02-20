import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: any;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
        // get loggedin user
        this.user = this.authService.UserUidObj;
  }

  logOut(){
    this.authService.logout();
    this.authService.removeUserUidObj();
  }

  gotoProfile(){
    debugger;
    // const uid = this.authService.UserUid;
    const user = this.authService.UserUidObj;

    
    this.router.navigate(["/profile", user.uid]);
  }

  routeToPage(page){
    this.router.navigate([page]);

  }
}
