import { HttpClient } from '@angular/common/http';
<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BatchformComponent } from '../batchform/batchform.component';
import { BatchSchema } from '../batchform/batchSchema';


=======
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BatchformComponent } from '../batchform/batchform.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
>>>>>>> 938cc704d6ca9b10c33417fcd4ec25f8b39da19f

@Component({
  selector: 'app-batches',
  templateUrl: './batches.component.html',
  styleUrls: ['./batches.component.css'],
})
<<<<<<< HEAD
export class BatchesComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  displayedColumns: string[] = ['BatchName', 'StartDate', 'EndDate'];
  dataSource = [];
  ngOnInit(): void {


  }

  openNewBatchDialog() {
    this.dialog.open(BatchformComponent);
    // this.dialog.open(BatchformComponent).afterClosed().subscribe();
  }

  // showBatches() {
  //   let batches = [];
  //   batches = JSON.parse(sessionStorage.getItem('Batches'));
  //   console.log('Localstorage batches ' + batches[0].BatchName);
  // }



=======
export class BatchesComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [
    'batchName',
    'startDate',
    'endDate',
    'BatchSkypeId',
    'Actions',
  ];

  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  isLoading = true;
  constructor(
    private dialog: MatDialog,
    private http: HttpClient,
    private router: Router,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getSessions();
  }

  ngAfterViewInit() {
  }

  getSessions() {
    this.http
      .get<any[]>('/api/batch/all')
      .subscribe((res) => {
        this.dataSource.data = res;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.isLoading = false;
      }
      );
  }

  openNewBatchDialog(batch) {
    let dialogRef: MatDialogRef<BatchformComponent>;
    if (batch) {
      dialogRef = this.dialog.open(BatchformComponent, {
        data: batch,
      });
    } else {
      dialogRef = this.dialog.open(BatchformComponent);
    }
    dialogRef.afterClosed().subscribe(() => this.getSessions());
  }

  getBatch(batch) {
    this.router.navigate(['/logedin/batch', batch.batchId], {
      state: { batchObject: batch },
    });
  }

  openSkype(skypeId) {
    window.open(`skype:${skypeId}?chat`);
  }

  deleteBatch(batch) {
    let batchId = batch.batchId;
    let url = 'api/batch/' + batchId;
    this.http.delete(url).subscribe(() => this.getSessions());
    this.snackbar.open("Batch Deleted", '', {
      duration: 5000
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  openClassroom(link) {
    window.open(link);
  }
>>>>>>> 938cc704d6ca9b10c33417fcd4ec25f8b39da19f
}
