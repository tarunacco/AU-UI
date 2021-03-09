import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { StudentformComponent } from '../studentform/studentform.component';
import { SessionformComponent } from '../sessionform/sessionform.component';
import { BulkaddstudentsComponent } from '../bulkaddstudents/bulkaddstudents.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})


export class StudentsComponent implements OnInit {

batchName:String
  constructor(private dialog: MatDialog, private http: HttpClient, private router:Router) {
    this.batchName = this.router.getCurrentNavigation().extras.state.batchName;
  }

  displayedColumns: string[] = ['FirstName', 'LastName', 'emailId', 'Actions'];
  dataSource: any[] = [];

  @Input()
  batchId: number;

  ngOnInit(): void {
    this.getSessions();
  }

  getSessions() {
    this.http
      .get<any[]>('api/student/all', { params: { batchId: `${this.batchId}` } })
      .subscribe((res) => (this.dataSource = res));
  }

  openNewStudentDialog(stud) {
    let dialogRef: MatDialogRef<StudentformComponent>;
    if (stud) {
      dialogRef = this.dialog.open(StudentformComponent , {
      data: {
     batchId: this.batchId,
     studDetails:stud,
      }
   })
  }
   else {
    dialogRef = this.dialog.open(StudentformComponent, {
      data: {
        batchId: this.batchId
      }
    });
  }
  dialogRef.afterClosed().subscribe(() => this.getSessions());

  }

  deleteStudent(stud) {
    let studentId = stud.studentId;
    let url = 'api/student/' + studentId;
    this.http.delete(url).subscribe(() => this.getSessions());
  }

  openBulkaddDialog() {
    let dialogRef: MatDialogRef<BulkaddstudentsComponent>;
    dialogRef = this.dialog.open(BulkaddstudentsComponent, {
      data: {
        batchId: this.batchId
      }
    });
    dialogRef.afterClosed().subscribe(() => this.getSessions());
  }
}
