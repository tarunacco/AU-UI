import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.css']
})
export class EditGroupComponent implements OnInit {
  batchId: any;
  studentGroupName: any;

  constructor(private http: HttpClient,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData) {
      this.batchId = dialogData.batchId;
      this.studentGroupName=dialogData.studentgroupName;
     }

     batchObject;
     sessionObject;
  editGroupForm: FormGroup;
  Trainers: any = [];
  ngOnInit(): void {

    this.editGroupForm = this.fb.group({
      batchId: [this.batchId, [Validators.required]],
      // projectName:[],
      groupName : [this.studentGroupName,[]],
    });
    
    
    this.http
      .get<any[]>('/api/trainer/all')
      .subscribe(
        (trainer) => ((this.Trainers = trainer), console.log(trainer))
      );

      this.batchObject = this.dialogData.batchObj;
     //  this.sessionObject = this.dialogData.groupDetails;
  
       if (this.dialogData.groupDetails) {
         this.editGroupForm.patchValue(this.dialogData.groupDetails);
       }
  }

   

  onSubmit(){
          //api put update
  }
}
