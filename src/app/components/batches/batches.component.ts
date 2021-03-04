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
  constructor(private dialog: MatDialog) {}

  displayedColumns: string[] = ['BatchName', 'StartDate', 'EndDate'];
  dataSource = JSON.parse(localStorage.getItem('Batches'));
  ngOnInit(): void {

  console.log(this.dataSource);
  }

  openNewBatchDialog() {
    this.dialog.open(BatchformComponent);
  }

  // showBatches() {
  //   let batches = [];
  //   batches = JSON.parse(sessionStorage.getItem('Batches'));
  //   console.log('Localstorage batches ' + batches[0].BatchName);
  // }



}
