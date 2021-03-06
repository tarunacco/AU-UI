import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BatchformComponent } from '../batchform/batchform.component';
import { BatchSchema } from '../batchform/batchSchema';

@Component({
  selector: 'app-batches',
  templateUrl: './batches.component.html',
  styleUrls: ['./batches.component.css'],
})
export class BatchesComponent implements OnInit {
dataSource: any[] = [];

  displayedColumns: string[] = [
    'BatchName',
    'StartDate',
    'EndDate',
    'BatchSkypeId',
    'Actions',
  ];

  // dataSource: MatTableDataSource<any[]> = new MatTableDataSource<any[]>([]);
  // @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private http: HttpClient,
    private router: Router
  ) {}



  ngOnInit(): void {

    this.http
      .get<any[]>('/api/batch/all')
      .subscribe((batches) => (this.dataSource = batches));
      // this.dataSource.sort = this.sort;

  }

  openNewBatchDialog(batch) {
    if (batch) {
      this.dialog.open(BatchformComponent, {
        data: batch,
      });
    } else {
      this.dialog.open(BatchformComponent);
    }
    // this.dialog.open(BatchformComponent).afterClosed().subscribe();
  }

  getBatch(batch) {
    console.log(batch);
    this.router.navigate(['/batch', batch.batchId]);

    //console.log("Data source array" + JSON.stringify(this.dataSource));

  }

  openSkype(skypeId) {
    window.open(`skype:${skypeId}?chat`);
  }

  deleteBatch(batch) {
    let batchId = batch.batchId;
    let url = 'api/batch/' + batchId;
    this.http.delete(url).subscribe(() =>status = 'Delete successful');
    console.log("Deleted Batch with Id " + batchId);
  }

}
