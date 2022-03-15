import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { InvoicesService } from 'src/app/services/invoices.service';

const ELEMENT_DATA: any[] = [];

@Component({
  selector: 'app-supplier-invoices',
  templateUrl: './supplier-invoices.component.html',
  styleUrls: ['./supplier-invoices.component.css']
})
export class SupplierInvoicesComponent implements OnInit {

  displayedColumns: string[] = ['n', 'supplier', 'payment_method', 'payment_status', 'date', 'amount', 'details'];
  dataSource = new MatTableDataSource<any>(ELEMENT_DATA);
  isLoadingResults = true;
  constructor(private invoicesService: InvoicesService, private route: ActivatedRoute) { }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
  }

  ngOnInit(): void {
    this.getInvoice();
  }

  getInvoice() {
    this.route.params.subscribe(params => {
      this.invoicesService.getInvoicesBySupplierId(params.id).subscribe(
        (res: any) => {
          console.log(res);
          
          this.dataSource.data = res.map((invoice: any, index: number) => {

            return {
              n: index + 1,
              _id: invoice._id,
              supplier: invoice.supplier,
              payment_method: invoice.payment_method,
              payment_status: invoice.payment_status.replace(/_/g, " "),
              date: invoice.date,
              amount: invoice.amount

            }
          });
          this.isLoadingResults = false;
        },
        err => {
          console.log(err);
        }
      );
    }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
