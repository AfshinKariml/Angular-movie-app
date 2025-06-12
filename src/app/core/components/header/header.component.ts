import { Component, inject, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../services/local-storage.service';
import { environment } from '../../../../environments/environment.development';
import { User } from '../../models/user.model';
import { NavListModel } from '../../models/navlist.model';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  // Injecting necessary services
  localStrService = inject(LocalStorageService);
  router = inject(Router);

  // User data initialization
  username: string = "";
  userImg: string = "";
  
  // Navigation state variables
  isMenuOpen: boolean = false; // To track mobile menu open state
  profileMenuOpen: boolean = false; // To track profile menu open state
  screenIsSmall: boolean = false; // To track if screen is small (for responsiveness)
  
  // Router subscription to close menus on route change
  private routerSubscription: Subscription | null = null;

  // List of navigation items for the header
  navList: NavListModel[] = [
    { title: "Home", link: "/browse" }, 
    { title: "TV Shows", link: "/movie-list/tv-shows" }, 
    { title: "Movies", link: "/movie-list/movies" },
    { title: "New & Popular", link: "/movie-list/new-popular" }
  ];

  // Component initialization
  ngOnInit() {
    // Load user data from local storage
    const userData = this.localStrService.getItem(environment.AUTH_TOKEN_KEY) as User;
    this.username = userData?.name || 'Guest'; // Default to 'Guest' if no user data
    this.userImg = userData?.photoUrl; // Get user profile image

    // Check screen size when component initializes
    this.onResize();

    // Close side and profile menus when route changes
    this.routerSubscription = this.router.events.subscribe(() => {
      this.isMenuOpen = false;
      this.profileMenuOpen = false;
    });
  }

  // Cleanup subscriptions when component is destroyed
  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe(); // Unsubscribe to prevent memory leaks
    }
  }

  /**
   * Toggle the mobile side navigation menu
   */
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen; // Toggle the menu state

    // Close profile menu when mobile menu is opened
    if (this.isMenuOpen) {
      this.profileMenuOpen = false;
    }
    
    // Prevent body scrolling when mobile menu is open
    document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
  }

  /**
   * Close the mobile side navigation menu
   */
  closeMenu() {
    this.isMenuOpen = false; // Close the menu
    document.body.style.overflow = ''; // Restore body scroll
  }

  /**
   * Toggle the profile dropdown menu
   */
  toggleProfileMenu() {
    this.profileMenuOpen = !this.profileMenuOpen; // Toggle profile menu state
  }

  /**
   * Listen for window resize and adjust screen size tracking
   */
  @HostListener('window:resize', [])
  onResize() {
    this.screenIsSmall = window.innerWidth < 768; // Check if screen width is smaller than 768px

    // Automatically close mobile menu on larger screens
    if (!this.screenIsSmall) {
      this.isMenuOpen = false;
      document.body.style.overflow = ''; // Restore body scroll
    }
  }

  /**
   * Close profile menu when clicking outside of the menu
   */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    
    // Close profile menu if click is outside the menu
    if (!target.closest('.group') && this.profileMenuOpen) {
      this.profileMenuOpen = false;
    }
  }

  /**
   * Handle user sign-out action
   */
  signOut(event: Event) {
    if (event) {
      event.preventDefault(); // Prevent default behavior of event
    }

    console.log('Signing out...');
    // Logic for signing out (to be implemented)
    // this.localStrService.removeItem(environment.AUTH_TOKEN_KEY); // Remove token from localStorage
    // this.router.navigate(['/login']); // Redirect to login page
  }
}
