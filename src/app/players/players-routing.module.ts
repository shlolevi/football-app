import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { AddPlayerComponent } from './add-player/add-player.component';
import { DeletePlayerComponent } from './delete-player/delete-player.component';
import { PlayersComponent } from './players.component';
import { PlayerListComponent } from './player-list/player-list.component';
import { EditPlayerComponent } from './edit-player/edit-player.component';
import { ErrorComponent } from '../error/error.component';


export const playersRoutes: Routes = [
  {
      path: '',
      component: PlayersComponent,
      children: [
        {
          path:'', redirectTo: 'add',
          pathMatch: 'full'
        },
          {
              path: 'add',
              component: AddPlayerComponent
          },
          {
            path: 'edit/:id',
            component: EditPlayerComponent
        },
          {
            path: 'delete',
            component: DeletePlayerComponent
          },
          {
            path: 'list',
            component: PlayerListComponent
          }

      ]
  }

];


