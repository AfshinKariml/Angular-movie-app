import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BannerComponent } from '../../core/components/banner/banner.component';
import { MovieCarouselComponent } from '../../shared/components/movie-carousel/movie-carousel.component';
import { CastCarouselComponent } from '../../shared/components/cast-carousel/cast-carousel.component';
import { Movie } from '../../core/models/movie.model';
import { MovieService } from '../../core/services/movie.service';
import { Subscription, forkJoin, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { CastMember } from '../../shared/components/cast-carousel/cast-carousel.component';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule, BannerComponent, MovieCarouselComponent, CastCarouselComponent],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.scss'
})
export default class MovieDetailComponent implements OnInit, OnDestroy {
  movie: Movie;
  similarMovies: Movie[] = [];
  castMembers: CastMember[] = [];
  trailerKey: string = '';
  private subscriptions = new Subscription();

  // Initialize with empty movie object to prevent template errors
  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {
    this.movie = {} as Movie;
  }

  // Initialize component and load data
  ngOnInit(): void {
    this.loadMovieData();
  }

  // Clean up subscriptions
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  // Load all movie-related data (details, videos, credits, recommendations)
  private loadMovieData(): void {
    const movieIdSub = this.route.params.pipe(
      switchMap(params => {
        const movieId = +params['id'];
        if (!movieId) {
          return of(null);
        }

        // Parallel API calls for movie data
        return forkJoin({
          details: this.movieService.getMovieDetails(movieId).pipe(
            catchError(error => {
              console.error('Error fetching movie details:', error);
              return of({} as Movie);
            })
          ),
          videos: this.movieService.getMovieVideos(movieId).pipe(
            catchError(error => {
              console.error('Error fetching movie videos:', error);
              return of([]);
            })
          ),
          credits: this.movieService.getMovieCredits(movieId).pipe(
            catchError(error => {
              console.error('Error fetching movie credits:', error);
              return of({ cast: [] });
            })
          ),
          recommendations: this.movieService.getMovieRecommendations(movieId).pipe(
            catchError(error => {
              console.error('Error fetching movie recommendations:', error);
              return of([]);
            })
          )
        });
      })
    ).subscribe(data => {
      if (data) {
        this.movie = data.details;
        this.setTrailerKey(data.videos);
        this.castMembers = data.credits.cast || [];
        this.similarMovies = data.recommendations || [];
      }
    });

    this.subscriptions.add(movieIdSub);
  }

  // Find and set trailer key from videos array
  private setTrailerKey(videos: any[]): void {
    if (!videos || videos.length === 0) {
      this.trailerKey = '';
      return;
    }

    // Try to find official trailer first
    const officialTrailer = videos.find(
      video => video.type === 'Trailer' && video.official === true
    );

    // Fallback to any trailer or first video
    const anyTrailer = videos.find(video => video.type === 'Trailer');
    const video = officialTrailer || anyTrailer || videos[0];
    
    this.trailerKey = video?.key || '';
  }

  // Convert minutes to "Xh Ym" format
  formatRuntime(minutes: number): string {
    if (!minutes) return '';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  }

  // Extract year from date string
  getYear(dateString: string): string {
    if (!dateString) return '';
    return new Date(dateString).getFullYear().toString();
  }
}