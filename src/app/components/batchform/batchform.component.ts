import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

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
      batchName: ['', [Validators.required]],
        startDate: ['', [Validators.required]],
        endDate: ['', [Validators.required]],
    });
  }


  // public batches : BatchSchema[] = [];



  onSubmit() {

  }
}
