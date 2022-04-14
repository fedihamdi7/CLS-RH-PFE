import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Leave } from 'src/app/models/leave.model';
import { leavesEmployeeTable } from 'src/app/models/tables.model';
import { LeaveService } from 'src/app/services/leave.service';

const ELEMENT_DATA: leavesEmployeeTable[] = [];

@Component({
  selector: 'app-leave-archive',
  templateUrl: './leave-archive.component.html',
  styleUrls: ['./leave-archive.component.css']
})
export class LeaveArchiveComponent implements OnInit , AfterViewInit {
  displayedColumns: string[] = ['n','sender', 'sent_date','leave_start_date','leave_end_date','leave_days','status', 'type'];
  dataSource = new MatTableDataSource<leavesEmployeeTable>(ELEMENT_DATA);
  constructor(private leaveService:LeaveService) { }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.leaveService.getArchivedLeaves().subscribe((res:Leave[]) => {
      console.log(res);
      
      this.dataSource.data = res.map((res:Leave, index:number) => {
        return {
          id : res._id,
          n : index + 1,
          from : res.from.lastName + " " + res.from.firstName,
          sent_date : res.sent_date,
          leave_start_date : res.leave_start_date,
          leave_end_date : res.leave_end_date,
          leave_days : res.leave_days,
          type : res.type,
          status : res.status,
          file : res.file
        }
      });
    })
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
