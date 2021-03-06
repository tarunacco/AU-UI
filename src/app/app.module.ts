import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BatchesComponent } from './components/batches/batches.component';
import { BatchformComponent } from './components/batchform/batchform.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { MatTabsModule } from '@angular/material/tabs';
import { BatchdetailsComponent } from './components/batchdetails/batchdetails.component';
import { SessionComponent } from './components/session/session.component';
import { SessionformComponent } from './components/sessionform/sessionform.component';
import { StudentsComponent } from './components/students/students.component';
import { StudentformComponent } from './components/studentform/studentform.component';
import { TrainersComponent } from './components/trainers/trainers.component';
import { TrainerFormComponent } from './components/trainer-form/trainer-form.component';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import {MatSortModule} from '@angular/material/sort';

@NgModule({
  declarations: [
    AppComponent,
    BatchesComponent,
    BatchformComponent,
    SideNavComponent,
    BatchdetailsComponent,
    SessionComponent,
    SessionformComponent,
    StudentsComponent,
    StudentformComponent,
    TrainersComponent,
    TrainerFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatSelectModule,
    MatSortModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSidenavModule,
    LayoutModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FlexLayoutModule,
    HttpClientModule,
    MatTabsModule,
    MatSortModule,


  ],
  exports: [MatTabsModule],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
