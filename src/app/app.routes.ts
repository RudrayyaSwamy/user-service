import { Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { SignupComponent } from './sign-up/sign-up.component';
import { BodyComponent } from './body/body.component';
import { authGuard } from './guard/auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
//import { authGuard } from './guard/auth.guard';
export const routes: Routes = [

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: SignInComponent},
  {
    path: 'home', component: HomeComponent, canActivate: [authGuard],
    children: [
      { path: '', component: BodyComponent },
      { path: 'empList', component: EmployeeListComponent }
    ]
  },
  { path: 'signup', component: SignupComponent },
  { path: 'signOut', component: SignInComponent },
  { path: '404', component: PageNotFoundComponent }, // Add the NotFoundComponent route
  { path: '**', redirectTo: '/404' }

];
