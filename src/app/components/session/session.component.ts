import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SessionformComponent } from '../sessionform/sessionform.component';
import { BatchformComponent } from '../batchform/batchform.component';
import { Router } from '@angular/router';
import { BulkaddsessionsComponent } from '../bulkaddsessions/bulkaddsessions.component';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css'],
})
export class SessionComponent implements OnInit {
  @Input()
  batchId: number;

  batchName: String;

  constructor(
    private dialog: MatDialog,
    private http: HttpClient,
    private router: Router
  ) {
    this.batchName = this.router.getCurrentNavigation().extras.state.batchName;
  }

  displayedColumns: string[] = [
    'SessionName',
    'Date',
    'Time',
    'Trainer',
    'Actions',
  ];
  dataSource: any[] = [];

  ngOnInit(): void {
    this.getSessions();
  }

  getSessions() {
    this.http
      .get<any[]>('api/session/all', { params: { batchId: `${this.batchId}` } })
      .subscribe((res) => (this.dataSource = res));
  }

  openNewSessionDialog(session_) {
    let dialogRef: MatDialogRef<SessionformComponent>;
    if (session_) {
      dialogRef = this.dialog.open(SessionformComponent, {
        data: {
          batchId: this.batchId,
          sessionDetails: session_,
        },
      });
    } else {
      dialogRef = this.dialog.open(SessionformComponent, {
        data: {
          batchId: this.batchId,
        },
      });
    }
    dialogRef.afterClosed().subscribe(() => this.getSessions());
  }

  deleteSession(session_) {
    let sessionId = session_.sessionId;
    let url = '/api/session/' + sessionId;
    this.http.delete(url).subscribe(() => this.getSessions());
  }

  sendEmail(session_) {

    let url = '/api/session/sendMail/' + session_.sessionId.toString();
    this.http.post(url, "hello").subscribe();
  }

  openBulkSessionDialog() {
    this.dialog.open(BulkaddsessionsComponent);
  }
}
