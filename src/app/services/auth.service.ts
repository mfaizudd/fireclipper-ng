import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public redirectUrl = '/';

  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
  ) { }

  async signIn() {
    const response = await this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    if (response) {
      this.firestore
        .collection('users')
        .doc(response.user?.uid)
        .set({
          displayName: response.user?.displayName,
          email: response.user?.email
        });
    }
  }

  async signOut() {
    this.auth.signOut();
  }

  getState() {
    return this.auth.authState;
  }
}
