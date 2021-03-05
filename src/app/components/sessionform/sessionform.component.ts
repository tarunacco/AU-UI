import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-sessionform',
  templateUrl: './sessionform.component.html',
  styleUrls: ['./sessionform.component.css']
})
export class SessionformComponent implements OnInit {

  newSessionForm : FormGroup;

  public Sessions : any = [];

  constructor(private fb: FormBuilder, private http: HttpClient, private dialogRef:MatDialogRef<SessionformComponent>){}

  Trainers: any = ['Florida', 'South Dakota', 'Tennessee', 'Michigan']

  ngOnInit() {
    this.newSessionForm = this.fb.group({
      sessionName: ['', [Validators.required]],
      trainer:[''],
      timeSlot:[''],
      startDate:[''],
    });


    // trainers get api call
  }

  onSubmit() {
    // this.http.post('/api/batch', this.newSessionForm.value).subscribe(() => this.dialogRef.close())
    console.log(this.newSessionForm.value);
    let result = this.newSessionForm.value;
    this.Sessions.push(result);
    sessionStorage.setItem('Sessions', JSON.stringify(this.Sessions));

  }

}
