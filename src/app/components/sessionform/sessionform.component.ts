import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-sessionform',
  templateUrl: './sessionform.component.html',
  styleUrls: ['./sessionform.component.css']
})
export class SessionformComponent implements OnInit {

  newSessionForm : FormGroup;

  public Sessions : any = [];
  batchId:number;
  constructor(private fb: FormBuilder, private http: HttpClient, private dialogRef:MatDialogRef<SessionformComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData){

      this.batchId = dialogData.batchId;
    }

  Trainers: any = []

  ngOnInit() {
    this.newSessionForm = this.fb.group({
      batchId: [this.batchId, [Validators.required]],
      sessionName: ['', [Validators.required]],
      trainer:['', [Validators.required]],
      daySlot:['', [Validators.required]],
      startDate:['', [Validators.required]],
      endDate:['', [Validators.required]],
    });

    this.http
    .get<any[]>('/api/trainer/all')
    .subscribe((trainer) => (this.Trainers = trainer));

    if (this.dialogData.sessionDetails) {
      this.newSessionForm.patchValue(this.dialogData.sessionDetails);
    }
  }


  onSubmit() {
    console.log(this.newSessionForm.value);
     this.http.post('api/session/add', this.newSessionForm.value).subscribe(() => this.dialogRef.close())
  }

}
