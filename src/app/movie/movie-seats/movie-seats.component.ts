import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { TimelineMax } from 'gsap/all';

@Component({
  selector: 'app-movie-seats',
  templateUrl: './movie-seats.component.html',
  styleUrls: ['./movie-seats.component.scss']
})
export class MovieSeatsComponent implements OnInit {

  @ViewChild('container', {static: true}) seatsContainer: ElementRef;
  @ViewChild('content', {static: true}) seatsContent: ElementRef;

  @Output() seatsToggled = new EventEmitter<{reveal: boolean}>();

  constructor() { }

  ngOnInit() {
    this.loadContainer();
  }

  onCloseSeats() {
    this.hideContainer();
    console.log('close seats');
    setTimeout(() => {
      this.seatsToggled.emit({
        reveal: false
      })
    }, 300)
  }

  loadContainer(): void {
    let showContainer: TimelineMax = new TimelineMax();
    showContainer
      .to(this.seatsContainer.nativeElement, .6,
        {
          x: 0,
          y: 0,
          top: "50%",
          left: "50%",
          delay: .8,
          scale: 20,
          opacity: 1,
          ease: "power4"
        }, 0)
      .to(this.seatsContent.nativeElement, .6,
        {
          opacity: 1,
        })
    return showContainer;
  }

  hideContainer(): void {
    let hideContainer: TimelineMax = new TimelineMax();
    hideContainer
      .to(this.seatsContent.nativeElement, .1,
        {
          opacity: 0,
        }, 0)
      .to(this.seatsContainer.nativeElement, .2, 
        {
          scale: 0,
        })
    return hideContainer;
  }

}
