import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { StudentformComponent } from '../studentform/studentform.component';
import { SessionformComponent } from '../sessionform/sessionform.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  constructor(private dialog: MatDialog, private http:HttpClient) { }

  displayedColumns: string[] = ['FirstName', 'LastName', 'emailId'];
  dataSource : any[] = [];

  @Input()
  batchId: number;


  ngOnInit(): void {
    this.http
      .get<any[]>('api/student/all', { params: { batchId: `${this.batchId}` } })
      .subscribe((res) => (this.dataSource = res));
  }


  openNewStudentDialog() {
    //this.dialog.open(StudentformComponent);
    this.dialog.open(StudentformComponent, {
         data: {
        batchId: this.batchId
      }
    });
  }

}
