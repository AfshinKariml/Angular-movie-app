import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { BannerComponent } from '../../core/components/banner/banner.component';
import { MovieCarouselComponent } from '../../shared/components/movie-carousel/movie-carousel.component';
import { MovieService } from '../../core/services/movie.service';
import { Movie } from '../../core/models/movie.model';
import { forkJoin, map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [BannerComponent, MovieCarouselComponent, AsyncPipe],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.scss',
  encapsulation: ViewEncapsulation.None
})
export default class BrowseComponent implements OnInit {
  // Observable to hold banner and video details
  bannerDetail = new Observable<Movie>();
  bannerVideo = new Observable<any>();

  // Injecting MovieService to fetch movie data
  private movieService = inject(MovieService);

  // Collections to hold different types of movies
  trendingMovies: Movie[] = [];
  tvShows: Movie[] = [];
  popularMovies: Movie[] = [];
  nowPlayingMovies: Movie[] = [];
  topRatedMovies: Movie[] = [];
  upcomingMovies: Movie[] = [];

  // API calls to fetch different movie collections
  private sources = [
    this.movieService.getTrendingMovies(),
    this.movieService.getTrendingTVShows(),
    this.movieService.getPopularMovies(),
    this.movieService.getNowPlayingMovies(),
    this.movieService.getTopRatedMovies(),
    this.movieService.getUpcomingMovies()
  ];

  ngOnInit(): void {
    // Fetch all movie data concurrently using forkJoin
    forkJoin(this.sources).pipe(
      map(([trendingMovies, tvShows, popularMovies, nowPlayingMovies, topRatedMovies, upcomingMovies]) => {
        // Set banner details from the first trending movie
        if (trendingMovies?.length > 0) {
          this.bannerDetail = this.movieService.getMovieDetails(trendingMovies[0].id);
          this.bannerVideo = this.movieService.getBannerVideo(trendingMovies[0].id);
        }
        
        // Return all movie collections to be assigned
        return { trendingMovies, tvShows, popularMovies, nowPlayingMovies, topRatedMovies, upcomingMovies };
      })
    ).subscribe({
      next: (result) => {
        // Assign fetched data to component properties
        this.trendingMovies = result.trendingMovies;
        this.tvShows = result.tvShows;
        this.popularMovies = result.popularMovies;
        this.nowPlayingMovies = result.nowPlayingMovies;
        this.topRatedMovies = result.topRatedMovies;
        this.upcomingMovies = result.upcomingMovies;
      },
      error: (error) => {
        // Log errors if any during data fetching
        console.error('Error loading movie data:', error);
      }
    });
  }
}
