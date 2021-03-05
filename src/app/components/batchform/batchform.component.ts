import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-batchform',
  templateUrl: './batchform.component.html',
  styleUrls: ['./batchform.component.css'],
})
export class BatchformComponent implements OnInit {

  newBatchForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private dialogRef: MatDialogRef<BatchformComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData
  ) {}

  ngOnInit() {
    this.newBatchForm = this.fb.group({
      batchId:['', [Validators.required]],
      batchName: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      commonSkypeId: ['', [Validators.required]],
      groupEmailId: ['', [Validators.required]],
    });

    if (this.dialogData) {
      this.newBatchForm.patchValue(this.dialogData);
    }
  }

  onSubmit() {

    {
         this.http.post('api/batch/add', this.newBatchForm.value).subscribe(()=>this.dialogRef.close());
    }

  }
}
