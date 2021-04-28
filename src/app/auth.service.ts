import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import firebase, { auth } from 'firebase';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public getToken(): string {
    let x=JSON.parse(localStorage.getItem('currentGoogleLoggedInUser'));
    return x['firebaseIdToken'];
  }
  constructor(public afAuth: AngularFireAuth) {}

  // isUserLoggedin(){
  //   if(localStorage.getItem("currentGoogleLoggedInUser")){
  //    return true;

  //   }
  //    else{
  //    return false;
  //    }
  // }
  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.auth
      .signInWithPopup(provider)
      .then((result) => {
        return {
          status: true,
          user: result.additionalUserInfo.profile,
        };
      })
      .catch((error) => {
        console.log(error);
        return {
          status: false,
          user: undefined,
        };
      });
  }
}
