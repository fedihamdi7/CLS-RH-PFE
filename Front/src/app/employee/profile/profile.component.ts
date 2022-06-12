import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  //variables 
  form : FormGroup;
  constructor(private employeeService : EmployeeService , private matSnackbar :MatSnackBar) { }

  ngOnInit(): void {
    this.employeeService.getEmployeeById().subscribe( (data:any) =>{     
      this.form = new FormGroup({
        lastName : new FormControl(data.lastName, [Validators.required]),
        firstName : new FormControl(data.firstName, [Validators.required]),
        email : new FormControl(data.email, [Validators.required]),
        phone : new FormControl(data.phone, [Validators.required,Validators.pattern('[0-9]{8}')]),
        cin : new FormControl(data.cin, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
        job_title : new FormControl(data.job_title, [Validators.required]),
        department : new FormControl(data.department, [Validators.required]),
      });
    } );
  }

  onSubmit(){
    this.employeeService.updateProfile(this.form.value).subscribe( (data:{updated:Boolean}) =>{
      if (data.updated){
        this.employeeService.user.next(this.form.value.firstName + ' ' + this.form.value.lastName);
        this.matSnackbar.open('Profile Updated Successfully','close',{duration:2000});
      }else{
        this.matSnackbar.open('Error Updating Profile','close',{duration:2000});
      }
    });
  }

}
