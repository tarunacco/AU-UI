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



  constructor(private dialog: MatDialog, private http:HttpClient, private router:Router) {}

  displayedColumns: string[] = ['BatchId', 'BatchName', 'StartDate', 'EndDate', 'BatchSkypeId', 'BatchEmailId', 'action'];
  dataSource : any[] = [];


  ngOnInit(): void {

    this.http.get<any[]>('/api/batch').subscribe((batches)=> this.dataSource = batches);
    console.log(this.dataSource);
  }

  openNewBatchDialog() {
    this.dialog.open(BatchformComponent);
    // this.dialog.open(BatchformComponent).afterClosed().subscribe();
  }


  getBatch(batch) {
    console.log(batch);
    this.router.navigate(['/batch', batch.batchId]);
  }


  editBatch(batchId) {
    console.log("Edit batch " + batchId);
    this.dialog.open(BatchformComponent);
  }

}
