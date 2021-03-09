import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
  score: any[] = [];
  sessionHeaders = [];
  sessionHeaderName = [];
  headers = [];
  marksData = [];
  finalAverageReport = {};
  total = 0;
  constructor(private http: HttpClient) {}

  @Input()
  batchId: number;

  ngOnInit() {
    console.log('Loaded Assignment Component');
    this.fetchMarks();
  }

  fetchMarks() {
    let url = '/api/training/all/' + this.batchId;
    this.http
      .get<any[]>(url, { params: { type: 'M' } })
      .subscribe(
        (marks) => (
          (this.score = marks),
          (this.sessionHeaders = marks['sessions']),
          this.sessionHeaders.map((seshead) => {
            this.sessionHeaderName.push(seshead.sessionName);
          }),
          (this.headers = ['Student', ...this.sessionHeaderName]),
          (this.marksData = marks['marksData']),
          this.updateReport()
        )
      );
  }

  getTotalMarksAverage(column) {
    if (column in this.finalAverageReport) {
      return parseFloat(this.finalAverageReport[column]) / this.total;
    }
    return 0;
  }

  updateReport() {
    let copyOfFinalAverageReport = this.finalAverageReport;
    for (let i = 0; i < this.marksData.length; i++) {
      let currData = this.marksData[i];
      for (let key in currData) {
        if (key == 'student') {
          continue;
        } else {
          if (currData[key]['sessionName'] in copyOfFinalAverageReport) {
            copyOfFinalAverageReport[currData[key]['sessionName']] += parseInt(
              currData[key]['marks']
            );
          } else {
            copyOfFinalAverageReport[currData[key]['sessionName']] = parseInt(
              currData[key]['marks']
            );
          }
        }
      }
    }
    this.finalAverageReport = copyOfFinalAverageReport;
    this.total = this.marksData.length;
  }

  getMarks(row, column) {
    const sessionId = `${
      this.sessionHeaders.find((session) => session.sessionName === column)
        .sessionId
    }`;
    if (row[sessionId]) {
      return row[sessionId].marks;
    }
    return;
  }

  mark(studentId, sessionName_, marks) {
    let sessId;
    this.sessionHeaders.forEach((session) => {
      if (session.sessionName === sessionName_) {
        sessId = parseInt(session.sessionId);
        return;
      }
    });

    const markAttendance = {
      attendanceId: {
        sessionId: sessId,
        studentId: studentId,
      },
      marks: marks,
    };

    this.http
      .post('api/training/assignMarks', markAttendance)
      .subscribe((res) => {
        //console.log(res);
      });
  }
}
