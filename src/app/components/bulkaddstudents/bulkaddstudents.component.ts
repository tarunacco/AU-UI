import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CSVRecord } from './CSVRecord';
import {
  NgxCsvParser,
  NgxCSVParserError,
  NgxCsvParserModule,
} from 'ngx-csv-parser';
import {
  HttpClient,
  HttpEvent,
  HttpHeaders,
  HttpRequest,
} from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StudentformComponent } from '../studentform/studentform.component';
import { Observable } from 'rxjs';

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
      // snack bar open for large file
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
          // show snackbar
        });
    }
  }

  /*fileChangeListener(event) {
    let fileList: FileList = event.target.files;
    // if(fileList.length > 0) {
    //     let studentsFile: File = fileList[0];
    //     let formData:FormData = new FormData();
    //     formData.append('studentsFile', studentsFile, studentsFile.name);
    //     let headers = new Headers();
    //            headers.append('Content-Type', 'multipart/form-data');
    //     headers.append('Accept', 'application/json');
    //     let options = new RequestOptions({ headers: headers });
    //     this.http.post('api/student/bulkAdd', [formData, `${this.batchId}`], options)
    //         .map(res => res.json())
    //         .catch(error => Observable.throw(error))
    //         .subscribe(
    //             data => console.log('success'),
    //             error => console.log(error)
    //         )
  }*/

  //   this.header = (this.header as unknown as string) === 'true' || this.header === true;

  //   this.ngxCsvParser.parse(files[0], { header: this.header, delimiter: ',' })
  //     .pipe().subscribe((result: Array<any>) => {
  //       console.log('Result', result);
  //       this.http.post('/api/student/add', result).subscribe(() => "Added records")
  //       this.csvRecords = result;
  //     }, (error: NgxCSVParserError) => {
  //       console.log('Error', error);
  //     });

  // }

  // body: {
  //   params: {
  //       batchId: string;
  //   };

  // getFiles(): Observable<any> {
  //   return this.http.get(`${this.baseUrl}/files`);
  // }
}
