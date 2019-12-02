import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Movie } from '../models/Movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private apiKey = '1e4664d8';
  private apiUrl = 'http://omdbapi.com';

  constructor(
    private http: HttpClient
  ) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  getMovies(term: string): Observable<Movie[]> {
    if (!term.trim()) {
      return of ([]);
    }
    return this.http.get<Movie[]>(`${this.apiUrl}/?t=${term}&y=2019&apikey=${this.apiKey}`);
  }

  getTicket() {
    console.log('get ticket from service')
  }

}
