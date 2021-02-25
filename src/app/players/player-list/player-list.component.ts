import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { DialogBox } from 'src/app/shared/dialog-box.component';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent implements OnInit{

  formGroup: FormGroup;
  post: any = '';
  private userCollection: AngularFirestoreCollection<any>;
  users: Observable<any[]>;
  user: any;
  downloadedUrl: Observable<any>;

  
  constructor(private router: Router, private afs: AngularFirestore, private afAuth: AngularFireAuth,
     private authService: AuthService, private afStorage: AngularFireStorage, public dialog: MatDialog){ 
    // this.userCollection = afs.collection('users');
    this.userCollection = afs.collection<any>('users', ref => ref.orderBy('name', "asc"));

     this.users = this.userCollection.valueChanges();

          // const queryRef = this.userCollection.where('name', '==', 'Witcher 3');
 
     //const gamesRef = db.collection('games');
     //const queryRef = gamesRef.where('name', '==', 'Witcher 3');

    //  citiesRef.orderBy("name").limit(3);

    // this.users = this.userCollection.valueChanges().pipe(
    //   tap(console.log)
    //   )
    

   }
  ngOnInit(): void {
        // get loggedin user
        this.user = this.authService.UserUidObj;
  }

  openDialog(userId) {
    const dialogRef = this.dialog.open(DialogBox,{
      data: { user: userId, question:'אתה בטוח שאתה רוצה למחוק ?' },
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.deletePlayer(result);

      }
    });
  }

  deletePlayer(id){
    this.afs.collection("users").doc(id).delete().then(() => {
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
  }

  navToNewPlayer(){
      this.router.navigate(["players/add"]);
  }

  editPlayer(player){
    this.router.navigate([`players/edit/`, player.uid]);
  }
}

// @Component({
//   selector: 'dialog-box',
//   template: `
//   <h2 mat-dialog-title>כדורגל בשכונה</h2>
//   <mat-dialog-content class="mat-typography">
//     <span> {{data.question}}</span>
//   </mat-dialog-content>
// <mat-dialog-actions align="end">
//   <button mat-button mat-dialog-close cdkFocusInitial>לא</button>
//   <button mat-button [mat-dialog-close]="userId" >כן</button>
// </mat-dialog-actions>
//   `,
// })
// export class DialogBox {
//   userId: any;
//   constructor(@Inject(MAT_DIALOG_DATA) public data: PlayerListComponent) {
//     this.userId = data.user;
//   }
// }