import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import firebase, { auth } from 'firebase';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  public getToken(): string {
    let token = JSON.parse(localStorage.getItem('currentGoogleLoggedInUser'));
    return token['firebaseIdToken'];
  }
  constructor(public afAuth: AngularFireAuth) {}
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
