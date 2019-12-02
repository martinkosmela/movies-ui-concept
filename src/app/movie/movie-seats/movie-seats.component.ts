import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TimelineMax } from 'gsap/all';

@Component({
  selector: 'app-movie-seats',
  templateUrl: './movie-seats.component.html',
  styleUrls: ['./movie-seats.component.scss']
})
export class MovieSeatsComponent implements OnInit {

  @ViewChild('container', {static: true}) seatsContainer: ElementRef;

  constructor() { }

  ngOnInit() {
    this.loadContainer();
  }

  loadContainer(): void {
    let showContainer: TimelineMax = new TimelineMax();
    showContainer.to(this.seatsContainer.nativeElement, .3,
      {
        opacity: 1,
        ease: "power4"
      })
    return showContainer;
  }

}
