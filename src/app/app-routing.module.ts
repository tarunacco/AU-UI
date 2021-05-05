import { HomeComponent } from './components/home/home.component';
import { TrainersComponent } from './components/trainers/trainers.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BatchdetailsComponent } from './components/batchdetails/batchdetails.component';
import { BatchesComponent } from './components/batches/batches.component';
import { SigninComponent } from './components/signin/signin.component';
import { AuthGaurdService } from 'src/app/services/auth-gaurd.service';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { FisrtHomeComponent } from './components/fisrt-home/fisrt-home.component';
import { SecondHomeComponent } from './components/second-home/second-home.component';

const routes: Routes = [
  {
    path: 'welcome',
    component: FisrtHomeComponent,
  },
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
  },
  {
    path: 'logedin',
    component: SecondHomeComponent,
    canActivate: [AuthGaurdService],
    children: [
      {
        path: 'batches',
        component: BatchesComponent,
      },
      {
        path: 'home',
        component: HomeComponent,
      },

      {
        path: 'batch/:batchId',
        component: BatchdetailsComponent,
      },

      {
        path: 'trainers',
        component: TrainersComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo:'/welcome'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
