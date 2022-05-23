import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from './services/auth.service';

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
    {
      label: 'Clipboards',
      routerLink: '/clipboards'
    }
  ]
  signedIn = false;

  constructor(
    private auth: AuthService,
  ) {
    auth.getState().subscribe(x => this.signedIn = x != null);
  }

  async signIn() {
    this.auth.signIn()
  }

  async signOut() {
    this.auth.signOut();
  }
}
