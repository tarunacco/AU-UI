import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { StudentformComponent } from '../studentform/studentform.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  constructor(private dialog: MatDialog, private http:HttpClient) { }

  displayedColumns: string[] = ['FirstName', 'LastName', 'SkypeId', 'emailId'];
  dataSource : any[] = [];

  ngOnInit(): void {
  }

  openNewStudentDialog() {
    this.dialog.open(StudentformComponent);

  }

}
