import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  form !: FormGroup;


  constructor( private authService: AuthService , private snackbar : MatSnackBar) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email : new FormControl(null, [Validators.required , Validators.email] ),
      password : new FormControl(null, [Validators.required , Validators.minLength(6)])
    });
  }


  onSubmit(){
    // check if form is empty

    if (!this.form.invalid) {
      this.authService.login(this.form.value);
    }else{
      this.snackbar.open('Please fill all the fields', 'close', {
        duration: 4000,
      });
    }
  }
}
