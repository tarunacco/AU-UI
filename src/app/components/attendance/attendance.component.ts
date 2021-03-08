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
  renderedData: any;
  // data = {
  //   sessions: ['Session 1', 'Session 2', 'Session 3', 'Session 4', 'Session 5', 'Session 6', 'Session 7', 'Session 8', 'Session 9', 'Session 10', 'Session 11', 'Session 12', 'Session 13', 'Session 14', 'Session 15'],
  //   attendanceData: [
  //     {
  //       student: {
  //         name: 'Tarun',
  //         id: 1,
  //       },
  //       'Session 1': true,
  //       'Session 2': false,
  //     },
  //     {
  //       student: {
  //         name: 'Kishan',
  //         id: 2,
  //       },
  //       'Session 1': true,
  //     },
  //     {
  //       student: {
  //         name: 'XYZ',
  //         id: 3,
  //       },
  //       'Session 1': true,
  //     },
  //   ],
  // };

  attend : any[] = [];
  sessionHeaders = [];
  sessionHeaderName = [];
  headers = [];
  attendanceData = [];

  ngOnInit() {
      this.http.get<any[]>('/api/attendance/all')
      .subscribe((attendance) => (this.attend = attendance,
        this.sessionHeaders = attendance['sessions'],
        this.sessionHeaders.map((seshead) => {
          this.sessionHeaderName.push(seshead.sessionName);
        }),
        this.headers = ['Student', ...this.sessionHeaderName],
        this.attendanceData = attendance['attendanceData'], console.log(attendance)));
  }

  constructor(private http:HttpClient) {

  }

  getAttendance(row, column) {

    console.log(row,column)
    const sessionId = `${this.sessionHeaders.find((session) => session.sessionName === column).sessionId}`;
    if (row[sessionId] === false) {
      return 'A';
    } else if (row[sessionId]) {
      return 'P';
    } else {
      return 'N/A';
    }
  }

  mark(studentId, sessionName_, markPresent) {


    console.log("SessionName" + sessionName_);
    let attendanceStatus = 'N/A';
    if (markPresent === true) {
        attendanceStatus = 'P';
    }
    else if (markPresent === false) {
        attendanceStatus = 'F';
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
    console.log(markAttendance);

    // Post ...
    this.http.post('api/attendance/markAttendance', markAttendance).subscribe(() => "marked attendance")
  }
}
