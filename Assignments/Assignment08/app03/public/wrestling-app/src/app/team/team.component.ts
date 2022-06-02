import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeamModel } from '../classes/team-model';
import { TeamsDataService } from '../teams-data.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css'],
})
export class TeamComponent implements OnInit {
  team!: TeamModel;
  constructor(
    private _router: ActivatedRoute,
    private _teamsService: TeamsDataService
  ) {
    this.team = new TeamModel('', '');
  }

  ngOnInit(): void {
    const teamId = this._router.snapshot.params['teamId'];
    this._teamsService.getOne(teamId).subscribe((team) => (this.team = team));
  }
}
