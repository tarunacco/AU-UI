import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  ValidatorFn,
  ValidationErrors,
} from '@angular/forms';
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
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private https: HttpClient,
    private dialogRef: MatDialogRef<BatchformComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.newBatchForm = this.fb.group({
      batchId: [''],
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
    console.log(this.newBatchForm.get('batchName').value);

    let headers = new HttpHeaders();
    headers = headers.set('Access-Control-Allow-Headers', 'Content-Type');
    headers = headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    headers = headers.set('Access-Control-Allow-Origin', '*');
    this.https
      .get<any>(
        'https://script.google.com/macros/s/AKfycbwRycXiB4o4G5bsLIiBwRcLhVrSCp5pk5feG9FPwNX-S2omV7fadGz0CYVey_yvXUzP/exec', { headers: headers,

          params: {
            operation: 'CreateCourse',
            classRoomName: this.newBatchForm.get('batchName').value,
          },
        }
      )
      .subscribe((val) => {
        // whatever is there in the submit put here
        console.log(val);
        console.log('done');
      });

    // if (this.newBatchForm.valid) {
    //   if (this.dialogData) {
    //     this.http
    //       .post('/api/batch/add', this.newBatchForm.value)
    //       .subscribe(() => this.dialogRef.close());
    //     this.snackbar.open('Batch Updated', '', { duration: 3000 });
    //   } else {
    //     this.http
    //       .post('/api/batch/add', this.newBatchForm.value)
    //       .subscribe(() => this.dialogRef.close());
    //     this.snackbar.open('Batch Added', '', { duration: 3000 });
    //   }
    // } else {
    //   this.snackbar.open('There are validation errors', '', {
    //     duration: 5000,
    //   });
    // }

    //this.http.post('api/batch/add', this.newBatchForm.value).subscribe(()=>this.dialogRef.close());
  }
}
