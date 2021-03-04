import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { BatchSchema } from '../batchform/batchSchema';

@Component({
  selector: 'app-batchform',
  templateUrl: './batchform.component.html',
  styleUrls: ['./batchform.component.css']
})


export class BatchformComponent implements OnInit {


  newBatchForm : FormGroup;
  constructor(private fb: FormBuilder) {}


  ngOnInit() {
    this.newBatchForm = this.fb.group({
      BatchName: ['', [Validators.required]],
        StartDate: ['', [Validators.required]],
        EndDate: ['', [Validators.required]],
    });
  }

  get BatchName() {
    return this.newBatchForm.get('BatchName');
  }

  get StartDate() {
    return this.newBatchForm.get('StartDate');
  }

  get EndDate() {
    return this.newBatchForm.get('EndDate');
  }


  public batches : BatchSchema[] = [];



  onSubmit() {
    let result = this.newBatchForm.value;
    const record: BatchSchema = {
      BatchName: result.BatchName,
      StartDate: result.StartDate,
      EndDate: result.EndDate
    };

    this.batches.push(record);
    sessionStorage.setItem('Batches', JSON.stringify(this.batches));
    console.log(this.batches);
  }
}
