
import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  Input,
  ViewChild,
} from '@angular/core';
import Swiper from 'swiper';
import { register } from 'swiper/element/bundle';
import { Movie } from '../../../core/models/movie.model';
import { Router } from '@angular/router';

// Register Swiper web components
register();

@Component({
  selector: 'app-movie-carousel',
  standalone: true,
  imports: [],
  templateUrl: './movie-carousel.component.html',
  styleUrl: './movie-carousel.component.scss',
})
export class MovieCarouselComponent implements AfterViewInit {
  @ViewChild('swiperContainer') swiperContainer!: ElementRef; // Swiper container reference
  @Input() title: string = 'Movie Carousel'; // Carousel title
  @Input() movies: Movie[] = []; // Array of movies to display

  router = inject(Router); // Router for navigation
  private swiper: Swiper | null = null; // Swiper instance

  // Initialize Swiper after view renders
  ngAfterViewInit() {
    setTimeout(() => this.initSwiper(), 0);
  }

  // Configure Swiper carousel
  initSwiper() {
    if (!this.swiperContainer) {
      console.error('Swiper container not found');
      return null;
    }

    this.swiper = new Swiper(this.swiperContainer.nativeElement, {
      slidesPerView: 'auto', // Auto-adjust visible slides
      spaceBetween: 15, // Space between slides
      loop: true, // Infinite loop
      grabCursor: true, // Grab cursor style
      navigation: { // Navigation arrows
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: { // Pagination dots
        el: '.swiper-pagination',
        clickable: true,
      },
      // Responsive breakpoints
      breakpoints: {
        320: { slidesPerView: 1, spaceBetween: 10 }, // Mobile
        480: { slidesPerView: 2, spaceBetween: 10 }, // Small tablets
        768: { slidesPerView: 3, spaceBetween: 15 }, // Tablets
        1024: { slidesPerView: 4, spaceBetween: 15 }, // Laptops
        1280: { slidesPerView: 5, spaceBetween: 20 }, // Desktops
      },
    });

    return this.swiper;
  }

  // Navigate to movie details page
  navigateToMovieDetail(id: number) {
    if (id) this.router.navigate(['/movie', id]);
  }
}