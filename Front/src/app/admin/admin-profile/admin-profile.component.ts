import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeService } from 'src/app/services/employee.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {
  isLoading : boolean = true;
  constructor(private employeeService : EmployeeService ,private matSnackbar :MatSnackBar , private dialogRef: MatDialogRef<AdminProfileComponent> , private sharedService :SharedService) { }
  form : FormGroup;

  ngOnInit(): void {
    this.employeeService.getEmployeeById().subscribe( (data:any) =>{
      this.form = new FormGroup({
        lastName : new FormControl(data.lastName, [Validators.required]),
        firstName : new FormControl(data.firstName, [Validators.required]),
        email : new FormControl(data.email, [Validators.required, Validators.email]),
        phone : new FormControl(data.phone, [Validators.required, Validators.pattern('[0-9]{8}')]),
        cin : new FormControl(data.cin, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
        job_title : new FormControl(data.job_title, [Validators.required]),
        department : new FormControl(data.department, [Validators.required]),
        password : new FormControl(),
      });
      this.isLoading = false;
    });
  }

  onSubmit(){
    this.employeeService.updateProfile(this.form.value).subscribe( (data:{updated:Boolean}) =>{
      if (data.updated){
        this.employeeService.user.next(this.form.value.firstName + ' ' + this.form.value.lastName);
        this.matSnackbar.open('Profile Updated Successfully','close',{duration:2000});
        this.dialogRef.close();
        this.employeeService.user.next(this.form.value.firstName + ' ' + this.form.value.lastName);
        this.employeeService.userUpdateListener();
      }else{
        this.matSnackbar.open('Error Updating Profile','close',{duration:2000});
      }
    });
  }

}
