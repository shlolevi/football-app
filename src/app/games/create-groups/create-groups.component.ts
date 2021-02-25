import { Component, OnInit } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  players: [];

  constructor(private route: ActivatedRoute,private router: Router, private authService: AuthService) { }

  ngOnInit() {
   this.uid = this.route.snapshot.paramMap.get('id');

    // get game data
      this.authService.getGameById(this.uid).subscribe(game => {
        this.gameData = game.data();
        this.players = this.gameData.players;
      })

    // get plying list

    // create groups and save in DB

    // playing order

  }

  back(){
    this.router.navigate(["/games/delete"]);
  }

  playingOrder(){
    this.displayPlayingOrder = true;
    
  }
}
