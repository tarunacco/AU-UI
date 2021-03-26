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
  groupDetails: any;
  studentgroupId: any;

  constructor(private http: HttpClient,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData) {
      this.batchId = dialogData.batchId;
      this.studentGroupName=dialogData.studentgroupName;
      this.groupDetails = dialogData.groupDetails;
      this.studentgroupId= dialogData.studentGroupId;
     }

     batchObject;
     sessionObject;
  editGroupForm: FormGroup;
  Trainers: any = [];
  ngOnInit(): void {

    this.editGroupForm = this.fb.group({
      studentGroupId: [this.groupDetails.studentGroupId, [Validators.required]],
      batchId: [this.batchId, [Validators.required]],
      studentGroupName : [this.studentGroupName,[]],
      projectDocUrl: [this.groupDetails.projectDocUrl,[]],
      projectName: [this.groupDetails.projectName,[]],
      groupFeedback: [this.groupDetails.groupFeedback,[]],
      trainerId: [],
      trainer: []
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
    this.editGroupForm.value['trainerId'] = this.editGroupForm.value['trainer']['trainerId']
    delete this.editGroupForm.value['trainer']
    console.log(this.editGroupForm.value)
   this.http.put('/api/group/'+this.studentgroupId, this.editGroupForm.value).subscribe((res) =>
    console.log("group edited"))
  }
}
