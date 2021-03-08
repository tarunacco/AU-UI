import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css'],
})


export class AttendanceComponent implements OnInit {

  attend : any[] = [];
  sessionHeaders = [];
  sessionHeaderName = [];
  headers = [];
  attendanceData = [];

  constructor(private http:HttpClient) {}

  ngOnInit() {
    this.fetchAttendance();
  }

  fetchAttendance() {
    this.http.get<any[]>('/api/training/all', { params: { type: 'A'}})
    .subscribe((attendance) => (this.attend = attendance,
      this.sessionHeaders = attendance['sessions'],
      this.sessionHeaders.map((seshead) => {
        this.sessionHeaderName.push(seshead.sessionName);
      }),
      this.headers = ['Student', ...this.sessionHeaderName],
      this.attendanceData = attendance['attendanceData'], console.log(attendance)));
  }

  getAttendance(row, column) {
    const sessionId = `${this.sessionHeaders.find((session) => session.sessionName === column).sessionId}`;
    if (row[sessionId]) {
      const current_att = row[sessionId].attendance;
      if (current_att == 'A') {
        return 'A';
      }
      else {
        return 'P';
      }
    }
    return 'N/A';
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
      this.attendanceData = [];
      this.fetchAttendance()
    });

  }
}
