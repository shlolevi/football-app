import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent{

  formGroup: FormGroup;
  post: any = '';
  players: any[] = [{name:'שלומי', id:1}, {name:'עידן', id:3},{name:'אדיסו', id:4},{name:'אוראל', id:5},{name:'אוהד', id:6}];

  
  constructor(private router: Router){
   }

  deletePlayer(id){
    console.log(`delete player: ${id}`);
  }

  navToNewPlayer(){
      this.router.navigate(["players/add"]);
  }
}
