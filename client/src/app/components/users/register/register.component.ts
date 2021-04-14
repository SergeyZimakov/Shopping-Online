import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Input() id: string ='';
  @Input() email: string ='';
  @Input() password: string ='';
  @Input() confirmPassword: string ='';
  @Input() firstName: string ='';
  @Input() secondName: string ='';
  @Input() city: string ='';
  @Input() street: string ='';
  registerStep: string = 'first';
  errors: string[] = [];
  citiesList = ['Jerusalem', 'Tel Aviv', 'Haifa', 'Rishon Le-Tsion', 'Petah Tiqwa', 'Ashdod', 'Netanya', 'Beer Sheva', 'Holon', 'Ramat  Gan'];
  constructor(
    private http: HttpClient,
    private router: Router,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
  }

  backToStep1() {
    this.registerStep = 'first';
  }

  passToStep2() {
    const data = {
      id: this.id,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword
    }
    this.http.post<any>('/api/users/register/step1', data).subscribe(res => {     
      if (res.err) {
        this.errors.push('Something went wrong');
      }
      else {
        if (res.validatorErrors.length === 0) {
          this.errors = [];
          this.registerStep = 'second';
        } else {
          this.errors = res.validatorErrors;
        }
      }
    });
  }
  onRegisterSubmit() {
    const data = {
      id: this.id,
      name: {
        first: this.firstName,
        second: this.secondName,
      },
      address: {
        city: this.city,
        street: this.street
      },
      email: this.email,
      password: this.password,
    }
    this.http.post<any>('/api/users/register/step2', data).subscribe(res => {
      if (res.err) {
        this.errors.push('Something went wrong');
      }
      else {
        if (res.validatorErrors) {
          this.errors = res.validatorErrors;
        } else {
          this.errors = [];
          console.log(res.msg);
          this.sharedService.sendComponentUpdateEvent();
          this.router.navigate(['/home']);
        }
      }
    });
  }
}
