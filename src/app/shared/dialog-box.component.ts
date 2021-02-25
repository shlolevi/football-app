import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';


@Component({
    selector: 'dialog-box',
    template: `
    <h2 mat-dialog-title>כדורגל בשכונה</h2>
    <mat-dialog-content class="mat-typography">
      <span> {{data.question}}</span>
    </mat-dialog-content>
  <mat-dialog-actions align="end">
    <button mat-button mat-dialog-close cdkFocusInitial>לא</button>
    <button mat-button [mat-dialog-close]="userId" >כן</button>
  </mat-dialog-actions>
    `,
  })
  export class DialogBox {
    userId: any;
    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
      this.userId = data.user;
    }
  }