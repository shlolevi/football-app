import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Observable } from "rxjs";
import { startWith, map } from "rxjs/operators";

@Component({
  selector: "app-delete-player",
  templateUrl: "./delete-player.component.html",
  styleUrls: ["./delete-player.component.scss"],
})
export class DeletePlayerComponent implements OnInit {
  formGroup: FormGroup;
  post: any = "";

  playerControl = new FormControl(null, Validators.required);
  options: string[] = ["שלומי", "איציק", "אלי"];
  filteredOptions: Observable<string[]>;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.createForm();

    this.filteredOptions = this.playerControl.valueChanges.pipe(
      startWith(""),
      map((value) => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(
      (option) => option.toLowerCase().indexOf(filterValue) === 0
    );
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      player: this.playerControl,
    });
  }

  onSubmit(post) {
    this.post = post;
  }
}
