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

  columns: number[] = [1,2,3,4,5,6,7,8];
  rows: number[] = [1,2,3,4,5,6];

  unavailableSeats: string[] = ['A1','A2','A6','B6','C6','D6','E6','F6',];
  takenSeats: string[] = ['B1','B2','B3'];
  selectedSeats: {id: string, status: string}[] = [];

  seatsObject: {id: string, status: string}[] = [
    // {
    //   id: 'A1',
    //   status: 'unavailable',
    // },
    // {
    //   id: 'A2',
    //   status: 'available',
    // },
    // {
    //   id: 'A3',
    //   status: 'taken',
    // }
  ]

  constructor() { }

  ngOnInit() {
    this.loadContainer();
  }

  ngAfterViewInit() {
    this.generateSeatsGrid();
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

  generateSeatsGrid(): void {
    this.rows.forEach(row => {
      this.columns.forEach(column => {
        const rowStr = String.fromCharCode(96 + row).toUpperCase();
        const columnNum = column;
        const seatId = rowStr + columnNum;

        let seatStatus = this.checkSeatStatus(seatId);

        let seatObject = {
          id: seatId,
          status: seatStatus || 'available'
        }

        this.seatsObject.push(seatObject);
      })
    })
  }

  checkSeatStatus(id) {
    let status: string;

    this.takenSeats.filter(seat => {
      if(id === seat) {
        status = 'taken'
      }
    })
    this.unavailableSeats.filter(seat => {
      if(id === seat) {
        status = 'unavailable'
      }
    })
    return status;
  }

  selectSeat(seat) {
    if (seat.status != 'taken' && seat.status != 'unavailable' && seat.status == 'available') {
      this.seatsObject.filter(s => {
        if (s.id === seat.id) {
          s.status = 'selected';
          this.selectedSeats.push(s);
        }
      })
    } else if (seat.status == 'selected') {
      this.seatsObject.filter(s => {
        if (s.id === seat.id) {
          s.status = 'available';
        }
      })
      this.selectedSeats = this.selectedSeats.filter((selectedSeat) => {
        return selectedSeat != seat;
      })
    }
  }

  

}
