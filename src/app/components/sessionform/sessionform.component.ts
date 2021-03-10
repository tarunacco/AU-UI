import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { updateFor } from 'typescript';

@Component({
  selector: 'app-sessionform',
  templateUrl: './sessionform.component.html',
  styleUrls: ['./sessionform.component.css'],
})
export class SessionformComponent implements OnInit {
  newSessionForm: FormGroup;

  public Sessions: any = [];
  batchId: number;
  batchData: {};

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private dialogRef: MatDialogRef<SessionformComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData,
    private snackbar: MatSnackBar
  ) {
    this.batchId = dialogData.batchId;
    this.batchObject = dialogData.batchObj;
    // console.log("BatchObj sessionform component")
    // console.log(this.dialogData)
  }

  Trainers: any = [];
  batchObject;
  sessionObject;

  ngOnInit() {
    this.newSessionForm = this.fb.group({
      batchId: [this.batchId, [Validators.required]],
      sessionId: [''],
      sessionName: ['', [Validators.required]],
      trainer: [{}, [Validators.required]],
      daySlot: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
    });

    this.http
      .get<any[]>('/api/trainer/all')
      .subscribe(
        (trainer) => ((this.Trainers = trainer), console.log(trainer))
      );

    this.batchObject = this.dialogData.batchObj;
    console.log('Batch object inside sessionform');
    console.log(this.batchObject);

    this.sessionObject = this.dialogData.sessionDetails;
    console.log("Session Object");
    console.log(this.sessionObject);


    if (this.dialogData.sessionDetails) {
      console.log('Session Details From Table on click');
      console.log(this.dialogData.sessionDetails);

      this.newSessionForm.patchValue(this.dialogData.sessionDetails);
      // this.newSessionForm.value.trainer.patchValue(
      //   this.dialogData.sessionDetails.trainer.trainerName
      // );
      console.log('Form');
      console.log(this.newSessionForm.value);
    }
  }

  onSubmit() {
    if (this.newSessionForm.valid) {
      if (this.dialogData.sessionDetails) {
        let updateForm = this.newSessionForm.value;
        updateForm['classroomTopicId'] = this.sessionObject.classroomTopicId;
        updateForm['classroomTopicName'] = this.sessionObject.classroomTopicName;
        updateForm['calendarInviteLink'] = this.sessionObject.calenderInviteLink;
        console.log("Inside Update")
        this.http
          .post('/api/session/add', updateForm)
          .subscribe(() => this.dialogRef.close());
          console.log(updateForm);

        this.snackbar.open('Session Updated', '', { duration: 3000 });
      }
       else {
        let tempForm = this.newSessionForm.value;
        console.log("Inside Create")
        this.http
          .get<any>(
            'https://script.google.com/macros/s/AKfycbwRycXiB4o4G5bsLIiBwRcLhVrSCp5pk5feG9FPwNX-S2omV7fadGz0CYVey_yvXUzP/exec',
            {
              params: {
                operation: 'CreateTopic',
                courseId: this.batchObject.commonClassroomId,
                trainerName: this.newSessionForm.get('trainer').value
                  .trainerName,
                trainerEmail: this.newSessionForm.get('trainer').value.emailId,
                topicName: this.newSessionForm.get('sessionName').value,
              },
            }
          )
          .subscribe((val) => {
            // whatever is there in the submit put here
            tempForm['classroomTopicId'] = val['createdTopic']['topicId'];
            tempForm['classroomTopicName'] = val['createdTopic']['name'];
            tempForm['calendarInviteLink'] = val['sentCalInvite']['htmlLink'];


            console.log("Got the New Form")
            console.log(tempForm);
            console.log("------------------")
            this.http
              .post('/api/session/add', tempForm)
              .subscribe(() => {
                //console.log("Response Got from My API")
                this.dialogRef.close()
                //console.log("Dialog Closed");
              });
              this.snackbar.open('Session Created', '', { duration: 3000 });
          });
      }
    }
    else {
      this.snackbar.open('There are validation errors', '', { duration: 5000 });
    }
  }
}
