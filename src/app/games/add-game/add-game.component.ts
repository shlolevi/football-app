import { Component, OnDestroy, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestoreCollection,
  AngularFirestore,
} from "@angular/fire/firestore";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { DateAdapter } from "@angular/material";
import { Router } from "@angular/router";
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { AuthService } from "src/app/auth.service";
import { Users } from "src/app/models/user-profile.model";

@Component({
  selector: "app-add-game",
  templateUrl: "./add-game.component.html",
  styleUrls: ["./add-game.component.scss"],
})
export class AddGameComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  post: any = "";
  addPermanant = false;
  userCollection: AngularFirestoreCollection<Users>;
  users: Observable<Users[]>;
  private componentDestroy$ = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private dateAdapter: DateAdapter<Date>,
    private router: Router,
    private authService: AuthService,
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth
  ) {
    this.dateAdapter.setLocale("he-IL");
    this.userCollection = afs.collection<any>("users", (ref) =>
      ref.where("isPermanant", "==", "true")
    );
    this.users = this.userCollection.valueChanges();
  }

  ngOnInit() {
    this.createForm();
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

    let players: Users[];
    post.date = new Date(post.date).getTime();
    //     post.date = post.date.toLocaleDateString().slice(0, 10);
    this.post = post;

    if (this.addPermanant) {
      this.users.pipe(takeUntil(this.componentDestroy$)).subscribe((list) => {
        players = list;

        this.authService.addIteminInCollection("games", {
          ...this.post,
          players: list,
        });
        this.back();
      });
    } else {
      await this.authService.addIteminInCollection("games", this.post);
      this.back();
    }
  }

  selectionChanged(item) {
    this.addPermanant = item.value;
  }

  back() {
    this.router.navigate(["/games/delete"]);
  }
  ngOnDestroy(): void {
    if (this.componentDestroy$) {
      this.componentDestroy$.next();
      this.componentDestroy$.unsubscribe();
    }
  }
}
