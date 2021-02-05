import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  userForm: any;
  error: string;
  post: any = '';

  constructor(private formBuilder: FormBuilder, private authService: AuthService ) { 
    this.error = null; }


  ngOnInit() {
    this.userForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['',[Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSignUp(form) {
    console.log(this.userForm.value)
    // this.authService.signUpUser(this.userForm.value.email, this.userForm.value.password)
    //   .then( res => console.log(res) )
    //   .catch( err => this.error = err.message );
     this.userForm.reset();
  }

  removeError() {
    this.error = null;
  }

}
