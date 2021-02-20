import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { map } from 'rxjs/operators';
import { ErrorComponent } from './error/error.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { AngularFireAuthGuard} from '@angular/fire/auth-guard'
import { UserProfileComponent } from './user-profile/user-profile.component';

const redirectLoggedInToPage = () => map(user  => user ? ['games/delete', (user as any).uid]: true);

const routes: Routes = [
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
  { path: 'signin', component: SigninComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectLoggedInToPage }},
  { path: 'signup', component: SignupComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectLoggedInToPage } },
  { path: 'profile/:id', component: UserProfileComponent, canActivate: [AngularFireAuthGuard]},
  {
    path: 'players',
    loadChildren: () => import('./players/players.module').then(m => m.PlayersModule)
  },
  {
    path: 'games',
    loadChildren: () => import('./games/games.module').then(m => m.GamesModule)
  },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
