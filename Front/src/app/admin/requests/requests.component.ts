import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { RequestsService } from 'src/app/services/requests.service';


export interface userTable{
  from : string;
  sent_date : Date;
  status : string;
  type : string;
}
const ELEMENT_DATA: userTable[] = [];

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit, OnDestroy,AfterViewInit {
  displayedColumns: string[] = ['n','sender', 'sent_date', 'status', 'type','action'];
  dataSource = new MatTableDataSource<userTable>(ELEMENT_DATA);
  private requestsSub :Subscription | undefined;

  constructor( private requestsService : RequestsService ,  private snackBar : MatSnackBar) { }
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
  }
  ngOnInit(): void {
    this.getReqs();
  }


  getReqs(){
    this.requestsService.getRequests();
    //get reqs
    this.requestsSub = this.requestsService.requestsUpdateListener().subscribe((reqs : any) =>{
      // console.log(reqs);

      //for each employee map the data and push in the dataSource
      this.dataSource.data = reqs.map((reqs:any, index:number) => {
        return {
          id : reqs._id,
          n : index + 1,
          from : reqs.from.lastName + " " + reqs.from.firstName,
          sent_date : reqs.sent_date,
          status : reqs.status,
          type : reqs.type,
          file : reqs.file
        }
      });


    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  ngOnDestroy(): void {
    this.requestsSub!.unsubscribe();

  }

}
