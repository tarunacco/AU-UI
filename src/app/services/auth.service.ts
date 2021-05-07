import { acceptedEmailExtensions } from './../../global constants/acceptedEmailExtensions';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase, { auth } from 'firebase';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public afAuth: AngularFireAuth, public router: Router) {
    this.intializeRedirectURL();
  }

  getToken(): string {
    let token = JSON.parse(localStorage.getItem('currentGoogleLoggedInUser'));
    if (token && 'firebaseIdToken' in token) {
      return token['firebaseIdToken'];
    }
    return null;
  }

  // Initializing the redirect logic
  intializeRedirectURL() {
    this.afAuth.auth
      .getRedirectResult()
      .then(async (result) => {
        console.log(this.afAuth.auth.currentUser);
        if (
          result.additionalUserInfo &&
          acceptedEmailExtensions.includes(
            result.additionalUserInfo.profile['hd']
          )
        ) {
          console.log('inside');
          localStorage.setItem('isSigningIn', 'false');
          await this.storeDetails(result.additionalUserInfo?.profile);
          this.router.navigate(['/logedin/batches']);
        }
        //  else {
        //   console.log('not inside');
        //   localStorage.setItem('isSigningIn', 'false');
        //   this.redirectToSamePage();
        // }
      })
      .catch((error) => {
        localStorage.setItem('isSigningIn', 'false');
        console.log(error);
        this.redirectToSamePage();
      });
  }

  redirectToSamePage() {
    this.router
      .navigateByUrl('/', { skipLocationChange: false })
      .then(() => this.router.navigate(['/welcome']));
  }

  // Sign in with Google
  GoogleAuth() {
    this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.auth.signInWithRedirect(provider);
  }

  async storeDetails(user) {
    if (user && acceptedEmailExtensions.includes(user.hd)) {
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
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      console.log('Invalid User/ Email Extension');
      this.signOut();
    }
  }

  signOut() {
    console.log('Signing Out');
    localStorage.setItem('isSigningIn', 'false');
    this.afAuth.auth.signOut().then((res) => {
      localStorage.removeItem('currentGoogleLoggedInUser');
    });
  }

  signOutAndRedirect() {
    localStorage.setItem('isSigningIn', 'false');
    this.afAuth.auth.signOut().then(async (res) => {
      await localStorage.removeItem('currentGoogleLoggedInUser');
      this.router.navigate(['/welcome']);
    });
  }

  checkLoginStatus() {
    if (this.afAuth.auth.currentUser) {
      return true;
    } else {
      return false;
    }
  }

  checkIfLoading() {
    return this.afAuth.auth.currentUser;
  }

  /**
   * user-> false and loading -> false
   * click
   * back -> user-> null and loading -> false
   * redirect -> user-> null and loading -> false
   *
   */
}
