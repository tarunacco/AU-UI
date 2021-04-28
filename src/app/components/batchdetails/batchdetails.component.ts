import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute,
  Router,
  ParamMap
} from '@angular/router';
// import { AnyARecord } from 'node:dns';

@Component({
  selector: 'app-batchdetails',
  templateUrl: './batchdetails.component.html',
  styleUrls: ['./batchdetails.component.css'],
})
export class BatchdetailsComponent implements OnInit {
  public batchObject ;
  disableSession = false;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.batchName = this.router.getCurrentNavigation().extras.state.batchObject.batchName;
    this.batchObject=this.router.getCurrentNavigation().extras.state.batchObject;
    console.log(this.batchObject)
  }

  public batchId: number;
  
  public batchName: String;
  tabs = [
    
    {
      tabName : "Session",
    
    },
    {
      tabName : "Candidates",
     
    },
    {
      tabName : "Attendance",
     
    },
    {
      tabName : "Assignment",
      
    },
    {
      tabName : "Assign Group",
      
    },
    {
      tabName : "Final Evaluation",
     
    },
    {
      tabName : "Charts",
      
    }
  ]
  selectedTabValue = 0;

  ngOnInit(): void {
    let id = parseInt(this.route.snapshot.paramMap.get('batchId'));
    this.batchId = id;
  
  }

  onTabChange(tabIndex){
   // console.log(typeof(tabIndex.index));
    this.selectedTabValue = tabIndex.index;
    if(tabIndex.index != 0){
      this.disableSession = true;
    }
    else{
      this.disableSession = false;
    }
  }

  getTabValue(tabName){
 
 
      
   for(let i = 0; i < this.tabs.length ; i++){
   
     if(this.tabs[i]['tabName'] === tabName){
    //   console.log(i);
      
              return i;

   }
  }
   return -1;
  }
}
