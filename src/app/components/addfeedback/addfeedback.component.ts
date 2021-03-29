import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-addfeedback',
  templateUrl: './addfeedback.component.html',
  styleUrls: ['./addfeedback.component.css']
})
export class AddfeedbackComponent implements OnInit {
  
 
  Data = [];
 
  headers: string[] = [
    'firstName',
   'marks',
    'feedback'
    
  ];

  groups = [];
  
  constructor(private http:HttpClient , @Inject(MAT_DIALOG_DATA) public dialogData) {
      
  }
 
  batchId:number
  groupId:number
  ngOnInit(): void {
    this.batchId=this.dialogData.batchId
    this.groupId=this.dialogData.groupId
    this.fetchdata();
    console.log(this.groupId);

  }
  fetchdata() {
    console.log('Inside fetchAttendance');
    this.http
    .get<any[]>('api/group/all?batchId=' + this.batchId)
    .subscribe((res) => {
      console.log(res);
      for(let x in res){
          if(res[x].studentGroupId == this.groupId ){
               
               this.Data=res[x].studentsList;
               
          }
   
      }
      console.log(this.Data);
    });
    
    
  }
  getProjectMarks(row) {
    return ;
  }
  addFeedback(){
    console.log("abd");
  }

}
