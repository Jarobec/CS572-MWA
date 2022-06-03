import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GamesDataService } from '../games-data.service';

@Component({
  selector: 'app-game-add',
  templateUrl: './game-add.component.html',
  styleUrls: ['./game-add.component.css'],
})
export class GameAddComponent implements OnInit {
  @ViewChild('gameAddForm')
  gameAddForm!: NgForm;
  constructor(private gameService: GamesDataService) {}

  ngOnInit(): void {}

  addGame(form: NgForm): void {
    const a = this.gameService.addOne(form.value);
    a.subscribe((a) => console.log(a));
  }
}
