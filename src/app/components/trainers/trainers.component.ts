import { Component, OnInit, AfterViewInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TrainerFormComponent } from '../trainer-form/trainer-form.component';
import { MatSort } from '@angular/material/sort';
import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { trainerSchema } from './trainerSchema';


@Component({
  selector: 'app-trainers',
  templateUrl: './trainers.component.html',
  styleUrls: ['./trainers.component.css'],
})
export class TrainersComponent implements OnInit{


  public dataSource;
  isLoading= true;
  public displayedColumns: string[] = [
    'TrainerName',
    'BusinessUnit',
    'SkypeId',
    'EmailId',
    'ReportingManagerEmail',
    'Actions'
  ];
  //dataSource: any[] = [];

  constructor(private dialog: MatDialog, private http: HttpClient) {}

  ngOnInit(): void {
    this.getSessions();
  }

  ngAfterViewInit(): void {
    //this.dataSource.sort = this.sort;
  }

  getSessions() {
    this.http.get<any[]>('/api/trainer/all').subscribe((trainer)=> {
      //this.dataSource.data = trainer;
      this.isLoading = false
      this.dataSource = new MatTableDataSource(trainer);
    });
    console.log(this.dataSource);
  }

  openNewTrainerDialog(trainer_) {
    let dialogRef: MatDialogRef<TrainerFormComponent>;
    if (trainer_) {
      dialogRef = this.dialog.open(TrainerFormComponent, {
        data: trainer_,
      });
    } else {
      dialogRef = this.dialog.open(TrainerFormComponent);
    }
    dialogRef.afterClosed().subscribe(() => this.getSessions());
    // this.dialog.open(BatchformComponent).afterClosed().subscribe();
  }

  openSkype(skypeId) {
    window.open(`skype:${skypeId}?chat`);
  }


}
