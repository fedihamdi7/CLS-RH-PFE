import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';


export interface userTable{
  n:number;
  first_name: string;
  last_name: string;
  job_title: string;
  email: string;
}

const ELEMENT_DATA: userTable[] = [];

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy, AfterViewInit {

  displayedColumns: string[] = ['n','first_name', 'last_name', 'job_title', 'email'];
  dataSource = new MatTableDataSource<userTable>(ELEMENT_DATA);
  showAddForm : boolean = false;
  form !: FormGroup;
  private usersSub :Subscription | undefined;
  constructor( private usersService : UsersService ,  private snackBar : MatSnackBar) { }
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
  }

  ngOnInit(): void {
    this.getUsers();

    this.form = new FormGroup({
      firstName : new FormControl(null, [Validators.required]),
      lastName : new FormControl(null, [Validators.required]),
      email : new FormControl(null, [Validators.required , Validators.email] ),
      password : new FormControl(null, [Validators.required , Validators.minLength(6)]),
      phone : new FormControl(null, [Validators.required]),
      cin : new FormControl(null, [Validators.required , Validators.minLength(8), Validators.maxLength(8)]),
      date_in: new FormControl(null, [Validators.required]),
      date_out: new FormControl(null),
      job_title : new FormControl(null, [Validators.required]),
      department : new FormControl(null, [Validators.required])

    });

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
          email: user.email
        }
      });

    });
  }
  onSubmit(){
    this.usersService.addUser(this.form.value).subscribe((res: any ) =>{
      if (res.success == true){
        this.snackBar.open(res.message, 'close', {
          duration: 2000,
        });
        this.getUsers();
        this.showAddForm = false;

        this.form.reset();
      }
      else{
        this.snackBar.open(res.message, 'close', {
          duration: 2000,
        });
      }
    });

  }

  showForm(){
    this.showAddForm = true;
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
