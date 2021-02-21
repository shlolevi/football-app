import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddGameComponent } from './add-game/add-game.component';
import { DeleteGameComponent } from './delete-game/delete-game.component';
import { GamesComponent } from './games.component';
import { Routes } from '@angular/router';
import { ManagedGameComponent } from './managed-game/managed-game.component';
import { CreateGroupsComponent } from './create-groups/create-groups.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo} from '@angular/fire/auth-guard'
import { map } from 'rxjs/operators';
import { ErrorComponent } from '../error/error.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);
const onlyAllowSelf =  next => map(user => (!!user && next.params.id === (user as any).uid) || ['']);

export const gamesRoutes: Routes = [
  
  {
      path: '',
      component: GamesComponent,
      children: [
        {
          path:'', redirectTo: 'delete',
          pathMatch: 'full'
        },
          {
              path: 'add',
              component: AddGameComponent,
              canActivate: [AngularFireAuthGuard],
              data: { authGuardPipe: redirectUnauthorizedToLogin }
          },
          {
            path: 'delete',
            component: DeleteGameComponent,
            canActivate: [AngularFireAuthGuard],
            data: { authGuardPipe: redirectUnauthorizedToLogin }
          },
          {
            path: 'delete/:id',
            component: DeleteGameComponent,
            canActivate: [AngularFireAuthGuard],
            data: { authGuardPipe: onlyAllowSelf }
          },
          {
            path: 'manage/:id',
            component: ManagedGameComponent,
            canActivate: [AngularFireAuthGuard],
            data: { authGuardPipe: redirectUnauthorizedToLogin }
          },
          {
            path: 'groups',
            component: CreateGroupsComponent,
            canActivate: [AngularFireAuthGuard],
            data: { authGuardPipe: redirectUnauthorizedToLogin }
          }
      ]
  }

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class GamesRoutingModule { }


