import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.scss']
})
export class AddGameComponent implements OnInit {
  formGroup: FormGroup;
  post: any = '';

  
  constructor(private formBuilder: FormBuilder, private dateAdapter: DateAdapter<Date>, private router: Router,
    private authService: AuthService, private afAuth: AngularFireAuth) {
    this.dateAdapter.setLocale('he-IL'); 
   }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    // const utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');
    const utc = new Date().toISOString().slice(0, 10);
    // let someDate = new Date();
    // someDate.setDate(someDate.getDate() + 9);     
    this.formGroup = this.formBuilder.group({
      'numOfPlayers' :new FormControl(20,[Validators.required, Validators.min(10), Validators.max(25)]),
      'date': new FormControl(new Date(), Validators.required),
      'gameTime': new FormControl('13:30', Validators.required)
    });
  }

  get numOfPlayers() {
    return this.formGroup.get('numOfPlayers');
 }

 async onSubmit(post) {
    if (this.formGroup.invalid) {
      return;
   }

   post.date = post.date.toLocaleDateString().slice(0, 10);
   this.post = post;
    // this.formGroup.reset();
    await this.authService.addIteminInCollection('games', this.post);
    this.back();
  }

  back(){
    this.router.navigate(["/games/delete"]);
  }

}
