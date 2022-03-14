import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ContractsService } from 'src/app/services/contracts.service';



const ELEMENT_DATA: any[] = [];
@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {

  displayedColumns: string[] = ['n','supplier', 'date_signature', 'expires_at', 'payment_status','details'];
  dataSource = new MatTableDataSource<any>(ELEMENT_DATA);
  isLoadingResults = true;
  constructor(private contractsService : ContractsService) { }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
  }

  ngOnInit(): void {
    this.getAllContracts();
   }

  getAllContracts(){
    this.contractsService.getAllContracts().subscribe(
      (res: any) => {
        this.dataSource.data = res.map((contract:any, index : number) => {
          return {
            n: index+1,
            _id : contract._id,
            supplier: contract.supplier,
            date_signature: contract.date_signature,
            expires_at: contract.expires_at,
            payment_status: contract.payment_status.replace(/_/g, " ")
          }
        });
        this.isLoadingResults = false;
      },
      err => {
        console.log(err);
      }
    );
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
