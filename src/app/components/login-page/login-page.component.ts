import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  signedIn = false;

  constructor(
    private auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.auth.getState().subscribe(x => this.signedIn = x != null);
  }

  signIn() {
    this.auth.signIn();
  }

}
