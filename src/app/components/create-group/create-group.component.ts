import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit {
  //FirstName:String
  checkBoxValue:boolean=true
  
  displayedColumns: string[] = ['name'];
  constructor(private http:HttpClient , @Inject(MAT_DIALOG_DATA) public dialogData,private fb: FormBuilder) {
      
   }
  
  
   
  batchId:number
  ngOnInit(): void {
    this.batchId=this.dialogData.batchId
      this.getStudents()
      
  }
  
  

  allStudents=new Map<any,boolean>();
  studentNames=[];
  getStudents()
  {
    this.http.get<any[]>('api/student/allUnassigned?batchId='+this.batchId).subscribe((res) => {
        this.allStudents.set(res,true)
       // console.log(this.allStudents)
       //  console.log(res)
         res.map((item)=>{
            //Firstname=`${item.firstName+item.lastName}`
           // this.allStudents[item] = true;  
            this.studentNames.push(item)
          //  this.allStudents[item.firstName+item.lastName]=false
         })
      //  console.log(this.allStudents)
      //  console.log(this.batchId)
      }
    )
  }
  checkCheckBoxvalue(event,x){
      console.log(x)
    this.allStudents.set(x,event.checked);
   // console.log(event.checked)
   // console.log(this.allStudents)
  }
  custForm = new FormGroup({

    size: new FormControl('',[Validators.required]),
    

  });
  
  modified=[]
  num:number
  

  generate()
  {
    console.log(this.allStudents)
   // console.log(this.custForm.get("size").value)
    this.num=this.custForm.get("size").value;
    this.allStudents.forEach((value: boolean, key: any) => {
      if(value==false)
      {
        this.modified.push(key)
      }
      console.log(value);
      console.log(this.modified);
  });




    // for (var key in this.allStudents) {
    //   // check if the property/key is defined in the object itself, not in parent
    //   if(this.allStudents.==false)
    //   {
    //      this.modified.push(key)
    //       console.log(key);
    //   }
    // }
    // for (var key1 in this.modified) {
    // console.log(key1)
    // }    
  

  this.http.post('api/group/automate/'+this.batchId+'?groupSize='+this.num, this.modified).subscribe(() =>
     console.log("group created"))
  // this.snackbar.open("Added Student", '', {
  //   duration: 2000
  // });  
  }
}
