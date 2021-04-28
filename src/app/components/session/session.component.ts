import {
  Component,
  Input,
  OnInit,
  ViewChild
}
  from '@angular/core';
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

  constructor(
    private dialog: MatDialog,
    private http: HttpClient,
    private router: Router,
    private snackbar: MatSnackBar,
  ) {console.log(this.batchId)
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
    console.log(this.batchId)
    this.getSessions();
  }

  getSessions() {
    this.http
      .get<any[]>('/api/session/all', {
        params: { batchId: `${this.batchId}` },
      })
      .subscribe((res) => {
        this.dataSource.data = res;
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
  getAtt(ele){
    //console.log(ele);
 //  return this.fetchAttendence(ele["sessionId"]);
 return "----"
  }
  fetchAttendence(id){
    let count=0;
    let url = '/api/training/all/' + this.batchId;
    this.http
      .get<any[]>(url, { params: { type: 'A' } })
      .subscribe(
        (attendance) => (
            (this.attend=attendance['attendanceData']),
            console.log(this.attend)
        )
        );
        for (let i = 0; i < this.attend.length; i++) {
          let x=this.attend[i][id]
             if(x['attendence']=='P')
              count++;
        }
        console.log(count);
        return count;
          
  }
  openFrom(name){
       let y=JSON.parse(localStorage.getItem(name));
       window.open(`https://docs.google.com/forms/d/${y}/edit`);
  }
  getFromAttendence(name){
    let total
    let y=JSON.parse(localStorage.getItem(name));
    this.http.get<any>('https://script.google.com/macros/s/AKfycbyYic4yIIXb_W65ntjOdspet7u7djUIZpCfYmQkT4AfH-vmKQhivwo2m-JVsP31fwmz/exec',{
                params:{
                  formId : y,
                  operation :'getFormResponses'
                }
              }).subscribe((val) => {
                 total=val['totalRespondents']
              });
              return '-';
  }


}
