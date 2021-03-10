import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BatchformComponent } from '../batchform/batchform.component';
import { BatchSchema } from '../batchform/batchSchema';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-batches',
  templateUrl: './batches.component.html',
  styleUrls: ['./batches.component.css'],
})
export class BatchesComponent implements OnInit, AfterViewInit {
  //dataSource: any[] = [];

  displayedColumns: string[] = [
    'batchName',
    'startDate',
    'EndDate',
    'BatchSkypeId',
    'Actions',
  ];

  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;


  @ViewChild(MatSort, { static: true })
  sort!: MatSort;
  isLoading = true;
  constructor(
    private dialog: MatDialog,
    private http: HttpClient,
    private router: Router,
    private snackbar:MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getSessions();
    // this.dataSource.
    // sort = this.sort;
  }

  ngAfterViewInit() {
    //this.dataSource.sort = this.sort;
    //this.sort.sortChange.subscribe(() => console.log('ok'));
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
    //console.log(batch);
    let dialogRef: MatDialogRef<BatchformComponent>;
    if (batch) {
      dialogRef = this.dialog.open(BatchformComponent, {
        data: batch,
      });
    } else {
      dialogRef = this.dialog.open(BatchformComponent);
    }

    dialogRef.afterClosed().subscribe(() => this.getSessions());

    // this.dialog.open(BatchformComponent).afterClosed().subscribe();
  }

  getBatch(batch) {
    //console.log('Batch object = ' + batch.batchName);
    this.router.navigate(['/batch', batch.batchId], {
      state: { batchObject: batch },
    });

    // getBatch(batch) {
    //   console.log('Batch object = ' + batch.batchName);
    //   this.router.navigate(['/batch', batch.batchId], {
    //     state: { batchName: batch.batchName },
    //   });

    //console.log("Data source array" + JSON.stringify(this.dataSource));
  }

  openSkype(skypeId) {
    window.open(`skype:${skypeId}?chat`);
  }

  deleteBatch(batch) {
    let batchId = batch.batchId;
    let url = 'api/batch/' + batchId;
    this.http.delete(url).subscribe(() => this.getSessions());
    //console.log('Deleted Batch with Id ' + batchId);
    this.snackbar.open("Batch Deleted", '' ,{
      duration: 5000
    });
  }
  applyFilter(filterValue:string) {
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }
}
