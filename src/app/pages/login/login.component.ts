import {
  GoogleLoginProvider,
  GoogleSigninButtonModule,
  SocialAuthService,
  SocialUser,
} from '@abacritt/angularx-social-login';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-login',
  imports: [GoogleSigninButtonModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export default class LoginComponent implements OnInit {
  // User data from Google login
  user: SocialUser | null = null;

  // Injected services
  authService = inject(SocialAuthService);
  localstrService = inject(LocalStorageService);
  router = inject(Router);

  ngOnInit(): void {
    // Subscribe to auth state to get user data after login
    this.authService.authState.subscribe((user) => {
      this.user = user;
    });

    // Initialize Google login options on component init
    this.authService.initState.subscribe(() => {
      const googleLoginOptions = {
        prompt: 'select_account',
        ux_mode: 'popup',
        disableOAth2: false,
        scope: 'email profile',
      };

      // Check if the user is logged in, and store user data in local storage
      this.authService.authState.subscribe((user) => {
        this.user = user;
        if (user) {
          this.localstrService.setItem(environment.AUTH_TOKEN_KEY, { ...user });

          // Redirect to browse page after successful login
          this.router.navigate(['browse']);
        }
      });
    });
  }

  // Google sign-in method
  async signInWithGoogle() {
    const response = await this.authService.signIn(
      GoogleLoginProvider.PROVIDER_ID
    );
    console.log(response);
  }

  // Google sign-out method
  signOut(): void {
    this.authService.signOut();
  }
}
