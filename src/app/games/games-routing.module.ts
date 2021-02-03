import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddGameComponent } from './add-game/add-game.component';
import { DeleteGameComponent } from './delete-game/delete-game.component';
import { GamesComponent } from './games.component';
import { Routes } from '@angular/router';

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


