import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContractsService } from 'src/app/services/contracts.service';

@Component({
  selector: 'app-contract-details',
  templateUrl: './contract-details.component.html',
  styleUrls: ['./contract-details.component.css']
})
export class ContractDetailsComponent implements OnInit {

  constructor( private route:ActivatedRoute , private contractService : ContractsService) { }
  contract_id : string;
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.contract_id = params.id;
    });
    this.getContractById();
  }

  getContractById(){
    this.contractService.getContractById(this.contract_id).subscribe(
      (res: any) => {
        console.log(res);
      });
  }

}
