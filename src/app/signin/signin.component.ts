import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { DocumentData } from '@angular/fire/firestore';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  error: string;
  userForm: any;
  post: any = '';
  action: 'login' | 'signup' = 'login';
  loading = false;

  constructor(private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder, private afAuth: AngularFireAuth, private auth: AuthService) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }
  async onSubmit() {
    this.loading = true;
    this.error = null;
    const { email, password } = this.userForm.value;
    const resp = await this.afAuth.auth.signInWithEmailAndPassword(email,password);
    const uid= resp.user.uid;

    // get user name
    const user = this.authService.getUserById(uid).subscribe (user => {
      this.authService.setUserUidObj(user.data());

      this.router.navigate([`/games/delete/${uid}`]);
    });

      this.loading = false;
    // this.userForm.reset();
  }

  removeError() {
    this.error = null;
  }

  get isLogin(){
    return this.action === 'login';
  }

  get isSignUp(){
    return this.action === 'signup';
  }
}
