import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { SuppliersService } from 'src/app/services/suppliers.service';

@Component({
  selector: 'app-supplier-contracts',
  templateUrl: './supplier-contracts.component.html',
  styleUrls: ['./supplier-contracts.component.css']
})
export class SupplierContractsComponent implements OnInit {
  ELEMENT_DATA: any[] = [];
  displayedColumns: string[] = ['n', 'supplier', 'date_signature', 'expires_at', 'payment_status', 'details'];
  dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
  supplier_name : string;
  constructor(private route: ActivatedRoute, private suppliersService: SuppliersService) { }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
  }

  ngOnInit(): void {
    this.getContracts();

  }

  getContracts() {
    this.suppliersService.getContractBySupplierId(this.route.snapshot.params.id).subscribe((data: any) => {
      this.supplier_name = data.contract[0].supplier.name;
      this.dataSource.data = data.contract.map((contract: any, index: number) => {
        return {
          _id : contract._id,
          n: index + 1,
          supplier: contract.supplier,
          date_signature: contract.date_signature,
          expires_at: contract.expires_at,
          payment_status: contract.payment_status.replace(/_/g, " ")
        }

      });
    });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
