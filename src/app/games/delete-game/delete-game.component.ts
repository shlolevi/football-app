import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth.service';


@Component({
  selector: 'app-delete-game',
  templateUrl: './delete-game.component.html',
  styleUrls: ['./delete-game.component.scss']
})
export class DeleteGameComponent implements OnInit {

  formGroup: FormGroup;
  post: any = '';
  gamesList: any[] = [{name:'12/02/2021', id:1}, {name:'14/02/2021', id:3},{name:'15/02/2021', id:4},{name:'16/02/2021', id:5},{name:'17/02/2021', id:6},
  {name:'20/02/2021', id:1}, {name:'22/02/2021', id:3},{name:'24/02/2021', id:4},{name:'25/02/2021', id:5},{name:'27/02/2021', id:6}];

  user$: Observable<any>;
  private gamesCollection: AngularFirestoreCollection<any>;
  games: Observable<any[]>;
  gList: any[];
  user: any;
  
  constructor(private formBuilder: FormBuilder, private router: Router,private afs: AngularFirestore, 
    private afAuth: AngularFireAuth, private authService:AuthService){
    this.gamesCollection = afs.collection('games');
    this.games = this.gamesCollection.valueChanges();
   }

  ngOnInit() {
        // get loggedin user
    this.user = this.authService.UserUidObj;
    this.user$ = this.afAuth.user;
    this.user$.subscribe(user => {
      // TODO  - listen to changes
      console.log('user id: ' + user.uid);
      console.log('aaaa: ' + JSON.stringify(this.afAuth.auth.currentUser));
      
    });

    this.createForm();
    this.retrieveTutorials();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'numOfPlayers': new FormControl(null, Validators.required),
    });
  }

  onSubmit(post) {
    this.post = post;
  }

  retrieveTutorials(): void {
    // TODO - convert date
    this.authService.getAllGames().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.gList = data;
      // TODO - conver timestamp to date
      // this.gList.forEach(element => {
      //   element.date = new Date(element.date.seconds);
      // });
    });
  }

  deleteGame(id){
    console.log(`delete game: ${id}`);
    // TODO -  delete game
  }

  navToNewGame(){
    this.router.navigate(["games/add"]);
  }

  navToGameInfo(id){
     this.router.navigate(["games/manage",id]);
  }
  

}
