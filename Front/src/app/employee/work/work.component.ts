import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

import {MatTableDataSource} from '@angular/material/table';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';
export interface requestTable {
  n : number
  sent_date: string;
  status: string;
}

declare var require: any
const FileSaver = require('file-saver');
const ELEMENT_DATA: requestTable[] = [];

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})
export class WorkComponent implements OnInit {
   //read id_token from local storage
    id_token = localStorage.getItem('id_token');
   // put token in header
    headers = {
     'Authorization': 'jwt ' + this.id_token
   };
  promptDisplay : boolean = false;
  displayedColumns: string[] = ['n', 'sent_date', 'status','download'];
  dataSource = new MatTableDataSource<requestTable>(ELEMENT_DATA);

  constructor(private snackbar: MatSnackBar , private http: HttpClient) { }
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
  }

  ngOnInit(): void {
    this.getRequests();
  }

  getRequests(){
    this.http.get('http://localhost:3000/api/employee/getRequest',{headers:this.headers}).subscribe(
      (res: any) => {
        // console.log(res.request);
        this.dataSource.data = res.request.map((res:any,index:number) =>{
          return {
            n: index + 1,
            sent_date: res.sent_date,
            status: res.status,
            file : res.file
          }
        })
      }
    );
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  sendRequest(){

    const userLocal = JSON.parse(localStorage.getItem('user'));
    this.http.post('http://localhost:3000/api/employee/addRequest',{
        id: userLocal._id,
        firstName : userLocal.firstName,
        lastName : userLocal.lastName,
        cin : userLocal.cin,
        date_in : userLocal.date_in,
        date_out : userLocal.date_out,
        job_title : userLocal.job_title,
        department : userLocal.department
    },{headers: this.headers}).subscribe(
      (res) => {
        this.snackbar.open('Request sent successfully', 'close', {
          duration: 2000,
        });
        this.getRequests();
        this.promptDisplay = false;
      }
    );
  }

  showPrompt(){
    this.promptDisplay = true;
  }
  onPromptClose(){
    this.promptDisplay = false;
  }

  download(path: any){
    FileSaver.saveAs('../../../assets/pdf/'+path, 'attestation.pdf');
  }
}
