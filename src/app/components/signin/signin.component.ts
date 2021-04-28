import { Component, Input, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

const googleLogoURL =
  'https://raw.githubusercontent.com/fireflysemantics/logo/master/Google.svg';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {

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
  @Input()
  public type;

  @Input()
  public onSignIn;

  socialLogin() {
    if (this.type === 'google') {
      this.authService.GoogleAuth().then((res) => {
        if (res.status === true) {
          this.onSignIn(res.user);
            this.router.navigate(['']); 
        }
      });
    } else {
      console.log('Method Not Supported Yet');
    }
  }

  ngOnInit(): void {}
}
function goToItems() {
  throw new Error('Function not implemented.');
}

