import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-managed-game',
  templateUrl: './managed-game.component.html',
  styleUrls: ['./managed-game.component.scss']
})
export class ManagedGameComponent implements OnInit {

  formGroup: FormGroup;
  post: any = '';

  playing: any[] = [{name:'שלומי', id:1}, {name:'אלי', id:2},{name:'איציק', id:3},{name:'אוהד', id:5},{name:'איתן', id:4},
  {name:'עידן', id:5}, {name:'דניאל', id:6},{name:'יניב', id:7},{name:'אוראל', id:8},{name:'אדיסן', id:9}];

  waiting: any[] = [{name:'בני', id:1}, {name:'דורון', id:2},{name:'אלן', id:3}];


  playerControl = new FormControl(null,Validators.required);
  options: string[] = ['שלומי', 'איציק', 'אלי'];
  filteredOptions: Observable<string[]>;

  constructor(private formBuilder: FormBuilder, private router: Router) { }


  ngOnInit() {
    this.createForm();

    this.filteredOptions = this.playerControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  
  createForm() {
    this.formGroup = this.formBuilder.group({
      'player' :this.playerControl

    });
  }

  deletePlayer(player){
    console.log('delete player:' + player.id); 
  }

  deleteWaitPlayer(waiter){
    console.log('delete waiter:' + waiter.id); 
  }

  navToCreateGroups(){
    this.router.navigate(["games/groups"]);
 }
 
  onSubmit(post) {
    this.post = post;
  }

}
