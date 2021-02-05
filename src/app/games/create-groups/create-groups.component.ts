import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-groups',
  templateUrl: './create-groups.component.html',
  styleUrls: ['./create-groups.component.scss']
})
export class CreateGroupsComponent implements OnInit {
  formGroup: FormGroup;
  post: any = '';
  constructor() { }

  ngOnInit() {
  }

}
