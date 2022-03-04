import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { RequestsService } from 'src/app/services/requests.service';


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
  id: string;
  reqSub : Subscription;
  data : any;
  form : FormGroup;
  pdf : string = null;
  path : string = "../../../../assets/pdf/";
  file : string = null;
  constructor( private route: ActivatedRoute , private reqService : RequestsService, private http:HttpClient) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    this.reqService.getRequest(this.id);
    this.reqSub = this.reqService.oneReqUpdateListener().subscribe((req : any) =>{
      // console.log(req[0]);
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
    let user_id = JSON.parse(localStorage.getItem('user'))._id;
    this.http.post('http://localhost:3000/api/pdf',{
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
    }).subscribe(res => {

    });
  }

  onSubmit(){
    this.getPDF();
  }

  download(){
    FileSaver.saveAs(this.pdf, 'attestation.pdf');
  }

}
