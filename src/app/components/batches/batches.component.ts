import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
  constructor(
    private dialog: MatDialog,
    private http: HttpClient,
    private router: Router
  ) {}

  displayedColumns: string[] = [
    'BatchName',
    'StartDate',
    'EndDate',
    'BatchSkypeId',
    'BatchEmailId',
    'Actions',
  ];
  dataSource: any[] = [];

  ngOnInit(): void {
    this.http
      .get<any[]>('/api/batch/all')
      .subscribe((batches) => (this.dataSource = batches));
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
}
