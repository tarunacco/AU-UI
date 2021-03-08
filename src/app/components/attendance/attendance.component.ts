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
  data = {
    sessions: ['Session 1', 'Session 2', 'Session 3', 'Session 4', 'Session 5', 'Session 6', 'Session 7', 'Session 8', 'Session 9', 'Session 10', 'Session 11', 'Session 12', 'Session 13', 'Session 14', 'Session 15'],
    attendanceData: [
      {
        student: {
          name: 'Tarun',
          id: 1,
        },
        'Session 1': true,
        'Session 2': false,
      },
      {
        student: {
          name: 'Kishan',
          id: 2,
        },
        'Session 1': true,
      },
      {
        student: {
          name: 'XYZ',
          id: 3,
        },
        'Session 1': true,
      },
    ],
  };

  sessionHeaders = this.data.sessions;
  headers = ['Student', ...this.sessionHeaders];

  ngOnInit() {}

  getAttendance(row, column) {
    if (row[column] === false) {
      return 'A';
    } else if (row[column]) {
      return 'P';
    } else {
      return 'N/A';
    }
  }

  mark(studentId, sessionName, markPresent) {


  }
}
