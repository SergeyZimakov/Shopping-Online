import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-panel',
  templateUrl: './info-panel.component.html',
  styleUrls: ['./info-panel.component.css']
})
export class InfoPanelComponent implements OnInit {
  numberOfOrdersInStore: number = 0;
  numberOfProductsInStore: number = 0;
  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.http.get<any>('/api/products/totalamount').subscribe(res => {
      if (res.err) {
        console.log(res.err);
      } else {
        this.numberOfProductsInStore = res.amount;
      }
    });
    this.http.get<any>('/api/orders/totalamount').subscribe(res => {
      if (res.err) {
        console.log(res.err);
      } else {
        this.numberOfOrdersInStore = res.amount;
      }
    });
  }

}
