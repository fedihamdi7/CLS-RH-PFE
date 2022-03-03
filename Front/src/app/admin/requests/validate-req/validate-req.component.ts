import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-validate-req',
  templateUrl: './validate-req.component.html',
  styleUrls: ['./validate-req.component.css']
})
export class ValidateReqComponent implements OnInit {
  id: string;
  constructor( private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
  }

}
