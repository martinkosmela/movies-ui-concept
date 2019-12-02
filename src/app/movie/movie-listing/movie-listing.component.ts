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
  @ViewChild('details', {static: true}) listingDetails: ElementRef;
  @ViewChild('btn', {static: true}) listingBtn: ElementRef;

  constructor(
    private movieService: MovieService
  ) { }

  ngOnInit() {
    this.loadDetails();
  }

  onCloseListing() {
    this.hideContainer();
    console.log('close');
    setTimeout(() => {
      this.detailsToggled.emit({
        reveal: false
      })
    }, 300)
  }

  onGetTicket() {
    this.movieService.getTicket();
  }

	hideContainer(): void {
    let hideContainer: TimelineMax = new TimelineMax();
    hideContainer.to(this.listingContainer.nativeElement, .3,
      {
        scaleX: 0.7,
        opacity: 0,
        ease: "power4"
      })
    return hideContainer;
  }

  loadDetails(): void {
    let showDetails: TimelineMax = new TimelineMax();
    showDetails
    .to(this.listingContainer.nativeElement, .6,
        {
        scale: 1,
        opacity: 1,
        ease: "back"
      }, 0)
      .add("start", .3)
      .fromTo(this.listingHeader.nativeElement, .2, {
        y: 400,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        ease: "back"
      }, "start")
      .fromTo(this.listingGenre.nativeElement, .2, {
        y: 400,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        ease: "back"
      }, "start")
      .fromTo(this.listingDetails.nativeElement, .2, {
        opacity: 0,
      },
      {
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
