import { Component, OnInit } from '@angular/core';

import { TeamModel } from '../classes/team-model';
import { TeamsDataService } from '../teams-data.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
})
export class TeamsComponent implements OnInit {
  teams: TeamModel[] = [];

  constructor(private _teamsService: TeamsDataService) {}

  ngOnInit(): void {
    this._teamsService.getAll().subscribe((teams) => (this.teams = teams));
  }
}
