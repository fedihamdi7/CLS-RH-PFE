import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


declare var require: any
const FileSaver = require('file-saver');
@Component({
  selector: 'app-internship',
  templateUrl: './internship.component.html',
  styleUrls: ['./internship.component.css']
})
export class InternshipComponent implements OnInit {

  isLoading : boolean = true;
  pdf : string = "../../../assets/pdf/attestation.pdf";
  form !: FormGroup;
  constructor( private http:HttpClient) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    },500);

    this.form = new FormGroup({
      name : new FormControl(null)
    });
  }

  download(){
    FileSaver.saveAs(this.pdf, 'attestation.pdf');
  }

  onSubmit(){
    this.http.post('http://localhost:3000/api/pdf',{
      name : this.form.get('name')?.value,
      cin : "15615531"
    }).subscribe(res => {
      console.log(res);
    });
  }


}
