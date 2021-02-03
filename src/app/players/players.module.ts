import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPlayerComponent } from './add-player/add-player.component';
import { DeletePlayerComponent } from './delete-player/delete-player.component';
import { playerRoutes } from './players-routing.module';
import { PlayersComponent } from './players.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatToolbarModule} from '@angular/material/toolbar';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [AddPlayerComponent, DeletePlayerComponent, PlayersComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    RouterModule.forChild(playerRoutes),
    MaterialModule
  ],
  exports:[
  AddPlayerComponent,
  DeletePlayerComponent]
})
export class PlayersModule { }
