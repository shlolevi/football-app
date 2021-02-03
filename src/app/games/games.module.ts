import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddGameComponent } from './add-game/add-game.component';
import { DeleteGameComponent } from './delete-game/delete-game.component';



@NgModule({
  declarations: [AddGameComponent, DeleteGameComponent],
  imports: [
    CommonModule
  ]
})
export class GamesModule { }
