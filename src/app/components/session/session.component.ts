import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SessionformComponent } from '../sessionform/sessionform.component';
import { Router } from '@angular/router';
import { BulkaddsessionsComponent } from '../bulkaddsessions/bulkaddsessions.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css'],
})
export class SessionComponent implements OnInit {
  @Input()
  batchId: number;
  batchObject;
  batchName: String;
  isLoading = true;
  attend: any[] = [];
  total: any[];

  constructor(
    private dialog: MatDialog,
    private http: HttpClient,
    private router: Router,
    private snackbar: MatSnackBar
  ) {
    console.log(this.batchId);
    this.batchObject = this.router.getCurrentNavigation().extras.state.batchObject;
    this.batchName = this.batchObject.batchName;
  }

  displayedColumns: string[] = [
    'startDate',
    'Time',
    'sessionName',
    'Trainer',
    'TrainerEmail',
    'Attendence',
    'forms',
    'Actions',
  ];

  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  ngOnInit(): void {
    console.log(this.batchId);
    this.getSessions();
    
  }
  getSessionAttendence(){
    let url = '/api/training/all/' + this.batchId;
    this.http
      .get<any[]>(url, { params: { type: 'P' } })
      .subscribe(
        (attendance) => (
            (this.attend=attendance['attendanceData'])
        )
        );
  }
  getSessions() {
    this.http
      .get<any[]>('/api/session/all', {
        params: { batchId: `${this.batchId}` },
      })
      .subscribe((res) => {
       
        this.dataSource.data = res;
   
        for(let i=0;i<this.dataSource.data.length;i++){
          let c1=0;
          for(let j=0; j<this.attend.length;j++) {
            if(this.attend[j][this.dataSource.data[i]["sessionId"]]!=null){
              console.log(this.attend[j][this.dataSource.data[i]["sessionId"]]['attendance']);
               if(this.attend[j][this.dataSource.data[i]["sessionId"]]['attendance'] =='P'){
                c1++;
              }}
          }
          console.log(c1);
          this.dataSource.data[i]["attendence"]=c1;
          
         // this.dataSource.data[i]["fromatten"]=this.getFromAttendence(this.dataSource.data[i]["googleFormId"]);
          }
        console.log(this.dataSource.data)
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.isLoading = false;
      });
  }

  openNewSessionDialog(session_) {
    let dialogRef: MatDialogRef<SessionformComponent>;
    console.log('Session details');
    console.log(session_);
    if (session_) {
      dialogRef = this.dialog.open(SessionformComponent, {
        data: {
          batchId: this.batchId,
          sessionDetails: session_,
          batchObj: this.batchObject,
        },
      });
    } else {
      dialogRef = this.dialog.open(SessionformComponent, {
        data: {
          batchId: this.batchId,
          batchObj: this.batchObject,
        },
      });
    }
    dialogRef.afterClosed().subscribe(() => this.getSessions());
  }

  deleteSession(session_) {
    let sessionId = session_.sessionId;
    let url = '/api/session/' + sessionId;
    this.http.delete(url).subscribe(() => this.getSessions());
    this.snackbar.open('Session Deleted', '', {
      duration: 5000,
    });
  }

  sendEmail(session_) {
    let url = '/api/session/sendMail/' + session_.sessionId.toString();
    this.http.post(url, 'hello').subscribe();
  }

  openBulkSessionDialog() {
    let dialogRef: MatDialogRef<BulkaddsessionsComponent>;

    dialogRef = this.dialog.open(BulkaddsessionsComponent, {
      data: {
        batchId: this.batchId,
      },
    });
    dialogRef.afterClosed().subscribe(() => this.getSessions());
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  openCalendar(link) {
    window.open(link);
  }

  getAtt(ele) {
    //console.log(ele);
    //return this.fetchAttendence(ele["sessionId"]);
    return '----';
  }

  fetchAttendence(id) {
    let count = 1;
    let url = '/api/training/all/' + this.batchId;
    this.http
      .get<any[]>(url, { params: { type: 'P' } })
      .subscribe(
        (attendance) =>
          (this.attend = attendance['attendanceData'])
          // console.log(this.attend)
      );
    for (let i = 0; i < this.attend.length; i++) {
      let x = this.attend[i][id];
      if (x['attendence'] == 'P') {
        count++;
        console.log(count);
      }
    }
    console.log(count);
    return count;
  }

  openFrom(formid) {
    //  let y=JSON.parse(localStorage.getItem(name));
    window.open(`https://docs.google.com/forms/d/${formid}/edit`);
  }

  getFromAttendence = async (id) => {
    let totalCount = 0;
    await this.http
      .get<any>(
        'https://script.google.com/macros/s/AKfycbyYic4yIIXb_W65ntjOdspet7u7djUIZpCfYmQkT4AfH-vmKQhivwo2m-JVsP31fwmz/exec',
        {
          headers: { Anonymous: 'skip' },
          params: {
            formId: id,
            operation: 'getFormResponses',
          },
        }
      )
      .subscribe((val) => {
        // console.log(val['totalRespondents'])
        totalCount = val['totalRespondents'];
        console.log(totalCount);
      });

    return totalCount;
  };
}
