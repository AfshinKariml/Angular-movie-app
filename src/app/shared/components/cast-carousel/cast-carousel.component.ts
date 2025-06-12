
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
import { Router } from '@angular/router';

// Interface defining structure of cast member data
export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string;
  popularity: number;
}

// Register Swiper web components
register();

@Component({
  selector: 'app-cast-carousel',
  standalone: true,
  imports: [],
  templateUrl: './cast-carousel.component.html',
  styleUrl: './cast-carousel.component.scss'
})
export class CastCarouselComponent implements AfterViewInit {
  // Reference to Swiper container element
  @ViewChild('swiperContainer') swiperContainer!: ElementRef;
  
  // Input property for carousel title
  @Input() title: string = 'Cast';
  
  // Input property for array of cast members
  @Input() cast: CastMember[] = [];

  // Router service for navigation
  router = inject(Router);

  // Swiper instance variable
  private swiper: Swiper | null = null;

  // Initialize Swiper after view is rendered
  ngAfterViewInit() {
    setTimeout(() => {
      this.initSwiper();
    }, 0);
  }

  // Initialize and configure Swiper carousel
  initSwiper() {
    if (!this.swiperContainer) {
      console.error('Swiper container not found');
      return null;
    }

    this.swiper = new Swiper(this.swiperContainer.nativeElement, {
      slidesPerView: 'auto',
      spaceBetween: 15,
      loop: true,
      grabCursor: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      // Responsive breakpoints configuration
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        480: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 15,
        },
        1280: {
          slidesPerView: 5,
          spaceBetween: 20,
        },
      },
    });

    return this.swiper;
  }

  // Navigate to cast member details page
  navigateToCastDetail(id: number) {
    if (id) {
      this.router.navigate(['/person', id]);
    }
  }
}