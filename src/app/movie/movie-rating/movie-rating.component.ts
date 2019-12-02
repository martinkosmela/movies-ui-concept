import { Component, OnInit, Input, ViewChildren, ElementRef, QueryList, ViewChild } from '@angular/core';

import { TimelineMax } from 'gsap/all';

@Component({
  selector: 'app-movie-rating',
  templateUrl: './movie-rating.component.html',
  styleUrls: ['./movie-rating.component.scss']
})
export class MovieRatingComponent implements OnInit {

  @Input() rating: number;
  @Input() parent: string;
  totalRating: number = 10;
  starsRating: string = '';

  @ViewChildren('star') ratingStars: QueryList<ElementRef>;
  @ViewChild('starsInner', {static: true}) ratingStarsInner: ElementRef;

  constructor() { }

  ngOnInit() {
    this.getStars();
  }

  ngAfterViewInit() {
    if (this.parent == 'listing') {
      this.ratingStars.forEach( (star, index) => {
        this.loadRating(star, index+1);
      });
    }
  }

  getStars() {
    const starPercentage = (this.rating / this.totalRating) * 100;
    const starPercentageRounded = `${(Math.round(starPercentage / 10) * 10)}%`;
    this.starsRating = starPercentageRounded;
  }

  loadRating(star, index): void {
    let showRating: TimelineMax = new TimelineMax();
    showRating.fromTo(star.nativeElement, index/5,
      {
        y: 300,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        ease: "back"
    }, 0)
    .add("start", .6)
    showRating.fromTo(this.ratingStarsInner.nativeElement, 1,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        ease: "expo"
      }, "start")
    return showRating;
  }


}
