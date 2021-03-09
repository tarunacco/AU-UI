import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-sessionform',
  templateUrl: './sessionform.component.html',
  styleUrls: ['./sessionform.component.css']
})
export class SessionformComponent implements OnInit {

  newSessionForm : FormGroup;

  public Sessions : any = [];
  batchId:number;
  constructor(private fb: FormBuilder,
    private http: HttpClient,
    private dialogRef:MatDialogRef<SessionformComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData,
    private snackbar:MatSnackBar
    ){

      this.batchId = dialogData.batchId;
    }

  Trainers: any = []

  ngOnInit() {
    this.newSessionForm = this.fb.group({
      batchId: [this.batchId, [Validators.required]],
      sessionId:['',[Validators.required]],
      sessionName: ['', [Validators.required]],
      trainer:[{}, [Validators.required]],
      daySlot:['', [Validators.required]],
      startDate:['', [Validators.required]],
    });

    this.http
    .get<any[]>('/api/trainer/all')
    .subscribe((trainer) => (this.Trainers = trainer, console.log(trainer)));

    if (this.dialogData.sessionDetails) {
      console.log("Session Details From Table on click");
      console.log(this.dialogData.sessionDetails);
      this.newSessionForm.patchValue(this.dialogData.sessionDetails);
      console.log("Form");
      console.log(this.newSessionForm.value);
    }
  }


  onSubmit() {
    // console.log("Final Submisson Form Details");
    // console.log(this.newSessionForm.value);

    // let tempDict={
    //   "batchId": 1,
    //   "daySlot": "A",
    //   "endDate": "2021-03-23",
    //   "sessionName": "3/3/2021",
    //   "startDate": "2021-03-02",
    //   "sessionId": 8,
    //   "trainer":{
    //     "trainerId": 4
    //   }
    // }

    console.log(this.newSessionForm.valid);
    // if (this.newSessionForm.valid) {
      this.http.post('/api/session/add', this.newSessionForm.value).subscribe(() => this.dialogRef.close())
      this.snackbar.open("Session Added", '', {duration:3000})
    // }
    //  else {
    //    this.snackbar.open("There are validation errors",  '', {duration:5000})
    //   }
  }


}
