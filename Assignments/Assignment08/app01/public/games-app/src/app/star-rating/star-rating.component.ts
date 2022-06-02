import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css'],
})
export class StarRatingComponent implements OnInit {
  stars: boolean[] = [];

  constructor() {}

  ngOnInit(): void {}

  @Input()
  set rating(rating: number) {
    this.stars = new Array<boolean>(5).fill(false);
    for (let i = 0; i < rating; i++) {
      this.stars[i] = true;
    }
  }
}
