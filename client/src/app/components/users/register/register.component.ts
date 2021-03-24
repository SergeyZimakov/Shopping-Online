import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  registerStatus: string = 'first';
  errors: string[] = [];
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  passToStep2() {
    const data = {
      id: this.id,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword
    }
    console.log(data);
    this.http.post<any>('http://localhost:8080/api/users/register/step1', data).subscribe(res => {
      this.errors = res;
      if (this.errors.length === 0) {
      console.log('passing to step2');
      this.registerStatus = 'second';
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
    console.log(data);
    
    this.http.post<any>('http://localhost:8080/api/users/register/step2', data).subscribe(res => {
      if (res[0] !== 'User successfuly registered') {
        this.errors = res;
      }
      else {
        console.log('User succefully registered');
        this.router.navigate(['/home']);
      }
    });
    
  }

}
