import { Component, Input, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import firebase, { auth } from 'firebase';
import Typed from 'typed.js';
const googleLogoURL =
  'https://raw.githubusercontent.com/fireflysemantics/logo/master/Google.svg';
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
      this.domSanitizer.bypassSecurityTrustResourceUrl(googleLogoURL)
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
      console.log("tokanID")
      
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
  }
  isNotLoggedIn = true;

  async storeDetails(user) {
    await firebase
      .auth()
      .currentUser.getIdToken(/* forceRefresh */ true)
      .then(function (idToken) {
        let profile = user;
        profile['firebaseIdToken'] = idToken; 
        localStorage.setItem(
          'currentGoogleLoggedInUser',
          JSON.stringify(profile)
        );
       // console.log(profile);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  socialLogin() {
    this.authService.GoogleAuth().then(async (res) => {
      if (res.status === true) {
        await this.storeDetails(res.user);
        this.isNotLoggedIn = false;
        this.router.navigate(['/logedin/batches']);
      } else {
        console.log('Method Not Supported Yet');
      }
    });
  }

  loggedin() {
    this.router.navigate(['/logedin/batches']);
  }
  
}
