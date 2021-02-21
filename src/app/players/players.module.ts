import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPlayerComponent } from './add-player/add-player.component';
import { DeletePlayerComponent } from './delete-player/delete-player.component';
import { PlayersComponent } from './players.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatToolbarModule} from '@angular/material/toolbar';
import { MaterialModule } from '../material/material.module';
import { playersRoutes } from './players-routing.module';
import { PlayerListComponent } from './player-list/player-list.component';
import { EditPlayerComponent } from './edit-player/edit-player.component';



@NgModule({
  declarations: [AddPlayerComponent, DeletePlayerComponent, PlayersComponent, PlayerListComponent, EditPlayerComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    RouterModule.forChild(playersRoutes),
    MaterialModule
  ],
  exports:[
  AddPlayerComponent,
  DeletePlayerComponent]
})
export class PlayersModule { }
