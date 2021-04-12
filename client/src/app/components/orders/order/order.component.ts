import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/services/users/user';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  currentUser: User;
  @Input() city = '';
  @Input() street = '';
  @Input() date = '';
  @Input() creditCard = '';
  citiesList = ['Jerusalem', 'Tel Aviv', 'Haifa', 'Rishon Le-Tsion', 'Petah Tiqwa', 'Ashdod', 'Netanya', 'Beer Sheva', 'Holon', 'Ramat  Gan'];



  constructor(
    private usersService: UsersService
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
    const data = {
      city: this.city,
      street: this.street,
      date: this.date,
      creditCard: this.creditCard
    }
    console.log(data);
  }

}
