import { Component, OnInit } from '@angular/core';
import { AngularFirestore, DocumentData } from '@angular/fire/firestore';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'firebase';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-create-groups',
  templateUrl: './create-groups.component.html',
  styleUrls: ['./create-groups.component.scss']
})
export class CreateGroupsComponent implements OnInit {
  formGroup: FormGroup;
  post: any = '';
  displayPlayingOrder = false;
  uid;
  gameData: DocumentData;

  userCollection: any;
  players= [] ;

  constructor(private route: ActivatedRoute,private router: Router, private authService: AuthService, private afs: AngularFirestore) { 
    this.userCollection = afs.collection<any>('users', ref => ref.orderBy('name', "asc"));
  }

  ngOnInit() {
   this.uid = this.route.snapshot.paramMap.get('id');
    // get game data
      this.authService.getGameById(this.uid).subscribe(async game => {
        this.gameData = game.data();
         // get playing list
   //     this.players = this.gameData.players;
        await this.getPlayersLevelAndCreateGroups();
      //  console.log(this.gameData.players);

      });

  }

  // get level for each player
   async getPlayersLevelAndCreateGroups(){
     console.log('players length:',this.gameData.players.length);
     
     let counter =0;
     let checked = [];
     while (counter < this.gameData.players.length){
       let item = this.gameData.players[Math.floor(Math.random() * this.gameData.players.length)];
       let exist = checked.includes(item.uid);
      if(exist){
        continue;
      } else {
        checked.push(item.uid); 
        counter++;
      }
     }

     debugger;
    this.gameData.players.forEach((elem: User) => {
    this.authService.getUserById(elem.uid).subscribe( player => {
        const tmpElem =  {...elem, level: player.data().level};
        this.players.push(tmpElem);
      }); 
    });      
    console.log('new array:', this.players);
//    this.players.sort((a,b) => (a.level > b.level) ? 1 : ((b.level > a.level) ? -1 : 0))
this.players.sort(function (a, b) {
      return a.value - b.value;
    });
    console.log('sorted array:', this.players);

  }


    // playing order
      setPlayingOrder(){

      }

      // create groups and save in DB
      saveGroupsToDb(){

      }
      
  back(){
    this.router.navigate(["/games/manage/", this.uid]);
  }

  playingOrder(){
    this.displayPlayingOrder = true;
    
  }
}
