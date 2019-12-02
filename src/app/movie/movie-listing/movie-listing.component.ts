import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, ViewChildren } from '@angular/core';
import { TimelineMax } from 'gsap/all';

import { Movie } from '../../models/movie';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-listing',
  templateUrl: './movie-listing.component.html',
  styleUrls: ['./movie-listing.component.scss']
})
export class MovieListingComponent implements OnInit {

  @Input() movie: Movie;
  @Input() genres: string[];

  @Output() detailsToggled = new EventEmitter<{reveal: boolean}>();

  @ViewChild('container', {static: true}) listingContainer: ElementRef;
  @ViewChild('header', {static: true}) listingHeader: ElementRef;
  @ViewChild('genre', {static: true}) listingGenre: ElementRef;
  @ViewChild('btn', {static: true}) listingBtn: ElementRef;

  constructor(
    private movieService: MovieService
  ) { }

  ngOnInit() {
    this.loadContainer();
    this.loadDetails();
  }

  onCloseListing() {
    console.log('close');
    this.detailsToggled.emit({
      reveal: false
    })
  }

  onGetTicket() {
    this.movieService.getTicket();
  }

	loadContainer(): void {
    let showContainer: TimelineMax = new TimelineMax();
    showContainer.to(this.listingContainer.nativeElement, .6,
      {
      scale: 1,
      opacity: 1,
      delay: 0,
      ease: "back"
    })
    return showContainer;
  }

  loadDetails(): void {
    let showDetails: TimelineMax = new TimelineMax();
    showDetails
      .fromTo(this.listingHeader.nativeElement, .2, {
        y: 400,
        opacity: 0,
      },
      {
        y: 0,
        delay: 0.3,
        opacity: 1,
        ease: "back"
      }, 0)
      .add("start", 0.3)
      .fromTo(this.listingGenre.nativeElement, .2, {
        y: 400,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        ease: "back"
      }, "start")
      .fromTo(this.listingBtn.nativeElement, .2, {
        scaleX: .8,
      },
      {
        scaleX: 1,
        ease: "back"
      }, "start");
    return showDetails;
  }
  

}
