import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})

export class AssignmentComponent implements OnInit {

  data = {
    sessions: ['Session 1', 'Session 2', 'Session 3', 'Session 4', 'Session 5', 'Session 6', 'Session 7', 'Session 8', 'Session 9', 'Session 10', 'Session 11', 'Session 12', 'Session 13', 'Session 14', 'Session 15'],
    attendanceData: [
      {
        student: {
          name: 'Tarun',
          id: 1,
        },
        'Session 1': 80,
        'Session 2': 90,
      },
      {
        student: {
          name: 'Kishan',
          id: 2,
        },
        'Session 1': 80,
      },
      {
        student: {
          name: 'XYZ',
          id: 3,
        },
        'Session 1': 80,
      },
    ],
  };

  sessionHeaders = this.data.sessions;
  headers = ['Student', ...this.sessionHeaders];

  ngOnInit() {}

  getAssignment(row, column) {
    if (row[column] === 0 || row[column] == '') {
      return 0;
    } else if (row[column]) {
      return row[column];
    } else {
      return 'N/A';
    }
  }

  mark(studentId, sessionName, markPresent) {


  }
}

