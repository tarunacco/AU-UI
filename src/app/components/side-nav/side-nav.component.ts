<<<<<<< HEAD
import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
=======
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

>>>>>>> 938cc704d6ca9b10c33417fcd4ec25f8b39da19f

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
<<<<<<< HEAD
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) {}

=======
  styleUrls: ['./side-nav.component.css'],
})
export class SideNavComponent implements OnInit{
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  user = null;
  pic =" http://forums.asp.net/t/896760.aspx";
  isUserLoggedIn = false;
  
  constructor(private breakpointObserver: BreakpointObserver,  private router: Router) {
    
  }
  ngOnInit(): void {
    let tempUser = JSON.parse(
      localStorage.getItem('currentGoogleLoggedInUser')
    );
    
    if (tempUser) {
      this.user = tempUser;
       console.log(this.user.picture)
      this.pic=this.user.picture;
      this.isUserLoggedIn = true;
     
     
    }
  }
  logoutUser(){
       localStorage.removeItem('currentGoogleLoggedInUser')
       this.router.navigate(['']);
  }
  loginUser(){
    this.router.navigate(['']); 
    this.reloadComponent();
  }
  reloadComponent() {
    let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
    }
>>>>>>> 938cc704d6ca9b10c33417fcd4ec25f8b39da19f
}
