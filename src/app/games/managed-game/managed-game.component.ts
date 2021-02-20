import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, DocumentData } from '@angular/fire/firestore';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth.service';
import { Games } from 'src/app/models/user-profile.model';

@Component({
  selector: 'app-managed-game',
  templateUrl: './managed-game.component.html',
  styleUrls: ['./managed-game.component.scss']
})
export class ManagedGameComponent implements OnInit {

  formGroup: FormGroup;
  post: any = '';
  user: any;
  playerControl = new FormControl(null,Validators.required);
  options: string[] = ['שלומי', 'איציק', 'אלי'];
  filteredOptions: Observable<string[]>;

   uid:string;
   game: DocumentData;
   private gamesRef: AngularFirestoreCollection<Games>;

  constructor(private formBuilder: FormBuilder,private router: Router, private authService: AuthService, 
    private afs: AngularFirestore, private activatedRoute: ActivatedRoute, private afAuth: AngularFireAuth) {
      this.gamesRef = afs.collection('games');
     }


  ngOnInit() {
    this.createForm();
    this.uid = this.activatedRoute.snapshot.paramMap.get('id');
    // get game data
    this.authService.getGameById(this.uid).subscribe (game => {
      this.game = game.data();
    // get loggedin user
    this.user = this.authService.UserUidObj;
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  
  createForm() {
    // this.formGroup = this.formBuilder.group({
    //   'player' :this.playerControl

    // });
  }

  addPlayerToWaitingList(){

    this.gamesRef.doc(this.uid).get().toPromise().then((res) => {
      let exist = res.data().waiting.filter(item => item.uid == this.user.uid);
      if( exist.length == 0){
        this.authService.addItemToArrayInGamesWaitingDoc(this.uid,{name:this.user.name ,uid: this.user.uid});
      }
         this.back();

   }).catch(error => console.log(error));
  }
  addPlayerToPlayingList(){
    // get players and check if user already exist
    // const userExist = this.authService.isUserRegistered(this.uid,this.user.uid);
    // TODO -  move to service
    this.gamesRef.doc(this.uid).get().toPromise().then((res) => {
       let exist = res.data().players.filter(item => item.uid == this.user.uid);
      
        if(this.game.players.length < this.game.numOfPlayers && exist.length == 0){
          this.authService.addItemToArrayInGamesPlayersDoc(this.uid,{name: this.user.name,uid: this.user.uid});
          this.back();
        }else{
          this.addPlayerToWaitingList();
          this.back();
        }
    }).catch(error => console.log(error));



  }
  deletePlayer(player){
    this.authService.removeItemFromArrayInGamesPlayersDoc(this.uid,player.uid);
    // check if waiting not empty get the first on list add to players and delete from waiting
    this.AddFromWaitingToPlayers();
    this.back();
  }
  
  AddFromWaitingToPlayers(){
    let firstOnWaiting;
      if(this.game.waiting.length > 0){
       firstOnWaiting = this.game.waiting[0];
       // remove from waiting
        this.authService.removeItemFromArrayInGamesWaitingDoc(this.uid,firstOnWaiting.uid);
       // add to players
          this.authService.addItemToArrayInGamesPlayersDoc(this.uid,firstOnWaiting);
      }
  }
  deleteWaitPlayer(waiter){
    this.authService.removeItemFromArrayInGamesWaitingDoc(this.uid,waiter.uid);
    this.back();
  }

  navToCreateGroups(){
    this.router.navigate(["games/groups"]);
 }
 
  onSubmit(post) {
    this.post = post;
  }

  back(){
    this.router.navigate(["/games/delete"]);
  }

}
