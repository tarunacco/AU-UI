import { HttpClient } from '@angular/common/http';
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



@Component({
  selector: 'app-batches',
  templateUrl: './batches.component.html',
  styleUrls: ['./batches.component.css'],
})
export class BatchesComponent implements OnInit {



  constructor(private dialog: MatDialog, private http:HttpClient) {}

  displayedColumns: string[] = ['BatchName', 'StartDate', 'EndDate'];
  dataSource : any[] = [];
  ngOnInit(): void {

    this.http.get<any[]>('/api/batch').subscribe((batches)=> this.dataSource = batches);

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



}
