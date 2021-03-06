import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { SessionformComponent } from '../sessionform/sessionform.component';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css'],
})
export class SessionComponent implements OnInit {

  @Input()
  batchId: number;


  constructor(private dialog: MatDialog, private http: HttpClient) {}

  displayedColumns: string[] = [
    'SessionName',
    'Date',
    'Time',
    'Trainer',
    'Actions',
  ];
  dataSource: any[] = [];

    ngOnInit(): void {
    this.http
      .get<any[]>('api/session/all', { params: { batchId: `${this.batchId}` } })
      .subscribe((res) => (this.dataSource = res));
  }

  openNewSessionDialog(session_) {
    if (session_) {
    this.dialog.open(SessionformComponent , {
      data: {
     batchId: this.batchId,
     sessionDetails:session_,
      }
   })
  }
   else {
    this.dialog.open(SessionformComponent, {
      data: {
        batchId: this.batchId
      }
    });
  }

  }

  deleteSession(session_) {
     let sessionId = session_.sessionId;
     let url = "api/session/" + sessionId;
     this.http.delete(url).subscribe(()=>"deleted successfully");
  }
}
