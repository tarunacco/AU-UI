import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SubscribeOnObservable } from 'rxjs/internal-compatibility';
import { createTrue } from 'typescript';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  checkBoxValue:boolean=true
  
  displayedColumns: string[] = ['name'];
  constructor(private http:HttpClient , @Inject(MAT_DIALOG_DATA) public dialogData) {
      
   }
  
  
   
  batchId:number
  groupId:number
  ngOnInit(): void {
    this.batchId=this.dialogData.batchId
    this.groupId=this.dialogData.groupId
      this.getStudents()
      console.log("groupdID "+this.groupId)    
  }
  
  
  

  allStudent=new Map<any,boolean>();
  studentNames=[];
  getStudents()
  {
    this.http.get<any[]>('api/student/allUnassigned?batchId='+this.batchId).subscribe((res) => {
     //   this.allStudent.set(res,true)
       // console.log(this.allStudents)
       //  console.log(res)
         res.map((item)=>{
            //Firstname=`${item.firstName+item.lastName}`
           // this.allStudents[item] = true;  
            this.studentNames.push(item)
            this.allStudent.set(item,true)
         })
        console.log(this.allStudent)
      //  console.log(this.batchId)
      }
    )
  }
  checkCheckBoxvalue(event,x){
      console.log(x)
    this.allStudent.set(x,event.checked); 
    //console.log(this.allStudent);
   // console.log(this.allStudents)
  }

   modified=[]
//   num:number
  

 addStudent()
   {
    console.log(this.allStudent)
   // console.log(this.custForm.get("size").value)
    this.allStudent.forEach((value: boolean, key: any) => {
      if(value==true)
      {
        this.modified.push(key)
        console.log(key)
      }
      console.log(value);
      console.log(this.modified);
  });
   
  

  this.http.put('api/group/appendStudents/'+this.groupId, this.modified).subscribe(() =>
     console.log("group created"))
   
  }
 // appendStudents/group/52/
 }
