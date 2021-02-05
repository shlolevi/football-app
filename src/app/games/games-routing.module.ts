import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddGameComponent } from './add-game/add-game.component';
import { DeleteGameComponent } from './delete-game/delete-game.component';
import { GamesComponent } from './games.component';
import { Routes } from '@angular/router';
import { ManagedGameComponent } from './managed-game/managed-game.component';
import { CreateGroupsComponent } from './create-groups/create-groups.component';

export const gamesRoutes: Routes = [
  {
      path: '',
      component: GamesComponent,
      children: [
        {
          path:'', redirectTo: 'add',
          pathMatch: 'full'
        },
          {
              path: 'add',
              component: AddGameComponent
          },
          {
            path: 'delete',
            component: DeleteGameComponent
          },
          {
            path: 'manage',
            component: ManagedGameComponent
          },
          {
            path: 'groups',
            component: CreateGroupsComponent
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


