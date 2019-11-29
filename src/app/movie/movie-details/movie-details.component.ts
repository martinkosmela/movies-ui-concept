import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { Movie } from '../../models/movie';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  @Input() movie: Movie;
  genreList: string[] = [];
  @Input() detailsReveal: boolean = false;

  @Output() detailsToggled = new EventEmitter<{reveal: boolean, movie: Movie, genres: string[]}>();

  constructor() { }

  ngOnInit() {
    this.genreList = this.getGenres();
  }

  getGenres() {
    return this.movie.Genre.split(/[ ,]+/);
    // return ['crime', 'drama', 'thriller','comedy', 'adventure'];
  }

  showDetails() {
    console.log('show movie details')
    this.detailsReveal = true;
    this.detailsToggled.emit({
      reveal: this.detailsReveal,
      movie: this.movie,
      genres: this.genreList
    })
  }

  getTicket() {
    event.stopPropagation();
    console.log('buy ticket')
  }

}
