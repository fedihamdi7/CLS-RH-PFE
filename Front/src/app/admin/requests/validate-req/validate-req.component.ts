import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { RequestsService } from 'src/app/services/requests.service';
import { SharedService } from 'src/app/services/shared.service';

declare var require: any
const FileSaver = require('file-saver');
@Component({
  selector: 'app-validate-req',
  templateUrl: './validate-req.component.html',
  styleUrls: ['./validate-req.component.css'],
  providers: [{
    provide: MAT_DATE_LOCALE , useValue: 'fr-FR'
  }]
})
export class ValidateReqComponent implements OnInit {
  isLoading : boolean = true;
  id: string = this.route.snapshot.paramMap.get('id');;
  reqSub : Subscription;
  data : any;
  form : FormGroup;
  pdf : string = null;
  path : string = "http://localhost:3000/assets/certifications/";
  file : string = null;
  sender : string = null;
  constructor( private route: ActivatedRoute,private router : Router , private reqService : RequestsService, private http:HttpClient, private snackbar: MatSnackBar , private sharedService: SharedService) { }
  ngOnInit(): void {
    this.initializeView();
  }

  initializeView(){
    // this.id = this.route.snapshot.paramMap.get('id');

    this.reqService.getRequest(this.id);
    this.reqSub = this.reqService.oneReqUpdateListener().subscribe((req : any) =>{
      this.sender= req[0].from._id;      
      this.pdf =this.path + req[0].file;
      this.file = req[0].file;
      this.isLoading = false;
      // this.data = req[0];
      this.form = new FormGroup({
        firstName : new FormControl(req[0].from.firstName, [Validators.required]),
        lastName : new FormControl(req[0].from.lastName, [Validators.required]),
        cin : new FormControl(req[0].from.cin, [Validators.required, Validators.pattern('[0-9]{8}')]),
        date_in: new FormControl(req[0].from.date_in, [Validators.required]),
        date_out: new FormControl(req[0].from.date_out),
        job_title : new FormControl(req[0].from.job_title, [Validators.required]),
        department : new FormControl(req[0].from.department, [Validators.required])
      });
    });
  }

  getPDF(){
    //get user_id from local storage and parse it
    this.isLoading = true;
    this.http.post('http://localhost:3000/api/request/preview',{
      id : this.id,
      firstName : this.form.get('firstName')?.value,
      lastName : this.form.get('lastName')?.value,
      cin : this.form.get('cin')?.value,
      date_in : this.form.get('date_in')?.value,
      date_out : this.form.get('date_out')?.value,
      job_title : this.form.get('job_title')?.value,
      department : this.form.get('department')?.value,
      file : this.file,
      user_id : this.sender
    }).subscribe((res : any) => {  
      this.pdf= this.path + res;
      this.isLoading = false;
    });
  }

  validate(){
    // this.isLoading = true;
    let user:any = this.sharedService.getUserFromLocalStorage();
    let user_id = user._id;
    this.http.post('http://localhost:3000/api/request/updateStatus/'+this.id,{
      status : "done",
      id : this.id,
      firstName : this.form.get('firstName')?.value,
      lastName : this.form.get('lastName')?.value,
      cin : this.form.get('cin')?.value,
      date_in : this.form.get('date_in')?.value,
      date_out : this.form.get('date_out')?.value,
      job_title : this.form.get('job_title')?.value,
      department : this.form.get('department')?.value,
      file : this.file,
      user_id : user_id
    }).subscribe((res:any) => {
      this.pdf= this.path + res.file;
      // this.isLoading = false;
      this.snackbar.open("Request updated", "Close", {
        duration: 3000
      });
      this.router.navigate(['/admin/requests']);
      this.reqService.getRequestsNotifications();
    });
  }

  onSubmit(){
    this.getPDF();
  }

  download(){
    FileSaver.saveAs(this.pdf, 'attestation.pdf');
  }

}
