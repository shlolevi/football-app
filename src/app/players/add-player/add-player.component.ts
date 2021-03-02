import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.scss']
})
export class AddPlayerComponent implements OnInit {
  formGroup: FormGroup;
// titleAlert: string = 'This field is required';
  post: any = '';

  userRoles: any[] = [
    {value: 'Admin', viewValue: 'מנהל'},
    {value: 'Manager', viewValue: 'מארגן'},
    {value: 'user', viewValue: 'משתמש'}
  ];
  userLevels: any[] = [
    {value: '1', viewValue: '1'},
    {value: '2', viewValue: '2'},
    {value: '3', viewValue: '3'},
    {value: '4', viewValue: '4'},
    {value: '5', viewValue: '5'}
  ];

  constructor(private formBuilder: FormBuilder, private _snackBar: MatSnackBar,
     private authService: AuthService, private afAuth: AngularFireAuth, private router: Router) { }

  ngOnInit() {
    this.createForm();
  //  this.setChangeValidate();
  }

  createForm() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.formGroup = this.formBuilder.group({
      'email': [null, [Validators.required, Validators.pattern(emailregex)]],
      'name': [null, Validators.required],
      'role': [null, Validators.required],
      'level': [null, Validators.required],
      'password': [null, [Validators.required]]
    //  'description': [null, [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
    //  'validate': ''
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

  // setChangeValidate() {
  //   this.formGroup.get('validate').valueChanges.subscribe(
  //     (validate) => {
  //       if (validate == '1') {
  //         this.formGroup.get('name').setValidators([Validators.required, Validators.minLength(3)]);
  //         this.titleAlert = "You need to specify at least 3 characters";
  //       } else {
  //         this.formGroup.get('name').setValidators(Validators.required);
  //       }
  //       this.formGroup.get('name').updateValueAndValidity();
  //     }
  //   )
  // }

  // get name() {
  //   return this.formGroup.get('name') as FormControl
  // }

  // checkPassword(control) {
  //   let enteredPassword = control.value
  //   let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
  //   return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'requirements': true } : null;
  // }

  // checkInUseEmail(control) {
  //   // mimic http database access
  //   let db = ['shlomi@gmail.com'];
  //   return new Observable(observer => {
  //     setTimeout(() => {
  //       let result = (db.indexOf(control.value) !== -1) ? { 'alreadyInUse': true } : null;
  //       observer.next(result);
  //       observer.complete();
  //     }, 4000)
  //   })
  // }

  // getErrorEmail() {
  //   return this.formGroup.get('email').hasError('required') ? 'Field is required' :
  //     this.formGroup.get('email').hasError('pattern') ? 'Not a valid emailaddress' :
  //       this.formGroup.get('email').hasError('alreadyInUse') ? 'This emailaddress is already in use' : '';
  // }

  // getErrorPassword() {
  //   return this.formGroup.get('password').hasError('required') ? 'Field is required (at least eight characters, one uppercase letter and one number)' :
  //     this.formGroup.get('password').hasError('requirements') ? 'Password needs to be at least eight characters, one uppercase letter and one number' : '';
  // }

  async onSubmit(post) {
    // this.post = post;
    const { email, name, role, level, password } = this.formGroup.value;

    const fullName = name.split(' ');
     try{  
    const resp = await this.afAuth.auth.createUserWithEmailAndPassword(email,password);
    await resp.user.updateProfile({displayName: `${fullName[0]} ${fullName[1]}`})
      .then( async res => {
      await this.authService.CreateUserDocument();
      this.openSnackBar('שחקן התווסף בהצלחה');
      this.router.navigate(["/players/list"]);
      })
      .catch( err => {
        this.openSnackBar('חלה שגיאה צור קשר עם התמיכה')
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
  }

  back(){
    this.router.navigate(["/players/list"]);
  }
  
}
