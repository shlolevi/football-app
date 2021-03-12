import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatAutocompleteModule,
  MatFormFieldModule,
  MAT_DATE_LOCALE,
} from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/";
import { SigninComponent } from "./signin/signin.component";
import { SignupComponent } from "./signup/signup.component";
import { RouterModule } from "@angular/router";
import { SidenavComponent } from "./sidenav/sidenav.component";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { ErrorComponent } from "./error/error.component";
import { PlayersModule } from "./players/players.module";
import { PaymentsModule } from "./payments/payments.module";
import { GamesModule } from "./games/games.module";
import { HeaderComponent } from "./layout/header/header.component";
import { FooterComponent } from "./layout/footer/footer.component";
import { MaterialModule } from "./material/material.module";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireAuthGuard } from "@angular/fire/auth-guard";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { MessagingService } from "./messaging.service";
import { AngularFireMessagingModule } from "@angular/fire/messaging";
import { AngularFireDatabaseModule } from "@angular/fire/database";

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    SidenavComponent,
    ErrorComponent,
    HeaderComponent,
    FooterComponent,
    UserProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PlayersModule,
    PaymentsModule,
    GamesModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production,
      registrationStrategy: "registerImmediately",
    }),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireMessagingModule,
  ],
  providers: [
    AngularFireAuthGuard,
    MessagingService,
    { provide: MAT_DATE_LOCALE, useValue: "en-GB" },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
