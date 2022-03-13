import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contract-details',
  templateUrl: './contract-details.component.html',
  styleUrls: ['./contract-details.component.css']
})
export class ContractDetailsComponent implements OnInit {

  constructor( private route:ActivatedRoute) { }
  contract_id : string;
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.contract_id = params.id;
    })
  }

}
