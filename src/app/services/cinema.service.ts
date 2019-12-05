import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';

import { Cinema } from '../models/Cinema'
import { CINEMA } from '../mock-cinema';


@Injectable({
  providedIn: 'root'
})
export class CinemaService {

  constructor() { }

  getSeats(): Observable<Cinema[]> {
    return of (CINEMA);
  }

}
