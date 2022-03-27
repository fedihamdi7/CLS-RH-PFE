import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';
import { AddUserComponent } from './add-user/add-user.component';


export interface userTable{
  n:number;
  first_name: string;
  last_name: string;
  job_title: string;
  email: string;
  date_in: Date;
}

const ELEMENT_DATA: userTable[] = [];

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy, AfterViewInit {

  displayedColumns: string[] = ['n','first_name', 'last_name', 'job_title', 'email', 'date_in'];
  dataSource = new MatTableDataSource<userTable>(ELEMENT_DATA);
  showAddForm : boolean = false;
  private usersSub :Subscription | undefined;
  constructor( private usersService : UsersService ,  private snackBar : MatSnackBar , private dialog : MatDialog) { }
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.usersService.getUsers();
    //get users
    this.usersSub = this.usersService.usersUpdateListener().subscribe((users : any) =>{
      //for each employee map the data and push in the dataSource
      this.dataSource.data = users.map((user:any, index:number) => {
        return {
          n : index + 1,
          first_name: user.firstName,
          last_name: user.lastName,
          job_title: user.job_title,
          email: user.email,
          date_in : user.date_in
        }
      });

    });
  }
  onSubmit(){
    

  }

  showForm(){
    // this.showAddForm = true;
    this.dialog.open(AddUserComponent,{
      width: '700px',
      height : 'auto',
    });
    this.dialog.afterAllClosed.subscribe(() => {
      this.getUsers();
    });
  }
  onClickCloseForm(){
    this.showAddForm = false;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  ngOnDestroy(): void {
    this.usersSub!.unsubscribe();

  }
}
