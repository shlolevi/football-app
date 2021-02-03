import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  error: string;
  userForm: any;

  constructor(private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }
  onSubmit() {
    console.log(this.userForm.value)

    // this.authService.signInUser(this.userForm.value.email, this.userForm.value.password)
    //   .then((user) => {
    //     console.log(user.user)
    //     this.authService.setLoginStatus(true);
    //     this.router.navigateByUrl('home');
    //   })
    //   .catch( err => this.error = err.message );
    this.userForm.reset();
  }

  removeError() {
    this.error = null;
  }

}
