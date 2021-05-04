import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate{
constructor(private authService:AuthService){

}
  
  canActivate() {
    if(localStorage.getItem("currentGoogleLoggedInUser")){
      console.log(true)
      return true;
    }
    else{
      return false;
    }
  }
}