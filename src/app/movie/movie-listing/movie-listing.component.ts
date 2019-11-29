import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { TimelineMax, TweenMax } from 'gsap/all';

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

  @ViewChild('container', {static: true}) listingContainer: ElementRef;
  @ViewChild('header', {static: true}) listingHeader: ElementRef;
  @ViewChild('rating', {static: true}) listingRating: ElementRef;

  constructor() { }

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

	loadContainer(): void {
    let showContainer: TimelineMax = new TimelineMax();
    showContainer.fromTo(this.listingContainer.nativeElement, .3, 
      {
        y: 100,
      },  
      {
      scale: 1,
      y: 0,
      opacity: 1,
      delay: 0,
      ease: "back"
    });
    return showContainer;
  }

  loadDetails(): void {
    let showDetails: TimelineMax = new TimelineMax();
    showDetails
      .fromTo(this.listingHeader.nativeElement, .3, {
        y: 400,
      },
      {
        y: 0,
        delay: 0.1,
        ease: "back"
      })
      .fromTo(this.listingRating.nativeElement, .3, {
        y: 400,
      },
      {
        y: 0,
        ease: "back"
      });
    return showDetails;
  }

  // .addLabel("greyAndPink")
  // //start both of these animations at the same time, at the "greyAndPink" label.
  // .to(".grey", {duration: 1, x: 200, scale: 2, y: 20}, "greyAndPink") 
  // .to(".pink", {duration: 1, x: 200, rotation: 360}, "greyAndPink"); 
  

}
