import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material';

@Component({
  selector: 'app-delete-game',
  templateUrl: './delete-game.component.html',
  styleUrls: ['./delete-game.component.scss']
})
export class DeleteGameComponent implements OnInit {

  formGroup: FormGroup;
  post: any = '';
  games: any[] = [{name:'Boots', id:1}, {name:'Sneakers', id:3},{name:'Moccasins', id:4},{name:'Loafers', id:5},{name:'Clogs', id:6}];

  
  constructor(private formBuilder: FormBuilder){
   }

  ngOnInit() {
    this.createForm();

  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'numOfPlayers': new FormControl(null, Validators.required),
    });
  }

  onSubmit(post) {
    this.post = post;
  }

  deleteGame(id){
    console.log(`delete game: ${id}`);
  }
}
