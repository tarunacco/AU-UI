import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css']
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
  finalTotal:{};
  finalMarks=new Map<any,number>();
  prevMarks: string;
  
  constructor(private http: HttpClient) { }

  @Input()
  batchId: number;

  ngOnInit() {
    console.log('Loaded evalution Component');
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
          (this.headers = [
            'First Name',
            'Last Name',
            'Email Address',
            // ...this.sessionHeaderName,
            'Project Marks',
            'Assignment Average',
             'Final Score'
           
          ]),
          (this.marksData = marks['marksData']),
          this.updateReport(),
          console.log(marks['marksData'])
        )
      );
  }

  getTotalMarksAverage(column) {
    
    column = column.student.studentId;
    if (column in this.finalAverageReport) {
      var avg=parseFloat(this.finalAverageReport[column]) / this.total;
    //   this.finalMarks.set(column,avg);
      return avg
        .toFixed(2)
        .toString();
    }
    return '0';
  }
  getTotalMarks(column){
    // column = column.student.studentId;
    // if (column in this.finalAverageReport) {
    //   return (this.getProjectMarks(column)+(parseFloat(this.finalAverageReport[column]) / this.total))
    //     .toFixed(2)
    //     .toString();
    // }
    // return '0';
    //console.log("column"+column);
    column = column.student.studentId;
    //console.log("column"+column);
    if (column in this.finalAverageReport){
      //console.log("final total"+this.finalTotal);
    return this.finalMarks.get(column);
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
      this.finalMarks.set(currentStudentId,0);
      for (let key in currData) {
        if (key == 'student') {
          continue;
        } else {
          copyOfFinalAverageReport[currentStudentId] += parseInt(
            currData[key]['marks']
          );
          var m=copyOfFinalAverageReport[currentStudentId]/this.total;
          this.finalMarks.set(currentStudentId,m);
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
    this.total = this.sessionHeaderName.length;

    }
 
  getMarks(row, column) {
    const sessionId = `${this.sessionHeaders.find((session) => session.sessionName === column)
      .sessionId
      }`;
    if (row[sessionId]) {
      return row[sessionId].marks;
    }
    return;
  }

  marks(row, studentId,previousMarks, marks) {
    // let sessId;
    // this.sessionHeaders.forEach((session) => {
    //   if (session.sessionName === sessionName_) {
    //     sessId = parseInt(session.sessionId);
    //     return;
    //   }
    // });
      this.finalMarks.set(studentId,(parseInt(this.finalAverageReport[studentId])/this.total)  + parseInt(marks));
     console.log(this.finalMarks.get[studentId]);
    // this.finalAverageReport[studentId] += parseInt(marks);
    // if (previousMarks) {
    //   this.finalAverageReport[studentId] -= parseInt(previousMarks);
    //   this.finalAverageReport[studentId] += parseInt(marks);
    // } else {
    //   this.finalAverageReport[studentId] += parseInt(marks);
    // }
    console.log("previous marks "+this.previousMarks);
    console.log("final(id)" + this.finalAverageReport[studentId]);
    console.log("parseInt(marks) "+ parseInt(marks));
    // if (row[sessId]) {
    //   row[sessId]['marks'] = marks;
    // }

    const markAttendance = {
      attendanceId: {
        // sessionId: sessId,
        studentId: studentId,
      },
      marks: marks,
    };

    console.log(markAttendance);

    // this.http
    //   .post('api/training/assignMarks', markAttendance)
    //   .subscribe((res) => { });
  }
  getProjectMarks(row) {
    return 0;
  }
 
}
