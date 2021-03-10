import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SessionformComponent } from '../sessionform/sessionform.component';
import { BatchformComponent } from '../batchform/batchform.component';
import { Router } from '@angular/router';
import { BulkaddsessionsComponent } from '../bulkaddsessions/bulkaddsessions.component';
import { TooltipPosition } from '@angular/material/tooltip';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css'],
})
export class SessionComponent implements OnInit {
  @Input()
  batchId: number;

  batchName: String;
  isLoading= true;

  constructor(
    private dialog: MatDialog,
    private http: HttpClient,
    private router: Router,
    private snackbar:MatSnackBar
  ) {
    this.batchObject = this.router.getCurrentNavigation().extras.state.batchObject;
    this.batchName = this.batchObject.batchName;

    console.log("Batch name p 2 c")
    console.log(this.batchName);
  }


  displayedColumns: string[] = [
    'startDate',
    'Time',
    'sessionName',
    'Trainer',
    'TrainerEmail',
    'Actions',
  ];
  //dataSource: any[] = [];

  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;


  @ViewChild(MatSort, { static: true })
  sort!: MatSort;

  ngOnInit(): void {
    //console.log('Loaded Sessions Component');
    this.getSessions();

  }

  getSessions() {
    this.http
      .get<any[]>('/api/session/all', { params: { batchId: `${this.batchId}` } })
      .subscribe((res) => {
        this.dataSource.data = res;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.isLoading = false;
      }
    );
  }

  batchObject;

  openNewSessionDialog(session_) {
    let dialogRef: MatDialogRef<SessionformComponent>;
    console.log("Session details")
    console.log(session_);
    if (session_) {
      dialogRef = this.dialog.open(SessionformComponent, {
        data: {
          batchId: this.batchId,
          sessionDetails: session_,
          batchObj:this.batchObject
        },
      });
    } else {
      dialogRef = this.dialog.open(SessionformComponent, {
        data: {
          batchId: this.batchId,
          batchObj:this.batchObject
        },
      });
    }
    dialogRef.afterClosed().subscribe(() => this.getSessions());
  }

  deleteSession(session_) {
    let sessionId = session_.sessionId;
    let url = '/api/session/' + sessionId;
    this.http.delete(url).subscribe(() => this.getSessions());
    this.snackbar.open("Session Deleted", '' ,{
      duration: 5000
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
  applyFilter(filterValue:string) {
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }
}
