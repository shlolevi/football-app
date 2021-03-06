import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentData,
} from "@angular/fire/firestore";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { MatDialog, MatSnackBar } from "@angular/material";
import { ActivatedRoute, Route, Router } from "@angular/router";
import { Observable } from "rxjs";
import { startWith, map } from "rxjs/operators";
import { AuthService } from "src/app/auth.service";
import { Games, Users } from "src/app/models/user-profile.model";
import { DialogBox } from "src/app/shared/dialog-box.component";

export enum Lists {
  Playing = "playing",
  Waiting = "waiting",
}

@Component({
  selector: "app-managed-game",
  templateUrl: "./managed-game.component.html",
  styleUrls: ["./managed-game.component.scss"],
})
export class ManagedGameComponent implements OnInit {
  formGroup: FormGroup;
  post: any = "";
  user: any;
  playerControl = new FormControl(null, Validators.required);
  options = [];
  filteredOptions: Observable<Users[]>;
  lists = Lists;
  uid: string;
  game: DocumentData;
  selectedUser: string;
  isAdmin: boolean;
  private gamesRef: AngularFirestoreCollection<Games>;
  userCollection: AngularFirestoreCollection<Users>;
  users: Observable<Users[]>;
  dayOfTheWeek: string;
  shakedLink =
    "https://ul.waze.com/ul?ll=31.77988821%2C34.64295989&navigate=yes&zoom=17&utm_campaign=default&utm_source=waze_website&utm_medium=lm_share_location";
  ganYavneLink =
    "https://ul.waze.com/ul?ll=31.78169099%2C34.71106374&navigate=yes&zoom=17&utm_campaign=default&utm_source=waze_website&utm_medium=lm_share_location";

  days = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private afs: AngularFirestore,
    private activatedRoute: ActivatedRoute,
    private afAuth: AngularFireAuth,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    this.gamesRef = afs.collection("games");
    this.userCollection = afs.collection<any>("users", (ref) =>
      ref.orderBy("name", "asc")
    );
    this.users = this.userCollection.valueChanges();
  }

  ngOnInit() {
    this.createForm();
    this.uid = this.activatedRoute.snapshot.paramMap.get("id");
    // get game data
    this.authService.getGameById(this.uid).subscribe((game) => {
      this.game = game.data();

      // get day of the week
      let day = new Date(this.game.date).getDay();
      this.dayOfTheWeek = this.days[day];

      // get loggedin user
      this.user = this.authService.UserUidObj;
      this.selectedUser = this.user.uid;
      this.isAdmin = this.user.role == "Admin";
      // get user list and assign default user
      this.users.subscribe((items) => {
        this.options.push(...items);
      });
    });

    // this.filteredOptions = this.playerControl.valueChanges.pipe(
    //   startWith(""),
    //   map((value) => this._filter(value))
    // );

    this.filteredOptions = this.playerControl.valueChanges.pipe(
      startWith(""),
      map((value) => (typeof value === "string" ? value : value.name)),
      map((name) => (name ? this._filter(name) : this.options.slice()))
    );
  }

  private _filter(value: string): Users[] {
    const filterValue = value.toLowerCase();

    // return this.options.filter((option) => {
    //   return option.name.toLowerCase().indexOf(filterValue) === 0;
    // });

    return this.options.filter(
      (option) => option.name.toLowerCase().indexOf(filterValue) === 0
    );
  }

  displayFn(user): string {
    return user && user.name ? user.name : "";
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      player: this.playerControl,
    });
  }

  openDialog(user, list: string) {
    const dialogRef = this.dialog.open(DialogBox, {
      data: { user: user, question: "למחוק את השחקן מהרשימה ?" },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (list === Lists.Playing) {
          this.deletePlayer(result);
        } else {
          this.deleteWaitPlayer(result);
        }
      }
    });
  }

  openSnackBar(msg: string) {
    this._snackBar.open(msg, "", {
      duration: 3000,
      horizontalPosition: "center",
      verticalPosition: "top",
      direction: "rtl",
    });
  }

  addPlayerToWaitingList() {
    if (this.isAdmin && this.playerControl.value) {
      this.selectedUser = this.playerControl.value.uid;
    }
    this.gamesRef
      .doc(this.uid)
      .get()
      .toPromise()
      .then((res) => {
        let exist = res
          .data()
          .waiting.filter((item) => item.uid == this.selectedUser);
        if (exist.length == 0) {
          this.authService.addItemToArrayInGamesWaitingDoc(this.uid, {
            name:
              this.isAdmin && this.playerControl.value
                ? this.playerControl.value.name
                : this.user.name,
            uid: this.selectedUser,
          });
        }
        this.openSnackBar("שחקן התווסף לרשימת המתנה בהצלחה");
        this.back();
      })
      .catch((error) => console.log(error));
  }
  addPlayerToPlayingList() {
    // get players and check if user already exist
    // const userExist = this.authService.isUserRegistered(this.uid,this.user.uid);
    // TODO -  move to service
    if (this.isAdmin && this.playerControl.value) {
      this.selectedUser = this.playerControl.value.uid;
    }

    this.gamesRef
      .doc(this.uid)
      .get()
      .toPromise()
      .then((res) => {
        let exist = res
          .data()
          .players.filter((item) => item.uid == this.selectedUser);
        if (
          this.game.players.length < this.game.numOfPlayers &&
          exist.length == 0
        ) {
          this.authService.addItemToArrayInGamesPlayersDoc(this.uid, {
            name:
              this.isAdmin && this.playerControl.value
                ? this.playerControl.value.name
                : this.user.name,
            uid: this.selectedUser,
          });
          this.openSnackBar("שחקן התווסף לרשימת משחק בהצלחה");
          this.back();
        } else if (exist.length == 0) {
          this.addPlayerToWaitingList();
        } else {
          this.openSnackBar("שחקן כבר קיים ברשימה");
        }
      })
      .catch((error) => console.log(error));
  }
  async deletePlayer(player) {
    //  this.authService.removeItemFromArrayInGamesPlayersDoc(this.uid,player.uid);
    // check if waiting not empty get the first on list add to players and delete from waiting
    await this.AddFromWaitingToPlayers(player);
    this.openSnackBar("שחקן נמחק מרשימת משחק בהצלחה");
    this.back();
  }

  async AddFromWaitingToPlayers(player) {
    let firstOnWaiting;
    if (this.game.waiting.length > 0) {
      firstOnWaiting = this.game.waiting[0];

      await this.authService.removePlayerFromGame(
        this.uid,
        player.uid,
        firstOnWaiting
      );

      // remove from players
      //  await this.authService.removeItemFromArrayInGamesPlayersDoc(this.uid,player.uid);
      // remove from waiting
      //      await this.authService.removeItemFromArrayInGamesWaitingDoc(this.uid,firstOnWaiting.uid);
      // add to players
      //       await this.authService.addItemToArrayInGamesPlayersDoc(this.uid,firstOnWaiting);
    } else {
      await this.authService.removeItemFromArrayInGamesPlayersDoc(
        this.uid,
        player.uid
      );
    }
  }
  deleteWaitPlayer(waiter) {
    this.authService.removeItemFromArrayInGamesWaitingDoc(this.uid, waiter.uid);
    this.openSnackBar("שחקן נמחק מרשימת המתנה בהצלחה");
    this.back();
  }

  navToCreateGroups() {
    this.router.navigate(["games/groups", this.uid]);
  }

  onSubmit(post) {
    this.post = post;
  }

  back() {
    this.router.navigate(["/games/delete"]);
  }
}
