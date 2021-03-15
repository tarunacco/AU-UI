import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-trainer-form',
  templateUrl: './trainer-form.component.html',
  styleUrls: ['./trainer-form.component.css'],
})
export class TrainerFormComponent implements OnInit {
  newTrainerForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private dialogRef: MatDialogRef<TrainerFormComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData,
    private snackbar: MatSnackBar
  ) { }

  bu_heads: any[] = [];
  allTrainers = {}
  ngOnInit() {
    this.newTrainerForm = this.fb.group({
      trainerId: [''],
      trainerName: ['', [Validators.required]],
      skypeId: ['', [Validators.required]],
      emailId: ['', [Validators.required]],
      reportingManagerEmailId: ['', [Validators.required]],
      businessUnitId: ['', [Validators.required]],
    });

    this.allTrainers = this.dialogData.allTrainers;
    if (this.dialogData.trainer) {
      this.newTrainerForm.patchValue(this.dialogData.trainer);
    }

    this.http
      .get<any[]>('/api/businessUnit/all')
      .subscribe((all_bu) => ((this.bu_heads = all_bu), console.log(this.bu_heads)));
  }

  onSubmit() {
    if (this.newTrainerForm.valid) {
      let tempObj = this.newTrainerForm.value;
      console.log(this.dialogData.trainer);
      console.log("New trainer data ");
      console.log(this.newTrainerForm.value);
      console.log("All trainers")
      console.log(this.allTrainers);
      tempObj['businessUnit'] = {
        "buId": tempObj['businessUnitId']
      }
      delete tempObj['businessUnitId'];
      if (this.dialogData.trainer) {
        if ((tempObj.emailId in this.allTrainers) && (this.allTrainers[(tempObj.emailId).toLowerCase()] != tempObj.trainerId)) {
          this.snackbar.open("Trainer already exists", '' ,{
            duration : 5000
          });
          return;
        }

        this.http
          .post('api/trainer/add', tempObj)
          .subscribe(() => this.dialogRef.close());
        this.snackbar.open("Trainer updated", '', { duration: 3000 });
      }
      else {
        if (((this.newTrainerForm.value.emailId).toLowerCase()) in this.allTrainers) {
          this.snackbar.open("Trainer already exists", '' ,{
            duration : 5000
          });
          // this.dialogRef.close();
          return;
        }
        this.http
          .post('api/trainer/add', tempObj)
          .subscribe(() => this.dialogRef.close());
        this.snackbar.open("Trainer added", '', { duration: 3000 });
      }
    }
    else {
      this.snackbar.open("There are validation errors", '', { duration: 5000 })
    }
  }
}
