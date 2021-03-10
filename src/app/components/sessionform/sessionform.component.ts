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
  }

  Trainers: any = [];

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

    if (this.dialogData.sessionDetails) {
      console.log('Session Details From Table on click');
      console.log(this.dialogData.sessionDetails);
      this.newSessionForm.patchValue(this.dialogData.sessionDetails);
      console.log('Form');
      console.log(this.newSessionForm.value);
    }
  }

  onSubmit() {
    console.log(this.newSessionForm.value);
    if (this.newSessionForm.valid) {
      let tempForm = this.newSessionForm.value;

      this.http
        .get<any>(
          'https://script.google.com/macros/s/AKfycbwRycXiB4o4G5bsLIiBwRcLhVrSCp5pk5feG9FPwNX-S2omV7fadGz0CYVey_yvXUzP/exec',
          {
            params: {
              operation: 'CreateTopic',
              courseId: '294807139540',
              trainerName: this.newSessionForm.get('trainer').value.trainerName,
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
          console.log(tempForm);
          this.http
            .post('/api/session/add', this.newSessionForm.value)
            .subscribe(() => this.dialogRef.close());
          this.snackbar.open('Session Updated', '', { duration: 3000 });
        });
    } else {
      this.snackbar.open('There are validation errors', '', { duration: 5000 });
    }
  }
}
