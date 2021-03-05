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
    'SessionId',
    'SessionName',
    'TopicId',
    'CreatedOn',
  ];
  dataSource: any[] = [];

  ngOnInit(): void {
    this.http
      .get<any[]>('/api/session', { params: { batchId: `${this.batchId}` } })
      .subscribe((res) => (this.dataSource = res));
  }

  openNewSessionDialog() {
    this.dialog.open(SessionformComponent);
// Session Name , Date, Time ( Mornign / Evening ), Trainer (dropdown select),
    // this.dialog.open(BatchformComponent).afterClosed().subscribe();
  }
}
