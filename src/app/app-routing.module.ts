import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BatchesComponent } from './components/batches/batches.component';

const routes: Routes = [
  {
    path: 'batches',
    component: BatchesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
