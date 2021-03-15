import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-batchform',
  templateUrl: './batchform.component.html',
  styleUrls: ['./batchform.component.css'],
})
export class BatchformComponent implements OnInit {
  newBatchForm: FormGroup;
  isProgressLoading = false;
  loadText = 'Loading ...';
  batchObject;
  allBatches = {};

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private dialogRef: MatDialogRef<BatchformComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData,
    private snackbar: MatSnackBar
  ) { }


  ngOnInit() {
    this.newBatchForm = this.fb.group({
      batchId: [''],
      batchName: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      commonSkypeId: ['', [Validators.required]],
      groupEmailId: ['', [Validators.required]],
    });

    this.allBatches = this.dialogData.allBatches;
    if (this.dialogData.batch) {
      this.batchObject = this.dialogData.batch;
      this.newBatchForm.patchValue(this.dialogData.batch);
    }
  }

  onSubmit() {
    if (this.newBatchForm.valid) {
      this.isProgressLoading = true;

      // For updating the batch
      if (this.dialogData.batch) {
        let updateForm = this.newBatchForm.value;
        updateForm['commonClassroomId'] = this.batchObject.commonClassroomId;
        updateForm['classroomLink'] = this.batchObject.classroomLink;
        updateForm['courseGroupEmail'] = this.batchObject.courseGroupEmail;
        updateForm['classroomName'] = this.batchObject.classroomName;

        let startDate = updateForm.startDate;
        let endDate  = updateForm.endDate;
        let d1 = Date.parse(startDate);
        let d2 = Date.parse(endDate);
        // startDate.setHours(0,0,0,0);
        // endDate.setHours(0,0,0,0);

        // Validating the batch start and end date
        if (d1 >= d2) {
          this.snackbar.open('Provide a valid Date', '', {
            duration: 5000,
          });
          this.isProgressLoading = false;
          return;
        }

        // Validation for checking if the batch with same name exists
        if (
          updateForm.batchName in this.allBatches &&
          this.allBatches[updateForm.batchName] != updateForm.batchId
        ) {
          this.snackbar.open('Provide a different batch name', '', {
            duration: 5000,
          });
          this.dialogRef.close();
          return;
        }

        this.http.post('/api/batch/add', updateForm).subscribe(() => {
          this.dialogRef.close();
          this.isProgressLoading = false;
        });
        this.snackbar.open('Batch Updated', '', { duration: 5000 });
      }

      // For entering a new batch
      else {
        let tempForm = this.newBatchForm.value;

        let startDate = tempForm.startDate;
        let endDate  = tempForm.endDate;
        let d1 = Date.parse(startDate);
        let d2 = Date.parse(endDate);

        // startDate.setHours(0,0,0,0);
        // endDate.setHours(0,0,0,0);

        // Validation for start date and end date for a new batch
        if (d1 >= d2) {
          this.snackbar.open('Provide a valid Date', '', {
            duration: 5000,
          });
          this.isProgressLoading = false;
          return;
        }

        // Checking if the batch with same name already exists
        if (tempForm.batchName in this.allBatches) {
          this.snackbar.open('Provide a different batch name', '', {
            duration: 5000,
          });
          this.dialogRef.close();
          return;
        }
        this.loadText = 'Creating Google Classroom Course...';
        this.http
          .get<any>(
            'https://script.google.com/macros/s/AKfycbwRycXiB4o4G5bsLIiBwRcLhVrSCp5pk5feG9FPwNX-S2omV7fadGz0CYVey_yvXUzP/exec',
            {
              params: {
                operation: 'CreateCourse',
                classRoomName: this.newBatchForm.get('batchName').value,
              },
            }
          )
          .subscribe((val) => {
            tempForm['commonClassroomId'] = val['id'];
            tempForm['classroomLink'] = val['alternateLink'];
            tempForm['courseGroupEmail'] = val['courseGroupEmail'];
            tempForm['classroomName'] = val['name'];
            this.loadText = 'Creating Batch...';
            this.http.post('/api/batch/add', tempForm).subscribe(() => {
              this.dialogRef.close();
              this.isProgressLoading = false;
              this.loadText = 'Loading...';
            });
            this.snackbar.open('Batch Added', '', { duration: 5000 });
          });
      }
    }
    // If the form is invalid
     else {
      this.snackbar.open('There are validation errors', '', {
        duration: 5000,
      });
    }
  }
}
