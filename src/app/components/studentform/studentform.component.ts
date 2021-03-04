import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SessionformComponent } from '../sessionform/sessionform.component';

@Component({
  selector: 'app-studentform',
  templateUrl: './studentform.component.html',
  styleUrls: ['./studentform.component.css']
})
export class StudentformComponent implements OnInit {
  newStudentForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private dialogRef:MatDialogRef<SessionformComponent>){}

  ngOnInit() {
    this.newStudentForm = this.fb.group({
      FirstName: ['', [Validators.required]],
      LastName: ['', [Validators.required]],
      SkypeId: ['', [Validators.required]],

    });
  }


  onSubmit() {
    this.http.post('/api/batch', this.newStudentForm.value).subscribe(() => this.dialogRef.close())
  }

}
