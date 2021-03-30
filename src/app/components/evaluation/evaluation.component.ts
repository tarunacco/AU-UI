import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css'],
})
export class EvaluationComponent implements OnInit {
  score: any[] = [];
  sessionHeaders = [];
  sessionHeaderName = [];
  headers = [];
  marksData = [];
  finalAverageReport = {};
  total = 0;
  previousMarks: string;
  finalTotal: {};
  finalMarks = new Map<any, number>();
  prevMarks: string;

  constructor(private http: HttpClient) {}

  @Input()
  batchId: number;

  ngOnInit() {
    console.log('Loaded evalution Component');
    this.fetchMarks();
  }

  fetchMarks() {
    let url = '/api/group/finalEval/' + this.batchId;
    this.http.get<any[]>(url).subscribe((marks) => {
      console.log(marks);
      this.score = marks;
      this.sessionHeaders = marks['sessions'];
      this.sessionHeaders.map((seshead) => {
        this.sessionHeaderName.push(seshead.sessionName);
      });
      this.headers = [
        'First Name',
        'Last Name',
        'Email Address',
        // ...this.sessionHeaderName,
        'Project Marks',
        'Assignment Average',
        'Final Score',
      ];
      this.marksData = marks['marksData'];
      this.updateReport();
      console.log(marks['marksData']);
    });
  }

  getTotalMarksAverage(column) {
    column = column.student.studentId;
    if (column in this.finalAverageReport) {
      var avg = parseFloat(this.finalAverageReport[column]) / this.total;
      //   this.finalMarks.set(column,avg);
      return avg.toFixed(2).toString();
    }
    return '0';
  }
  getTotalMarks(row) {
    var m = this.getProjectMarks(row);
    if (m > 0) {
      m = parseFloat(m).toFixed(2);
      // console.log(typeof(parseInt(m)));
      row = row.student.studentId;
      if (row in this.finalAverageReport) {
        return this.finalMarks.get(row) + parseInt(m);
      }
    } else {
      row = row.student.studentId;
      if (row in this.finalAverageReport) {
        return this.finalMarks.get(row);
      }
    }
    return '0';
  }

  studentmap = {};
  arraylistassignment = {};

  updateReport() {
    let copyOfFinalAverageReport = this.finalAverageReport;
    this.total = this.sessionHeaderName.length;
    console.log(this.total);
    for (let i = 0; i < this.marksData.length; i++) {
      let currData = this.marksData[i];
      let currentStudentId = currData['student']['studentId'];

      copyOfFinalAverageReport[currentStudentId] = 0;
      //this.finalTotal[currentStudentId] = 0;
      //this.finalTotal.set(currentStudentId,0);
      this.finalMarks.set(currentStudentId, 0);
      for (let key in currData) {
        if (key == 'student') {
          continue;
        } else {
          //  console.log("currentStudent marks"+ currData[key]['marks'])
          if (currData[key]['marks'] > 0) {
            //    console.log("currentStudent INSIDE IF marks "+ currData[key]['marks']);
            copyOfFinalAverageReport[currentStudentId] += parseInt(
              currData[key]['marks']
            );

            var m = copyOfFinalAverageReport[currentStudentId] / this.total;
            this.finalMarks.set(currentStudentId, m);
          }
        }
      }
    }
    //   for (let key in copyOfFinalAverageReport) {
    //     let value = copyOfFinalAverageReport[key];
    //     //console.log(key+" "+value);
    //     this.finalMarks.set(key,(value/this.total));
    //     console.log(this.finalMarks);

    // }
    this.finalAverageReport = copyOfFinalAverageReport;
    // this.finalTotal = copyOfFinalAverageReport;
    console.log(this.finalMarks.get(2));
    console.log(this.finalAverageReport);
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

  marks(row, studentId, previousMarks, marks, i) {
    //  console.log(this.finalMarks);
    console.log(row);
    console.log('Index is ' + i);
    console.log('total ' + this.total);
    console.log(typeof studentId);
    console.log(this.finalMarks);
    console.log(this.finalMarks.get(2));
    // this.finalMarks.delete(studentId);

    // this.finalMarks.set(
    //   studentId,
    //   parseInt(this.finalAverageReport[studentId]) / this.total +
    //     parseInt(marks)
    // );
    // console.log(this.finalMarks.get(studentId));

    // this.finalMarks.set(studentId,(parseInt(this.finalAverageReport[studentId])/this.total)  + parseInt(marks));
    // console.log(this.finalMarks.get[studentId]);
    // this.finalAverageReport[studentId] += parseInt(marks);
    // if (previousMarks) {
    //   this.finalAverageReport[studentId] -= parseInt(previousMarks);
    //   this.finalAverageReport[studentId] += parseInt(marks);
    // } else {
    //   this.finalAverageReport[studentId] += parseInt(marks);
    // }
    console.log('previous marks ' + this.previousMarks);
    console.log('final(id)' + this.finalAverageReport[studentId]);
    console.log('parseInt(marks) ' + parseInt(marks));

    let feedbackData = row['projectDetails'];
    if ('feedbackId' in feedbackData) {
      feedbackData['marks'] = marks;
    } else {
      feedbackData = {
        studentId: row['student']['studentId'],
        feedback: '',
        marks: marks,
      }; 
    }

    console.log(feedbackData);
    let url = "api/group/finalEval/saveMarks";
    this.marksData[i]['projectDetails'] = feedbackData;
    this.http
      .post(url, feedbackData)
      .subscribe((res) => {});
  }

  getProjectMarks(row) {
    //   console.log(row);

    if ('marks' in row['projectDetails']) {
      return row['projectDetails']['marks'];
    }
    return '';
  }
}
