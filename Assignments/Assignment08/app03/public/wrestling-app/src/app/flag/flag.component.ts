import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-flag',
  templateUrl: './flag.component.html',
  styleUrls: ['./flag.component.css'],
})
export class FlagComponent implements OnInit {
  flags = [
    { name: 'Mongolia', flag: 'π²π³' },
    { name: 'United States of America', flag: 'πΊπΈ' },
    { name: 'Russian Federation', flag: 'π·πΊ' },
  ];

  selectedFlag!: string;

  constructor() {}

  @Input()
  set country(country: string) {
    console.log(country);

    this.flags.forEach((val) => {
      if (val.name == country) {
        this.selectedFlag = val.flag;
      }
    });
  }

  ngOnInit(): void {}
}
