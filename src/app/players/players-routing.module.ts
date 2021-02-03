import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { AddPlayerComponent } from './add-player/add-player.component';
import { DeletePlayerComponent } from './delete-player/delete-player.component';
import { PlayersComponent } from './players.component';


export const playerRoutes: Routes = [
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
            path: 'delete',
            component: DeletePlayerComponent
        }
      ]
  }

];

