import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {

  score : any[] = [];
  sessionHeaders = [];
  sessionHeaderName = [];
  headers = [];
  marksData = [];

  constructor(private http:HttpClient) {}

  ngOnInit() {
    this.fetchMarks();
  }

  fetchMarks() {
    this.http.get<any[]>('/api/training/all', { params: { type: 'M'}})
    .subscribe((marks) => (this.score = marks,
      this.sessionHeaders = marks['sessions'],
      this.sessionHeaders.map((seshead) => {
        this.sessionHeaderName.push(seshead.sessionName);
      }),
      this.headers = ['Student', ...this.sessionHeaderName],
      this.marksData = marks['marksData'], console.log(marks)));
  }

  getMarks(row, column) {
    const sessionId = `${this.sessionHeaders.find((session) => session.sessionName === column).sessionId}`;
    if (row[sessionId]) {
      return row[sessionId].marks;
    }
    return 0;
  }

  mark(studentId, sessionName_, markPresent) {
    let attendanceStatus = 'N/A';
    if (markPresent === true) {
        attendanceStatus = 'P';
    }
    else if (markPresent === false) {
        attendanceStatus = 'A';
    }
    else {
      attendanceStatus = 'N/A';
    }

    let sessId;
    this.sessionHeaders.forEach((session) => {
        if (session.sessionName === sessionName_) {
          sessId = parseInt(session.sessionId);
          console.log(sessId);
          return;
        }
    })


    const markAttendance = {
      "attendanceId": {
          "sessionId": sessId,
          "studentId": studentId,
      },
      "status": attendanceStatus,
    }

    this.http.post('api/training/markAttendance', markAttendance).subscribe(() => {
      this.sessionHeaders = [];
      this.sessionHeaderName = [];
      this.headers = [];
      this.marksData = [];
      this.fetchMarks()
    });

  }

}
