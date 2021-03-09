import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxCsvParser } from 'ngx-csv-parser';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-bulkaddstudents',
  templateUrl: './bulkaddstudents.component.html',
  styleUrls: ['./bulkaddstudents.component.css'],
})
export class BulkaddstudentsComponent implements OnInit {
  csvRecords: any[] = [];
  header: boolean = true;
  batchId: number;
  constructor(
    private ngxCsvParser: NgxCsvParser,
    private http: HttpClient,
    private dialogRef: MatDialogRef<BulkaddstudentsComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData
  ) {
    this.batchId = dialogData.batchId;
  }

  // selectFile(event) {
  //   this.selectedFiles = event.target.files;
  // }

  ngOnInit(): void {}

  fileUpload = 'Select File';
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
      this.fileUpload = 'Selected File :- ' + studentsFile.name;
    } else {
      // snack bar open for large file
    }
  }

  uploadStudentFileToServer(): void {
    if (this.file != null) {
      const studentsFile = this.file;
      let formData: FormData = new FormData();
      formData.append('studentsFile', studentsFile, studentsFile.name);
      formData.append('batchId', this.batchId.toString());
      console.log('sending file');
      this.http.post('/api/student/bulkAdd', formData).subscribe((response) => {
        console.log(response);
        // show snackbar
        //this.dialogRef.close();
      });
    }
  }
}

