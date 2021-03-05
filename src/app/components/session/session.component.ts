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

  @Input()
  batchName : String

  constructor(private dialog: MatDialog, private http: HttpClient) {}

  displayedColumns: string[] = [
    'SessionName',
    'Date',
    'Time',
    'Trainer',
  ];
  //dataSource: any[] = [];

  dataSource = JSON.parse(sessionStorage.getItem('Sessions'));
  ngOnInit(): void {
    // this.http
    //   .get<any[]>('/api/session', { params: { batchId: `${this.batchId}` } })
    //   .subscribe((res) => (this.dataSource = res));
  }

  openNewSessionDialog() {
    this.dialog.open(SessionformComponent);
// Session Name , Date, Time ( Mornign / Evening ), Trainer (dropdown select),
    // this.dialog.open(BatchformComponent).afterClosed().subscribe();
  }
}
