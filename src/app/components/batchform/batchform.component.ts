import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-batchform',
  templateUrl: './batchform.component.html',
  styleUrls: ['./batchform.component.css']
})


export class BatchformComponent implements OnInit {


  newBatchForm : FormGroup;
  constructor(private fb: FormBuilder, private http: HttpClient, private dialogRef:MatDialogRef<BatchformComponent>) {}


  ngOnInit() {
    this.newBatchForm = this.fb.group({
      batchName: ['', [Validators.required]],
        startDate: ['', [Validators.required]],
        endDate: ['', [Validators.required]],
        commonSkypeId: ['', [Validators.required]],
        groupEmailId: ['', [Validators.required]],
    });
  }


  // public batches : BatchSchema[] = [];



  onSubmit() {
    this.http.post('/api/batch', this.newBatchForm.value).subscribe(() => this.dialogRef.close())
  }
}
