import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShowcaseComponent } from './showcase/showcase.component';
import { MovieDetailsComponent } from './movie/movie-details/movie-details.component';
import { MovieRatingComponent } from './movie/movie-rating/movie-rating.component';
import { MovieListingComponent } from './movie/movie-listing/movie-listing.component';

@NgModule({
  declarations: [
    AppComponent,
    ShowcaseComponent,
    MovieDetailsComponent,
    MovieRatingComponent,
    MovieListingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxUsefulSwiperModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
