import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';

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

  
  constructor(private router: Router, private afs: AngularFirestore, private afAuth: AngularFireAuth, private authService: AuthService){
    this.userCollection = afs.collection('users');
    this.users = this.userCollection.valueChanges();

   }
  ngOnInit(): void {
        // get loggedin user
        this.user = this.authService.UserUidObj;
  }

  deletePlayer(id){
    this.afs.collection("users").doc(id).delete().then(() => {
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
  }

  // deleteName(){
  //   this.userCollection.doc('bEGWFUJIqhWQcCVM9Nl7wmMSj7V2').delete();
  // }
  navToNewPlayer(){
      this.router.navigate(["players/add"]);
  }

  editPlayer(id){
    this.router.navigate([`players/edit/`, id]);
  }
}
