import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClipboardsComponent } from './components/clipboards/clipboards.component';
import { HomeComponent } from './components/home/home.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'clipboards',
    component: ClipboardsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'clipboards/:query',
    component: ClipboardsComponent,
    canActivate: [AuthGuardService],
  },
  { path: 'login', component: LoginPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
