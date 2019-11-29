import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-movie-rating',
  templateUrl: './movie-rating.component.html',
  styleUrls: ['./movie-rating.component.scss']
})
export class MovieRatingComponent implements OnInit {

  @Input() rating: number;
  totalRating: number = 10;
  starsRating: string = '';

  constructor() { }

  ngOnInit() {
    this.getStars();
  }

  getStars() {
    const starPercentage = (this.rating / this.totalRating) * 100;
    const starPercentageRounded = `${(Math.round(starPercentage / 10) * 10)}%`;
    this.starsRating = starPercentageRounded;
  }

}
