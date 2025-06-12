import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent implements OnChanges {
  
  // Input props
  @Input() bannerTitle: string = '';
  @Input() bannerOverview: string = '';
  @Input() key: string = '';

  // Sanitized video URL
  videoUrl: SafeResourceUrl;

  // DOM sanitizer
  private sanitizer = inject(DomSanitizer);

  // Constructor setup
  constructor() {
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl('');
  }

  // Update video on input change
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['key'] && this.key) {
      const youtubeUrl = `https://www.youtube.com/embed/${this.key}?autoplay=1&mute=1&controls=0&loop=1&playlist=${this.key}`;
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(youtubeUrl);
    }
  }
}
