import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css'],
})
export class AttendanceComponent implements OnInit {
  dataSource: any[] = [];
  batchdata: String[];
  arr = [];
  ngOnInit(): void {
    this.http.get<any[]>('/api/batch/all').subscribe(
      (batches) =>
        (this.batchdata = batches.map((batch) => {
          return batch.batchName;
        }))
    );
  }

  // ngDoCheck() {
  //   if (this.batchdata) {
  //     for (let i in this.batchdata) {
  //       let temp = {};
  //       temp[i] =
  //         this.batchdata.map((batch) => {
  //           return "abhinva"
  //         })

  //       this.arr.push(temp);
  //     }

  //     console.log(this.arr)
  //   }
  // }
  //displayedColumns = ['position', 'name', 'weight', 'symbol', 'star'];
  //dataSource = ELEMENT_DATA;

  constructor(private http: HttpClient) {}

  func() {
    console.log(JSON.stringify(this.batchdata));
  }
}

// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];
