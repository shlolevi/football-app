import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
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
    private afAuth: AngularFireAuth, private router: Router, private _snackBar: MatSnackBar ) { 
    this.error = null; }


  ngOnInit() {
    this.userForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['',[Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  openSnackBar(msg: string) {
    this._snackBar.open(msg, '', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      direction: 'rtl'
    });
  }

  async onSignUp() {
    this.loading = true;
    const { firstName, lastName, email, password } = this.userForm.value;
     try{  
    const resp = await this.afAuth.auth.createUserWithEmailAndPassword(email,password);
    await resp.user.updateProfile({displayName: `${firstName} ${lastName}`})
      .then( async res => {
      await this.authService.CreateUserDocument();
       // this.userForm.reset();
        const uid= resp.user.uid;
        this.authService.setUserUidObj({...{name: `${firstName} ${lastName}`}, uid:uid, role: 'user', level:3});
        this.router.navigate([`/games/delete/${uid}`]);

      })
      .catch( err => {
        this.openSnackBar('100 - חלה שגיאה צור קשר עם התמיכה')
        this.error = err.message 
        this.errorMessage =  err.message;
      });
    } catch(err){
      if(err.message.includes('email address is already in use')){
        this.openSnackBar('כתובת אימייל כבר רשומה במערכת - 200')
      }else if(err.message.includes('Password should be at least 6 characters')){
        this.openSnackBar('סיסמא צריכה להיות לפחות 6 תווים - 300')
      }else{
        this.openSnackBar('חלה שגיאה צור קשר עם התמיכה - 400')
      }
    }

      this.loading = false;

    // this.authService.signUpUser(this.userForm.value.email, this.userForm.value.password)
    //   .then( res => console.log(res) )
    //   .catch( err => this.error = err.message );
  }

  removeError() {
    this.error = null;
  }

}
