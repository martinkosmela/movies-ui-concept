import { Component, OnInit, ViewChild } from '@angular/core';
// import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'ngx-useful-swiper';

import { Movie } from '../models/Movie';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.scss']
})
export class ShowcaseComponent implements OnInit {

  showcaseMovies: string[] = ['good_boys', 'joker', 'the_hustle'];
  moviesList: Array<Movie[]> = [];
  detailsRevealed: boolean = false;
  selectedMovie: Movie;
  selectedMovieGenres: string[];
  chooseSeatsRevealed: boolean = false;

  @ViewChild('showcaseMain', {static: true}) showcaseMain?: SwiperComponent;
  @ViewChild('showcaseThumbs', {static: true}) showcaseThumbs?: SwiperComponent;
  
  showcaseMainConfig: any = {
    initialSlide: 1,
    nested: true,
    controller: {
      inverse: true
    },
    slidesPerView: 1.3,
    centeredSlides: true,
    spaceBetween: 20,
    observer: true,
    on: {
      click: () => {
        // this.showcaseMain.swiper.update();
      }
    }
  };

  showcaseThumbsConfig: any = {
    initialSlide: 1,
    watchSlidesVisibility: true,
    touchRatio: 0,
    preloadImages: false,
    slidesPerView: 1,
    lazy: true,
    observer: true,
  };

  constructor(
    private movieService: MovieService
  ) { }

  ngAfterViewInit() {
    this.showcaseMain.swiper.controller.control = this.showcaseThumbs.swiper;
    this.showcaseThumbs.swiper.controller.control = this.showcaseMain.swiper;
  }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.showcaseMovies.forEach((item) => {
      this.movieService.getMovies(item)
        .subscribe(movie => this.moviesList.push(movie));
    })
  }

  onDetailsToggled(detailsToggle: {reveal: boolean, movie: Movie, genres: string[]}) {
    this.detailsRevealed = detailsToggle.reveal;
    this.selectedMovie = detailsToggle.movie;
    this.selectedMovieGenres = detailsToggle.genres
  }

  onChooseSeatsToggled(chooseSeatsToggled: {reveal: boolean}) {
    this.chooseSeatsRevealed = chooseSeatsToggled.reveal;
    console.log('complete from parent', this.chooseSeatsRevealed)
  }

}
