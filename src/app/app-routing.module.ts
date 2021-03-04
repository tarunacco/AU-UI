import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BatchdetailsComponent } from './components/batchdetails/batchdetails.component';
import { BatchesComponent } from './components/batches/batches.component';

const routes: Routes = [
  {
    path: 'batches',
    component: BatchesComponent,
  },

  {
    path: 'batch/:batchId',
    component: BatchdetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
