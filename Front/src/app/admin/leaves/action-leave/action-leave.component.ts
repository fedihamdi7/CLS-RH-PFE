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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data : {id:string} ,
    public dialogRef: MatDialogRef<ActionLeaveComponent>, 
    private matSnack: MatSnackBar,
    private leaveService: LeaveService
    ) { }
  
  leave:any = {};
  id : string= this.data.id;

  ngOnInit(): void {
    this.leaveService.getLeavesById(this.id).subscribe((res:any) => { 
      this.leave = res;
    });
  }

  updateStatus(status: string, id :string){
    this.leaveService.updateStatus(status, id).subscribe((res:any) => {
      this.matSnack.open("Leave Updated", 'close', {duration: 3000});
      this.dialogRef.close();
    });
  }


}
