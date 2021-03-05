import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SessionformComponent } from '../sessionform/sessionform.component';

@Component({
  selector: 'app-studentform',
  templateUrl: './studentform.component.html',
  styleUrls: ['./studentform.component.css']
})



export class StudentformComponent implements OnInit {
  newStudentForm: FormGroup;

    batchId:number;

  constructor(private fb: FormBuilder, private http: HttpClient, private dialogRef:MatDialogRef<SessionformComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData){

      this.batchId = dialogData.batchId;
      console.log(dialogData);
  }


  ngOnInit() {
    this.newStudentForm = this.fb.group({
      batchId: [this.batchId, [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      emailId: ['', [Validators.required]]

    });


  }


  onSubmit() {
    console.log(this.newStudentForm.value);
    // console.log("Student saved " + JSON.stringify(this.newStudentForm.value));
     this.http.post('api/student/add', this.newStudentForm.value).subscribe(() => this.dialogRef.close())
  }

}
