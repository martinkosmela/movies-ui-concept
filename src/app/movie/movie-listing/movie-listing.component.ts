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

  public get isAnimating(): boolean {
		return this._animating;
  }
  private _animating: boolean;

  constructor() { }

  ngOnInit() {
    this.loadContainer();
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
      delay: .2,
      ease: "back"
    });
    return showContainer;
  }
  

}
