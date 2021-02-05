import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-game',
  templateUrl: './delete-game.component.html',
  styleUrls: ['./delete-game.component.scss']
})
export class DeleteGameComponent implements OnInit {

  formGroup: FormGroup;
  post: any = '';
  games: any[] = [{name:'12/02/2021', id:1}, {name:'14/02/2021', id:3},{name:'15/02/2021', id:4},{name:'16/02/2021', id:5},{name:'17/02/2021', id:6},
  {name:'20/02/2021', id:1}, {name:'22/02/2021', id:3},{name:'24/02/2021', id:4},{name:'25/02/2021', id:5},{name:'27/02/2021', id:6}];

  
  constructor(private formBuilder: FormBuilder, private router: Router){
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
  navToNewGame(){
    this.router.navigate(["games/add"]);
  }

  navToGameInfo(id){
     this.router.navigate(["games/manage"]);
  }
  

}
