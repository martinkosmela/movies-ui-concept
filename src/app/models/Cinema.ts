export class Cinema { 
  id: number;
  showId: string;
  maxSeatsInRow: number;
  rows: number;
  roomName: string;
  room: {
      rowLabel: string;
      rowSeats: {
        seatId: number;
        seatNumber: number;
        positionRow: number;
        positionColumn: number;
        price: number;
        taken: boolean;
        available: boolean;
        selected: boolean;
      } []
  } []
};