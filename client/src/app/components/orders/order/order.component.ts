import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';
import { User } from 'src/app/services/users/user';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orderPopUpWindowClass = 'orderPopUpWindow hide';
  orderId = '';
  orderErrors = [];
  currentUser: User;
  @Input() city = '';
  @Input() street = '';
  @Input() date = '';
  @Input() creditCard = '';
  citiesList = ['Jerusalem', 'Tel Aviv', 'Haifa', 'Rishon Le-Tsion', 'Petah Tiqwa', 'Ashdod', 'Netanya', 'Beer Sheva', 'Holon', 'Ramat  Gan'];



  constructor(
    private usersService: UsersService,
    private ordersService: OrdersService,
    private router: Router
  ) { this.currentUser = this.usersService.getEmptyUser() }

  ngOnInit(): void {
    this.usersService.defineCurrentUser().subscribe(user => this.currentUser = user)
  }

  fillStreetInput() {
    this.street = this.currentUser.address.street;
  }

  fillCityInput() {
    this.city = this.currentUser.address.city;
  }


  submitOrder() {
    this.orderErrors = [];
    const data = {
      city: this.city,
      street: this.street,
      date: this.date,
      creditCard: this.creditCard
    }
    this.ordersService.orderSubmit(data).subscribe(res => {
      if (res.errors) {
        this.orderErrors = res.errors;
      }
      else if (res.orderId) {
        this.orderId = res.orderId;
        this.orderPopUpWindowClass = 'orderPopUpWindow show';
        
      }

    })
  }

  onDownloadCheck() {
    this.ordersService.downloadCheck(this.orderId).subscribe();
  }
  
  navToHome() {
    this.router.navigate(['/home']);
  }

}
