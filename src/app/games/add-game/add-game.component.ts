import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.scss']
})
export class AddGameComponent implements OnInit {
  formGroup: FormGroup;
  post: any = '';

  
  constructor(private formBuilder: FormBuilder, private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('en-IL'); 
   }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'numOfPlayers' :new FormControl(20,[Validators.required, Validators.min(10), Validators.max(25)]),
      'date': new FormControl(new Date(), Validators.required),
      'gameTime': new FormControl('13:30', Validators.required)
    });
  }

  get numOfPlayers() {
    return this.formGroup.get('numOfPlayers');
 }
  onSubmit(post) {
    if (this.formGroup.invalid) {
      return;
   }
    this.post = post;
    // this.formGroup.reset();
  }

}
