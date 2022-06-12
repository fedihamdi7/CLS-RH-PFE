import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  form: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: string },
    private usersService: UsersService,
    private dialogRef : MatDialogRef<EditUserComponent>,
    private snackbar : MatSnackBar
  ) { }

  ngOnInit(): void {
    this.usersService.getEmployeeById(this.data.id).subscribe((user: User) => {
      this.form = new FormGroup({
        firstName : new FormControl(user.firstName, [Validators.required]),
        lastName : new FormControl(user.lastName, [Validators.required]),
        email : new FormControl(user.email, [Validators.required , Validators.email] ),
        phone : new FormControl(user.phone, [Validators.required , Validators.pattern('[0-9]{8}')]),
        cin : new FormControl(user.cin, [Validators.required , Validators.minLength(8), Validators.maxLength(8)]),
        date_in: new FormControl(user.date_in, [Validators.required]),
        date_out: new FormControl(user.date_out),
        job_title : new FormControl(user.job_title, [Validators.required]),
        gender : new FormControl(user.gender, [Validators.required]),
        department : new FormControl(user.department, [Validators.required]),
        leaves_left: new FormControl(user.leaves_left)
      });
    });
  }

  onSubmit() {
    this.usersService.updateEmployee(this.data.id, this.form.value).subscribe((res:{updated:boolean}) => {
      if (res.updated){
        this.snackbar.open('Employee updated successfully', 'close', {
          duration: 3000,
        });
        this.dialogRef.close();
      }else{
        this.snackbar.open('Erro occured', 'close', {
          duration: 3000,
        });
      }
    });
  }

}
