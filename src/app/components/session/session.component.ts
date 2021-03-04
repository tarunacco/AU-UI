import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { SessionformComponent } from '../sessionform/sessionform.component';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {

  constructor(private dialog: MatDialog, private http:HttpClient) { }

  displayedColumns: string[] = ['SessionId', 'SessionName', 'TopicId', 'CreatedOn'];
  dataSource : any[] = [];

  ngOnInit(): void {
  }

  openNewSessionDialog() {
    this.dialog.open(SessionformComponent);
    // this.dialog.open(BatchformComponent).afterClosed().subscribe();
  }


}
