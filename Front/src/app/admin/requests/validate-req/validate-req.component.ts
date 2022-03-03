import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { RequestsService } from 'src/app/services/requests.service';


declare var require: any
const FileSaver = require('file-saver');
@Component({
  selector: 'app-validate-req',
  templateUrl: './validate-req.component.html',
  styleUrls: ['./validate-req.component.css']
})
export class ValidateReqComponent implements OnInit {
  isLoading : boolean = true;
  id: string;
  reqSub : Subscription;
  data : any;
  form : FormGroup;
  pdf : string = null;
  path : string = "./../../../../../../Back/assets/certifications/";
  constructor( private route: ActivatedRoute , private reqService : RequestsService, private http:HttpClient) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    this.reqService.getRequest(this.id);
    this.reqSub = this.reqService.oneReqUpdateListener().subscribe((req : any) =>{
      console.log(req[0]);
      this.pdf =this.path + req[0].file;
      this.isLoading = false;
      // this.data = req[0];
      this.form = new FormGroup({
        firstName : new FormControl(req[0].from.firstName, [Validators.required]),
        lastName : new FormControl(req[0].from.lastName, [Validators.required]),
        cin : new FormControl(req[0].from.cin, [Validators.required , Validators.minLength(8), Validators.maxLength(8)]),
        date_in: new FormControl(req[0].from.date_in, [Validators.required]),
        date_out: new FormControl(req[0].from.date_out),
        job_title : new FormControl(req[0].from.job_title, [Validators.required]),
        department : new FormControl(req[0].from.department, [Validators.required])
      });
    });



  }

  onSubmit(){
    this.http.post('http://localhost:3000/api/pdf',{
      name : this.form.get('name')?.value,
      cin : "15615531"
    }).subscribe(res => {
      console.log(res);
    });
  }

  download(){
    FileSaver.saveAs(this.pdf, 'attestation.pdf');
  }

}
