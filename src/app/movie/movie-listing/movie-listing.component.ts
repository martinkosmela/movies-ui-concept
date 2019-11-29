import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TimelineMax } from 'gsap';

import { Movie } from '../../models/movie';

@Component({
  selector: 'app-movie-listing',
  templateUrl: './movie-listing.component.html',
  styleUrls: ['./movie-listing.component.scss']
})
export class MovieListingComponent implements OnInit {

  @Input() movie: Movie;
  @Input() genres: string[];

  @Output() detailsToggled = new EventEmitter<{reveal: boolean}>();

  constructor() { }

  ngOnInit() {
  }

  onCloseListing() {

    console.log('close');
    this.detailsToggled.emit({
      reveal: false
    })

  }

}
