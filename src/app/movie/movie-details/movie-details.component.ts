import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { Movie } from '../../models/movie';
// import { MovieService } from '../../services/movie.service';

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

  constructor(
    // private movieService: MovieService
  ) { }

  ngOnInit() {
    this.genreList = this.getGenres();
  }

  getGenres() {
    return this.movie.Genre.split(/[ ,]+/);
    // return ['crime', 'drama', 'thriller','comedy', 'adventure','comedy', 'adventure'];
  }

  showDetails() {
    event.stopPropagation();
    console.log('show movie details')
    this.detailsReveal = true;
    this.detailsToggled.emit({
      reveal: this.detailsReveal,
      movie: this.movie,
      genres: this.genreList
    })
  }

  // onGetTicket() {
  //   event.stopPropagation();
  //   this.movieService.getTicket();
  // }

}
