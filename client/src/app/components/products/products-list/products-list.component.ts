import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  
  updateListSubsription: Subscription;

  constructor(
    private http: HttpClient,
    private sharedService: SharedService,
    private router: Router,
    ) {
      this.updateListSubsription = this.sharedService.getUpdateListEvent().subscribe(() => {
        this.router.navigate(['/products']);
      })
    }

  ngOnInit(): void {
    
  }

}
