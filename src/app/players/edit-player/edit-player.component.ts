import { Route } from "@angular/compiler/src/core";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { User } from "firebase";
import { Observable } from "rxjs";
import { AuthService } from "src/app/auth.service";

@Component({
  selector: "app-edit-player",
  templateUrl: "./edit-player.component.html",
  styleUrls: ["./edit-player.component.scss"],
})
export class EditPlayerComponent implements OnInit {
  uid;
  user;
  formGroup: FormGroup;

  userRoles: any[] = [
    { value: "Admin", viewValue: "מנהל" },
    { value: "Manager", viewValue: "מארגן" },
    { value: "user", viewValue: "משתמש" },
  ];
  userLevels: any[] = [
    { value: "1", viewValue: "1" },
    { value: "2", viewValue: "2" },
    { value: "3", viewValue: "3" },
    { value: "4", viewValue: "4" },
    { value: "5", viewValue: "5" },
  ];

  permanant = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.uid = this.route.snapshot.paramMap.get("id");
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      role: [null, Validators.required],
      level: [null, Validators.required],
    });

    this.authService.getUserById(this.uid).subscribe((user) => {
      this.user = user.data();
      this.formGroup.patchValue({
        role: this.user.role,
        level: this.user.level,
      });
      this.permanant = this.user.isPermanant === "true" ? true : false;
    });
  }

  back() {
    this.router.navigate([`players/list`]);
  }

  onSubmit(userForm) {
    this.authService.updateIteminInCollection(
      "users",
      {
        ...this.user,
        role: userForm.role,
        level: userForm.level,
        isPermanant: this.permanant,
      },
      this.uid
    );
    this.back();
  }
  selectionChanged(item) {
    this.permanant = item.value;
  }
}
