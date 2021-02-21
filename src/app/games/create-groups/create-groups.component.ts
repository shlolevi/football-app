import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-groups',
  templateUrl: './create-groups.component.html',
  styleUrls: ['./create-groups.component.scss']
})
export class CreateGroupsComponent implements OnInit {
  formGroup: FormGroup;
  post: any = '';
  displayPlayingOrder = false;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  back(){
    this.router.navigate(["/games/delete"]);
  }

  playingOrder(){
    this.displayPlayingOrder = true;
    
  }
}
