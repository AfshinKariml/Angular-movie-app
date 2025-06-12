import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
 import { isPlatformBrowser } from '@angular/common';
 
 // Service to manage localStorage operations, checks if the platform is a browser
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Check if the platform is a browser
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  // Set item in localStorage
  setItem(key: string, value: any): void {
    if (this.isBrowser) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error('Error saving to localStorage', error);
      }
    }
  }

  // Get item from localStorage
  getItem<T>(key: string): T | null {
    if (this.isBrowser) {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
      } catch (error) {
        console.error('Error reading from localStorage', error);
        return null;
      }
    }
    return null;
  }

  // Remove item from localStorage
  removeItem(key: string): void {
    if (this.isBrowser) {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.error('Error removing from localStorage', error);
      }
    }
  }

  // Clear all items in localStorage
  clear(): void {
    if (this.isBrowser) {
      try {
        localStorage.clear();
      } catch (error) {
        console.error('Error clearing localStorage', error);
      }
    }
  }

  // Check if a key exists in localStorage
  hasKey(key: string): boolean {
    if (this.isBrowser) {
      return localStorage.getItem(key) !== null;
    }
    return false;
  }
}
