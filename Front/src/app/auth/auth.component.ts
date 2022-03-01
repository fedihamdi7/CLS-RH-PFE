import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  form !: FormGroup;


  constructor( private authService: AuthService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email : new FormControl(null, [Validators.required , Validators.email] ),
      password : new FormControl(null, [Validators.required , Validators.minLength(6)])
    });
  }


  onSubmit(){
    this.authService.login(this.form.value);
  }
}
