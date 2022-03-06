import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

import {MatTableDataSource} from '@angular/material/table';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { EmployeeService } from 'src/app/services/employee.service';
import { ActivatedRoute } from '@angular/router';
export interface requestTable {
  n : number
  sent_date: string;
  status: string;
}

declare var require: any
const FileSaver = require('file-saver');
const ELEMENT_DATA: requestTable[] = [];

@Component({
  selector: 'app-certif',
  templateUrl: './certif.component.html',
  styleUrls: ['./certif.component.css']
})
export class CertifComponent implements OnInit , AfterViewInit {

  promptDisplay : boolean = false;
  displayedColumns: string[] = ['n', 'sent_date', 'status','download'];
  dataSource = new MatTableDataSource<requestTable>(ELEMENT_DATA);
  certifType : string ;
  constructor(private snackbar: MatSnackBar ,private employeeService : EmployeeService ,private route: ActivatedRoute) { }
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
  }

  ngOnInit(): void {
    //get route
    this.route.params.subscribe(params => {
      this.certifType = params.type;
      this.getRequests();

    });
  }

  getRequests(){
    this.employeeService.getRequests(this.certifType).subscribe(
      (res: any) => {
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

  sendRequest(){
    this.employeeService.addRequest(this.certifType).subscribe(
      (res) => {
        this.snackbar.open('Request sent successfully', 'close', {
          duration: 2000,
        });
        this.getRequests();
        this.promptDisplay = false;
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  showPrompt(){
    this.promptDisplay = true;
  }
  onPromptClose(){
    this.promptDisplay = false;
  }

  download(path: any){
    FileSaver.saveAs('../../../assets/pdf/'+path, 'attestation de travail.pdf');
  }
}
