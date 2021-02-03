import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { AddPlayerComponent } from './players/add-player/add-player.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';


const routes: Routes = [
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
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
