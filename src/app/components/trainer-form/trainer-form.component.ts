import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
    @Inject(MAT_DIALOG_DATA) public dialogData
  ) {}

  bu_heads: any[] =[];

  ngOnInit() {
    this.newTrainerForm = this.fb.group({
      trainerName: ['', [Validators.required]],
      skypeId: ['', [Validators.required]],
      emailId: ['', [Validators.required]],
      reportingManagerEmailId: ['', [Validators.required]],
      businessUnitId: ['', [Validators.required]],
    });

    if (this.dialogData) {
      this.newTrainerForm.patchValue(this.dialogData);
    }

    this.http
      .get<any[]>('/api/businessUnit/all')
      .subscribe((all_bu) => (this.bu_heads = all_bu));
  }

  // public batches : BatchSchema[] = [];

  onSubmit() {
    console.log(this.newTrainerForm.value);
    this.http
      .post('/api/trainer/add', this.newTrainerForm.value)
      .subscribe(() => this.dialogRef.close());
  }
}
