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

  constructor(
    private dialog: MatDialog,
    private http: HttpClient,
    private router: Router
  ) {
    console.log("Constructor Of Students Loaded")
  }

  displayedColumns: string[] = [
    'FirstName',
    'LastName',
    'Joining Date',
    'emailId',
    'skypeId',
    'Location',
    'Actions',
  ];
  dataSource: any[] = [];

  @Input()
  batchId: number;
  isLoading= true;
  ngOnInit(): void {
    console.log('Loaded Students Component');
    this.getStudents();
  }

  getStudents() {
    console.log(this.dataSource);
    this.http
      .get<any[]>('api/student/all', { params: { batchId: `${this.batchId}` } })
      .subscribe((res) => (this.dataSource = res, this.isLoading = false));
  }

  openNewStudentDialog(stud) {
    let dialogRef: MatDialogRef<StudentformComponent>;
    if (stud) {
      dialogRef = this.dialog.open(StudentformComponent, {
        data: {
          batchId: this.batchId,
          studDetails: stud,
        },
      });
    } else {
      dialogRef = this.dialog.open(StudentformComponent, {
        data: {
          batchId: this.batchId,
        },
      });
    }
    dialogRef.afterClosed().subscribe(() => this.getStudents());
  }

  deleteStudent(stud) {
    let studentId = stud.studentId;
    let url = 'api/student/' + studentId;
    this.http.delete(url).subscribe(() => this.getStudents());
  }

  openBulkaddDialog() {
    let dialogRef: MatDialogRef<BulkaddstudentsComponent>;
    dialogRef = this.dialog.open(BulkaddstudentsComponent, {
      data: {
        batchId: this.batchId,
      },
    });
    dialogRef.afterClosed().subscribe(() => this.getStudents());
  }

  openSkype(skypeId) {
    window.open(`skype:${skypeId}?chat`);
  }
}
