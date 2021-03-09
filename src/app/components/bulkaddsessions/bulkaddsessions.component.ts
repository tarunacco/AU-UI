import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { _SnackBarContainer } from '@angular/material/snack-bar';
import { NgxCsvParser } from 'ngx-csv-parser';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';


@Component({
  selector: 'app-bulkaddsessions',
  templateUrl: './bulkaddsessions.component.html',
  styleUrls: ['./bulkaddsessions.component.css']
})
export class BulkaddsessionsComponent implements OnInit {
  csvRecords: any[] = [];
  header: boolean = true;
  batchId: number;
  constructor(private ngxCsvParser: NgxCsvParser,
    private http: HttpClient,
    private dialogRef: MatDialogRef<BulkaddsessionsComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData,
    private snackbar: MatSnackBar)
     { }

  ngOnInit(): void {
  }

  fileAttr = 'Select File';
  isDisabled = true;
  file = null;
  @ViewChild('fileImportInput') fileImportInput: any;

  fileChangeListener($event: any): void {
    const files = $event.srcElement.files;
    this.file = files[0];
    const studentsFile = files[0];
    this.isDisabled = false;
    if (studentsFile.size <= 10000000) {
      console.log('File type =' + typeof studentsFile);
      this.fileAttr = 'Selected File :- ' + studentsFile.name;
    } else {
        this.snackbar.open("File size is too large", '', {
          duration:2000
        });
    }
  }

  uploadFileToServer(): void {
    console.log('aagye');
    if (this.file != null) {
      const studentsFile = this.file;
      let formData: FormData = new FormData();
      formData.append('studentsFile', studentsFile, studentsFile.name);
      formData.append('batchId', this.batchId.toString());
      console.log('sending file');
      this.http
        .post('/api/student/bulkAdd', formData)
        .subscribe((response) => {
          console.log(response);
          this.snackbar.open("Sessions will be added", '', {
            duration:2000
          })
        });
    }
  }
}
