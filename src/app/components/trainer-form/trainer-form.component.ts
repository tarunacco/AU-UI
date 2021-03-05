import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

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
    private dialogRef: MatDialogRef<TrainerFormComponent>
  ) {}

  bu_heads: any[] = [{ value: '1', bu_name: 'Abhi' }];

  ngOnInit() {
    this.newTrainerForm = this.fb.group({
      fName: ['', [Validators.required]],
      lName: ['', [Validators.required]],
      skypeId: ['', [Validators.required]],
      emailId: ['', [Validators.required]],
      reportManagerEmail: ['', [Validators.required]],
      buHead: ['', [Validators.required]],
    });
    this.http
      .get<any[]>('/api/bu/getAllBu')
      .subscribe((all_bu) => (this.bu_heads = [...this.bu_heads, ...all_bu]));
  }

  // public batches : BatchSchema[] = [];

  onSubmit() {
    this.http
      .post('/api/trainer/addTrainer', this.newTrainerForm.value)
      .subscribe(() => this.dialogRef.close());
  }
}
