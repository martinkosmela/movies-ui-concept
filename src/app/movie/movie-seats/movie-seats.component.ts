import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output, Input } from '@angular/core';
import { TimelineMax } from 'gsap/all';

import {Cinema} from '../../models/Cinema';
import {CinemaService} from '../../services/cinema.service';

@Component({
  selector: 'app-movie-seats',
  templateUrl: './movie-seats.component.html',
  styleUrls: ['./movie-seats.component.scss']
})
export class MovieSeatsComponent implements OnInit {

  @ViewChild('container', {static: true}) seatsContainer: ElementRef;
  @ViewChild('content', {static: true}) seatsContent: ElementRef;

  @Output() seatsToggled = new EventEmitter<{reveal: boolean}>();

  @Input() movieId: string;

  roomSeats: Cinema;
  selectedTime: number = 0;

  constructor(
    private cinemaService: CinemaService,
  ) { }

  ngOnInit() {
    this.loadContainer();
    this.fetchSeats(this.movieId);
  }

  ngAfterViewInit() {
  }

  fetchSeats(showId: string): void {
    this.cinemaService.getSeats()
      .subscribe(cinema => {
        this.roomSeats = cinema.find(c => 
          c.showId === showId
        )
      });

    console.log(this.roomSeats)
  }

  onCloseSeats(): void {
    this.asyncHideContainer().then(() => {
        this.seatsToggled.emit({
          reveal: false
        })
      },
    );
  }

  loadContainer(): TimelineMax {
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

  asyncHideContainer(): TimelineMax {
    return new Promise<boolean>((resolve) => {
      let hideContainer: TimelineMax = new TimelineMax({
        onComplete: () => { 
          resolve(true)
        }
      });
      hideContainer
      .to(this.seatsContent.nativeElement, .1,
        {
          opacity: 0
        }, 0)
      .to(this.seatsContainer.nativeElement, .3, 
        {
          scale: 0 
        });
    });
  }

  generateSeatClass(seat) {
    if (seat.available === true) {
      return 'movie-seats__seat--available';
    } else if (seat.taken === true) {
      return 'movie-seats__seat--taken';
    } else if (seat.selected === true) {
      return 'movie-seats__seat--selected';
    } else {
      return 'movie-seats__seat--unavailable';
    }
  }

  selectSeat(seat) {
    if (seat.seatNumber != -1 && !seat.taken) {
      seat.available = !seat.available;
      seat.selected = !seat.selected;
    }
  }

  selectTime(id) {
    this.selectedTime = id;
  }

}
