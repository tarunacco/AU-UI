import {
  Component,
  OnInit,
  AfterViewInit
} from '@angular/core';
import {
  MatDialog,
  MatDialogRef
} from '@angular/material/dialog';
import {
  HttpClient,
  HttpClientModule
} from '@angular/common/http';
import { TrainerFormComponent } from '../trainer-form/trainer-form.component';
import { MatSort } from '@angular/material/sort';
import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { trainerSchema } from './trainerSchema';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-trainers',
  templateUrl: './trainers.component.html',
  styleUrls: ['./trainers.component.css'],
})
export class TrainersComponent implements OnInit {
  isLoading = true;
  allTrainers = {};
  public displayedColumns: string[] = [
    'trainerName',
    'BusinessUnit',
    'SkypeId',
    'EmailId',
    'ReportingManagerEmail',
    'Actions',
  ];

  constructor(private dialog: MatDialog, private http: HttpClient) { }

  ngOnInit(): void {
    this.getSessions();
  }

  ngAfterViewInit(): void { }

  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  getSessions() {
    this.http.get<any[]>('/api/trainer/all').subscribe((res) => {
      this.dataSource.data = res;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.isLoading = false;
      console.log(res);
      res.map((trainer) => {
        this.allTrainers[(trainer.emailId).toLowerCase()] = trainer.trainerId;
      });
    });
    console.log(this.allTrainers);
  }

  openNewTrainerDialog(trainer_) {
    let dialogRef: MatDialogRef<TrainerFormComponent>;
    if (trainer_) {
      dialogRef = this.dialog.open(TrainerFormComponent, {
        data: {
          trainer: trainer_,
          allTrainers: this.allTrainers,
        }
      });
    } else {
      dialogRef = this.dialog.open(TrainerFormComponent, {
        data: {
          allTrainers: this.allTrainers,
        }
      });
    }
    dialogRef.afterClosed().subscribe(() => this.getSessions());
  }

  openSkype(skypeId) {
    window.open(`skype:${skypeId}?chat`);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }
}
