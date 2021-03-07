import { Component, OnInit } from "@angular/core";
import { AngularFirestore, DocumentData } from "@angular/fire/firestore";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { User } from "firebase";
import { BrowserStack } from "protractor/built/driverProviders";
import { Observable } from "rxjs";
import { AuthService } from "src/app/auth.service";
import { FinalTeams } from "src/app/models/user-profile.model";

@Component({
  selector: "app-create-groups",
  templateUrl: "./create-groups.component.html",
  styleUrls: ["./create-groups.component.scss"],
})
export class CreateGroupsComponent implements OnInit {
  formGroup: FormGroup;
  post: any = "";
  displayPlayingOrder = false;
  uid;
  gameData: DocumentData;
  teamsNumber: number;

  userCollection: any;
  players = [];
  teams3 = [];
  teams4 = [];
  teams5 = [];
  playingOrder = [];
  finalTeams: FinalTeams = {
    team1: [],
    team2: [],
    team3: [],
    team4: [],
    team5: [],
  };

  playingf: number;
  playings: number;
  orderf: number;
  orders: number;
  ordert: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private afs: AngularFirestore
  ) {
    this.userCollection = afs.collection<any>("users", (ref) =>
      ref.orderBy("name", "asc")
    );
  }

  async ngOnInit() {
    this.uid = this.route.snapshot.paramMap.get("id");
    // get game data
    this.authService.getGameById(this.uid).subscribe(async (game) => {
      this.gameData = game.data();
      this.finalTeams = this.gameData.teams;
      this.playingOrder = this.gameData.playingOrder;

      if (this.playingOrder) {
        try {
          this.displayPlayingOrder = true;

          this.playingf = this.playingOrder[0] + 1;
          this.playings = this.playingOrder[1] + 1;
          this.orderf = this.playingOrder[2] + 1;
          this.orders = this.playingOrder[3] + 1;
          this.ordert = this.playingOrder[4] + 1;
        } catch (e) {}
      }

      await this.getPlayers();

      // number of players / 5
      this.teamsNumber = this.gameData.players.length / 5;
    });
  }

  async getPlayers() {
    // get player level
    this.gameData.players.forEach((elem: User) => {
      this.authService.getUserById(elem.uid).subscribe((player) => {
        const tmpElem = { ...elem, level: player.data().level };
        this.players.push(tmpElem);
      });
    });
  }

  devideGroups() {
    // devide players to groups 5,4,others
    this.gameData.players.forEach((player) => {
      if (player.level === 5) {
        this.teams5.push(player);
      } else if (player.level === 4) {
        this.teams4.push(player);
      } else {
        this.teams3.push(player);
      }
    });
  }
  createGroups() {
    // clear groups
    this.finalTeams.team1 = [];
    this.finalTeams.team2 = [];
    this.finalTeams.team3 = [];
    this.finalTeams.team4 = [];
    this.finalTeams.team5 = [];
    // go over groups and build the teams
    this.devideGroups();

    let writeTo = 1;
    while (this.teams5.length > 0) {
      this.setPlayingOrder(this.teams5, writeTo);
      if (writeTo < this.teamsNumber) {
        writeTo++;
      } else {
        writeTo = 1;
      }
    }
    while (this.teams4.length > 0) {
      this.setPlayingOrder(this.teams4, writeTo);
      if (writeTo < this.teamsNumber) {
        writeTo++;
      } else {
        writeTo = 1;
      }
    }
    while (this.teams3.length > 0) {
      this.setPlayingOrder(this.teams3, writeTo);
      if (writeTo < this.teamsNumber) {
        writeTo++;
      } else {
        writeTo = 1;
      }
    }

    const payload = { ...this.gameData, teams: this.finalTeams };
    // write to db
    this.authService.updateIteminInCollection("games", payload, this.uid);
  }

  setPlayingOrder(team: any[], teamNumber: number): void {
    let idx = Math.floor(Math.random() * team.length);
    let selected = team[idx];
    team.splice(idx, 1);

    switch (teamNumber) {
      case 1:
        this.finalTeams.team1.push(selected);
        break;
      case 2:
        this.finalTeams.team2.push(selected);
        break;
      case 3:
        this.finalTeams.team3.push(selected);
        break;
      case 4:
        this.finalTeams.team4.push(selected);
        break;
      case 5:
        this.finalTeams.team5.push(selected);
        break;
    }

    // let counter = 0;
    // let checked = [];
    // while (counter < this.gameData.players.length) {
    //   let item = this.gameData.players[
    //     Math.floor(Math.random() * this.gameData.players.length)
    //   ];
    //   let exist = checked.includes(item.uid);
    //   if (exist) {
    //     continue;
    //   } else {
    //     checked.push(item.uid);
    //     counter++;
    //   }
    // }
  }

  back() {
    this.router.navigate(["/games/manage/", this.uid]);
  }

  serPlayingOrder() {
    let counter = 0;
    let order: any[] = [];
    while (counter < this.teamsNumber) {
      let idx = Math.floor(Math.random() * this.teamsNumber);

      let exist = order.includes(idx);
      if (exist) {
        continue;
      } else {
        order.push(idx);
        counter++;
      }
    }

    this.playingf = order[0] + 1;
    this.playings = order[1] + 1;
    this.orderf = order[2] + 1;
    this.orders = order[3] + 1;
    this.ordert = order[4] + 1;

    this.displayPlayingOrder = true;
    const payload = { ...this.gameData, playingOrder: order };
    // write to db
    this.authService.updateIteminInCollection("games", payload, this.uid);

    //   debugger;
    //   this.players.sort(function (a, b) {
    //     return a.level - b.level;
    //   });
    //   console.log(this.players);
  }

  // openMap() {
  //   let toLat = "3.1467845";
  //   let toLong = "101.6897892";

  //   let destination = toLat + "," + toLong;
  //   // window.open("https://waze.com/ul?ll=" + destination + "&navigate=yes&z=10");
  //   // window.open("https://www.google.com/maps/search/?api=1&query="+destination)ף
  //   // window.open(
  //   //   "https://www.google.com/maps/search/?api=1&query=Public School Shaked, Rekhav'am ha-Melekh St 15, Ashdod"
  //   // );
  // }
}
