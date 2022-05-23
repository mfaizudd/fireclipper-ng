import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fireclipper-ng';
  items: MenuItem[] = [
    {
      label: 'Home',
      routerLink: '/',
    },
    // {
    //   label: 'Edit',
    //   icon: 'pi pi-fw pi-pencil',
    //   items: [
    //     { label: 'Delete', icon: 'pi pi-fw pi-trash' },
    //     { label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
    //   ]
    // }
  ]
  signedIn = false;

  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {
    auth.authState.subscribe(x => this.signedIn = x != null);
  }

  async signIn() {
    const response = await this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    if (response) {
      if (response.additionalUserInfo?.isNewUser) {
        this.firestore
          .collection('users')
          .doc(response.user?.uid)
          .set({
            displayName: response.user?.displayName,
            email: response.user?.email
          });
      }
    }
  }

  async signOut() {
    this.auth.signOut();
  }
}
