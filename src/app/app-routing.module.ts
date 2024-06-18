import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './modules/components/landing-page/landing-page.component';
import { LoginPageComponent } from './modules/components/login-page/login-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'vitraya/sign-up',
    pathMatch: 'full',
  },
  {
    path: 'vitraya/sign-up',
    component: LoginPageComponent,
  },
  {
    path: 'vitraya/landing-page',
    component: LandingPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
