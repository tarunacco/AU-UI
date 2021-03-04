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

  constructor(private fb: FormBuilder, private http: HttpClient, private dialogRef:MatDialogRef<SessionformComponent>){}

  ngOnInit() {
    this.newSessionForm = this.fb.group({
      sessionName: ['', [Validators.required]],
      classroomTopicId: ['', [Validators.required]],
      createdOn: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.http.post('/api/batch', this.newSessionForm.value).subscribe(() => this.dialogRef.close())
  }

}
