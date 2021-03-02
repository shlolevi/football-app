import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { DocumentData, AngularFirestore } from "@angular/fire/firestore";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { DateAdapter } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "src/app/auth.service";
import { Games } from "src/app/models/user-profile.model";

@Component({
  selector: "app-edit-game",
  templateUrl: "./edit-game.component.html",
  styleUrls: ["./edit-game.component.scss"],
})
export class EditGameComponent implements OnInit {
  formGroup: FormGroup;
  post: any = "";
  gamesRef: DocumentData;
  uid: string;
  itemDoc: any;
  item: any;
  userForm: any;

  constructor(
    private formBuilder: FormBuilder,
    private dateAdapter: DateAdapter<Date>,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) {
    this.dateAdapter.setLocale("he-IL");
    this.uid = this.activatedRoute.snapshot.paramMap.get("id");
    this.gamesRef = afs.collection("games");
  }

  ngOnInit() {
    this.createForm();

    // get game data
    this.itemDoc = this.afs.doc<Games>(`games/${this.uid}`);
    this.item = this.itemDoc.valueChanges();
    this.item.subscribe((it) => {
      this.formGroup.patchValue({
        numOfPlayers: it.numOfPlayers,
        gameTime: it.gameTime,
        date: new Date(it.date),
        location: it.location,
      });
    });
  }

  createForm() {
    // const utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');
    const utc = new Date().toISOString().slice(0, 10);
    // let someDate = new Date();
    // someDate.setDate(someDate.getDate() + 9);
    this.formGroup = this.formBuilder.group({
      numOfPlayers: new FormControl(20, [
        Validators.required,
        Validators.min(10),
        Validators.max(25),
      ]),
      date: new FormControl(new Date(), Validators.required),
      gameTime: new FormControl("13:30", Validators.required),
      location: new FormControl("שקד"),
    });
  }

  get numOfPlayers() {
    return this.formGroup.get("numOfPlayers");
  }

  async onSubmit(post) {
    if (this.formGroup.invalid) {
      return;
    }

    post.date = post.date.toLocaleDateString().slice(0, 10);
    this.post = post;
    await this.authService.updateIteminInCollection(
      "games",
      this.post,
      this.uid
    );
    this.back();
  }

  back() {
    this.router.navigate(["/games/delete"]);
  }
}
