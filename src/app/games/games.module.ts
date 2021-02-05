import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddGameComponent } from './add-game/add-game.component';
import { DeleteGameComponent } from './delete-game/delete-game.component';
import { RouterModule } from '@angular/router';
import { GamesComponent } from './games.component';
import { gamesRoutes } from './games-routing.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { ManagedGameComponent } from './managed-game/managed-game.component';
import { CreateGroupsComponent } from './create-groups/create-groups.component';



@NgModule({
  declarations: [AddGameComponent, DeleteGameComponent, GamesComponent, ManagedGameComponent, CreateGroupsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(gamesRoutes),
    FormsModule, ReactiveFormsModule,
    MaterialModule,
    [NgxMaterialTimepickerModule.setLocale('en-IL')]
  ]
})
export class GamesModule { }
