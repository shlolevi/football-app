import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/firestore";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { MatDialog } from "@angular/material";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AuthService } from "src/app/auth.service";
import { DialogBox } from "src/app/shared/dialog-box.component";

@Component({
  selector: "app-delete-game",
  templateUrl: "./delete-game.component.html",
  styleUrls: ["./delete-game.component.scss"],
})
export class DeleteGameComponent implements OnInit {
  formGroup: FormGroup;
  post: any = "";
  user$: Observable<any>;
  private gamesCollection: AngularFirestoreCollection<any>;
  games: Observable<any[]>;
  gList: any[];
  user: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private authService: AuthService,
    public dialog: MatDialog
  ) {
    // this.gamesCollection = afs.collection('games');
    this.gamesCollection = afs.collection<any>("games", (ref) =>
      ref.orderBy("date", "asc")
    );
    this.games = this.gamesCollection.valueChanges();
  }

  ngOnInit() {
    // get loggedin user
    this.user = this.authService.UserUidObj;
    this.user$ = this.afAuth.user;

    this.createForm();
    this.retrieveGames();
  }

  isCurrentDate(gameDate): boolean {
    const convertedGameDate = new Date(gameDate).setHours(0, 0, 0, 0);
    const current = new Date().setHours(0, 0, 0, 0);

    return convertedGameDate === current;
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      numOfPlayers: new FormControl(null, Validators.required),
    });
  }

  onSubmit(post) {
    this.post = post;
  }

  openDialog(gameId) {
    const dialogRef = this.dialog.open(DialogBox, {
      data: { user: gameId, question: "אתה בטוח שאתה רוצה למחוק ?" },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.authService.updateDisplayGame(result, false);
      }
    });
  }

  retrieveGames(): void {
    this.authService
      .getAllGames()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes
            .map((c) => ({ id: c.payload.doc.id, ...c.payload.doc.data() }))
            .filter((data) => data.isDisplay != false)
        )
      )
      .subscribe((data) => {
        this.gList = data;
      });
  }

  deleteGame(id) {
    this.gamesCollection.doc(id).delete();
  }

  navToNewGame() {
    this.router.navigate(["games/add"]);
  }

  navToEditGame(id) {
    this.router.navigate(["games/edit", id]);
  }
  navToGameInfo(id) {
    this.router.navigate(["games/manage", id]);
  }
}
