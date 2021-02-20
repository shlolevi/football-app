import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
 loading = false;
 errorMessage = "";

  constructor(private formBuilder: FormBuilder, private authService: AuthService, 
    private afAuth: AngularFireAuth, private router: Router ) { 
    this.error = null; }


  ngOnInit() {
    this.userForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['',[Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  async onSignUp() {
    this.loading = true;
    const { firstName, lastName, email, password } = this.userForm.value;
    // try{  
    const resp = await this.afAuth.auth.createUserWithEmailAndPassword(email,password);
    await resp.user.updateProfile({displayName: `${firstName} ${lastName}`})
      .then( async res => {
      await this.authService.CreateUserDocument();
       // this.userForm.reset();
        const uid= resp.user.uid;
        debugger;
        // const p = {id:uid};
        // const t = {displayName: `${firstName} ${lastName}`};
        this.authService.setUserUidObj({...{displayName: `${firstName} ${lastName}`}, id:uid, role: 'user', level:3});
        this.router.navigate([`/games/delete/${uid}`]);
      //} catch(err){}
      })
      .catch( err => {
        this.error = err.message 
        this.errorMessage =  err.message;
      });

      this.loading = false;

    // this.authService.signUpUser(this.userForm.value.email, this.userForm.value.password)
    //   .then( res => console.log(res) )
    //   .catch( err => this.error = err.message );
  }

  removeError() {
    this.error = null;
  }

}
