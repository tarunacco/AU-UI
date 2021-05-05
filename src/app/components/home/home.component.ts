import { globalURLs } from './../../../global constants/globalURLs';
import { Component, Input, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Typed from 'typed.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    public authService: AuthService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private router: Router
  ) {
    this.matIconRegistry.addSvgIcon(
      'logo',
      this.domSanitizer.bypassSecurityTrustResourceUrl(globalURLs.googleLogoURL)
    );

    this.matIconRegistry.addSvgIcon(
      'loader',
      this.domSanitizer.bypassSecurityTrustResourceUrl(globalURLs.loaderURL)
    );
  }
  // @Input()
  // public type;

  // @Input()
  // public onSignIn;
  str = [
    'Managing Batches',
    'Managing Trainers',
    'Managing Sessison/ Schedules',
    'Managing Students',
    'Managing Attendance',
    'Managing Assignments',
    'Google Classroom Integration',
    'Google Forms Integration',
  ];

  ngOnInit(): void {
    let tempUserDetails = localStorage.getItem('currentGoogleLoggedInUser');
    if (tempUserDetails) {
      this.loggedin();
      console.log("tokenID")
    }
    const options = {
      strings: this.str,
      typeSpeed: 30,
      startDelay: 0,
      backSpeed: 30,
      backDelay: 500,
      loop: true,
      cursorChar: '|',
      contentType: 'html',
    };

    const typed = new Typed('.element', options);

    let isSigningInAvailable = localStorage.getItem('isSigningIn');
    if(isSigningInAvailable){
      this.isSigningIn = isSigningInAvailable === 'true' ? true : false;
    }
  }

  isNotLoggedIn = true;
  isSigningIn = false;

  socialLogin() {
    this.isSigningIn = true;
    localStorage.setItem('isSigningIn', 'true');
    this.authService.GoogleAuth();
  }

  loggedin() {
    this.router.navigate(['/logedin/batches']);
  }

}
