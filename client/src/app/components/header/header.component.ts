import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/services/shared.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userName: string = '';
  updateEventSubscription: Subscription;
  constructor(
    private usersService: UsersService,
    private sharedService: SharedService,
    private router: Router
  ) {
    this.updateEventSubscription = this.sharedService.getComponentUpdateEvent().subscribe(() => this.getUserName());
  }

  ngOnInit(): void {
    this.getUserName();    
  }

  getUserName() {
    this.usersService.defineCurrentUser().subscribe(user => this.userName = `${user.name.first} ${user.name.second}`);
  }
  
  onLogOut() {
    this.userName = '';
    this.usersService.logOutHandle();
    this.sharedService.sendComponentUpdateEvent();
    this.router.navigate(['/home']);
  }

}
