import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';

import { AdminRoutingModule } from './admin-routing.module';
import { NavAdminComponent } from './nav-admin/nav-admin.component';
import { RequestsComponent } from './requests/requests.component';
import { UsersComponent } from './users/users.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ValidateReqComponent } from './requests/validate-req/validate-req.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { AddContractComponent } from './suppliers/add-contract/add-contract.component';
import { ContractsComponent } from './contracts/contracts.component';
import { ContractDetailsComponent } from './contracts/contract-details/contract-details.component';
import { SupplierDetailsComponent } from './suppliers/supplier-details/supplier-details.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { InvoicesDetailsComponent } from './invoices/invoices-details/invoices-details.component';


@NgModule({
  declarations: [
    NavAdminComponent,
    RequestsComponent,
    UsersComponent,
    ValidateReqComponent,
    SuppliersComponent,
    AddContractComponent,
    ContractsComponent,
    ContractDetailsComponent,
    SupplierDetailsComponent,
    InvoicesComponent,
    InvoicesDetailsComponent,

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    PdfViewerModule
  ]
})
export class AdminModule { }
