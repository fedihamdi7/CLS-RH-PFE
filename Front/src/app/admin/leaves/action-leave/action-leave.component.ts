import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LeaveService } from 'src/app/services/leave.service';

@Component({
  selector: 'app-action-leave',
  templateUrl: './action-leave.component.html',
  styleUrls: ['./action-leave.component.css']
})
export class ActionLeaveComponent implements OnInit {
  zoom : number = 1;
  zoomed : boolean = false;
  path : string ="http://localhost:3000/assets/leaves/";
  file_type : string;
  leaves_left : number;
  user_id : string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data : {id:string} ,
    public dialogRef: MatDialogRef<ActionLeaveComponent>, 
    private matSnack: MatSnackBar,
    private leaveService: LeaveService
    ) { }
  
  leave:any = {};
  lastName : string;
  firstName : string;
  id : string= this.data.id;
  zoomClass : string = "zoomIn";
  ngOnInit(): void {
    this.leaveService.getLeavesById(this.id).subscribe((res:any) => {
      this.lastName = res.from.lastName;
      this.firstName = res.from.firstName;
      this.leaves_left = res.from.leaves_left;
      this.user_id = res.from._id;
      if (res.file) {
        this.path = this.path + res.file.name;
        this.file_type = res.file.type;
      }
      this.leave = res;
    });
  }

  updateStatus(status: string, id :string , leave_days?:number){
    this.leaveService.updateStatus(status, id,leave_days,this.user_id).subscribe((res:any) => {
      this.matSnack.open("Leave Updated", 'close', {duration: 3000});
      this.dialogRef.close();
    });
  }
  changeZoom(){
    if (!this.zoomed) {
      this.zoom = this.zoom + 0.3;
      this.zoomed = true;
      this.zoomClass = "zoomOut";

    }else{
      this.zoom = this.zoom - 0.3;
      this.zoomed = false;
      this.zoomClass = "zoomIn";
  
    }
  }


}
