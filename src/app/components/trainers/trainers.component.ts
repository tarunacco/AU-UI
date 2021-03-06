import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { TrainerFormComponent } from '../trainer-form/trainer-form.component';

@Component({
  selector: 'app-trainers',
  templateUrl: './trainers.component.html',
  styleUrls: ['./trainers.component.css'],
})
export class TrainersComponent implements OnInit {
  constructor(private dialog: MatDialog, private http: HttpClient) {}

  displayedColumns: string[] = [
    'Trainer Name',
    'Skype Id',
    'Email Id',
    'Reporting Manager Email'
  ];
  dataSource: any[] = [];

  ngOnInit(): void {
    this.http.get<any[]>('/api/trainer/all').subscribe((trainer)=> this.dataSource = trainer);
    console.log(this.dataSource);
  }

  openNewTrainerDialog(trainer_) {

    if (trainer_) {
      this.dialog.open(TrainerFormComponent, {
        data: trainer_,
      });
    } else {
      this.dialog.open(TrainerFormComponent);
    }
    // this.dialog.open(BatchformComponent).afterClosed().subscribe();
  }
}
