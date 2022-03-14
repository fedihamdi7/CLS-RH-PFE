import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SuppliersService } from 'src/app/services/suppliers.service';
import { AddContractComponent } from './add-contract/add-contract.component';


export interface SuppliersTable {
  n:number;
  name: string;
  email: string;
  phone: string;
  address: string;
  contract_start_date: string;
}
const ELEMENT_DATA: SuppliersTable[] = [];

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['n','name', 'email', 'phone', 'address', 'contract_start_date','contract_end_date','add_contract','add_invoice', 'details'];
  dataSource = new MatTableDataSource<SuppliersTable>(ELEMENT_DATA);
  showAddForm : boolean = false;
  form !: FormGroup;
  constructor( private suppliersService : SuppliersService ,  private snackBar : MatSnackBar , public dialog: MatDialog) { }
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
  }

  ngOnInit(): void {
    this.getSuppliers();

    this.form = new FormGroup({
      name : new FormControl(null, [Validators.required]),
      email : new FormControl(null, [Validators.required , Validators.email] ),
      phone : new FormControl(null, [Validators.required , Validators.pattern('[0-9]{8}')]),
      address : new FormControl(null, [Validators.required]),
      contract_start_date: new FormControl(null, [Validators.required]),
      contract_end_date : new FormControl(null, [Validators.required])

    });

  }

  getSuppliers(){
    this.suppliersService.getSuppliers();
    this.suppliersService.suppliersUpdateListener().subscribe((res: any) => {
      this.dataSource.data = res.map((supplier:any, index:number) => {
        return {
          _id : supplier._id,
          n : index + 1,
          name: supplier.name,
          email: supplier.email,
          phone: supplier.phone,
          address: supplier.address,
          contract_start_date : supplier.contract_start_date,
          contract_end_date : supplier.contract_end_date
        }
      });
  });
  }
  onSubmit(){
    this.suppliersService.addSupplier(this.form.value).subscribe((res: any ) =>{
      if (res.success == true){
        this.snackBar.open("Supplier Added Successfully", 'close', {
          duration: 2000,
        });
        this.getSuppliers();
        this.showAddForm = false;
        this.form.reset();
      }
      else{
        this.snackBar.open("An error occured ", 'close', {
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

  onAddContract(id : String){
    let dialogRef = this.dialog.open(AddContractComponent, {
      width: '700px',
      height : '60vh',
      data: {id : id}
    });
  }

}
