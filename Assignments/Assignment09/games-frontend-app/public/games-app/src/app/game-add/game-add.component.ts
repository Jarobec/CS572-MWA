import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { GamesDataService } from '../games-data.service';

@Component({
  selector: 'app-game-add',
  templateUrl: './game-add.component.html',
  styleUrls: ['./game-add.component.css'],
})
export class GameAddComponent implements OnInit {
  @ViewChild('gameAddForm')
  gameAddForm!: NgForm;

  constructor(private router: Router, private gameService: GamesDataService) {}

  ngOnInit(): void {}

  addGame(): void {
    const a = this.gameService.addOne(this.gameAddForm.value);
    a.subscribe((a) => this.router.navigate(['games']));
  }
}
