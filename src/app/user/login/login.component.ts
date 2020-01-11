import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  formModel = {
    UserName: '',
    FirstName: '',
    LastName: '',
    EmailId: '',
    Password: '',

  };
  constructor(private service: UserService, private router: Router) { }
  show: boolean ;
  ngOnInit() {
    this.show = false;
    if (localStorage.getItem('token') != null) {
      this.router.navigateByUrl('/home');
    }
  }
  onSubmit(form: NgForm) {
    this.show = !this.show;
    this.service.login(form.value).subscribe(
      (res: any) => {
        this.show = false;
        this.service.loginFormData =  res;
        localStorage.setItem('token', res.token);
        localStorage.setItem('tokenU', res.UserId);
        this.router.navigateByUrl('/home');
      },
      err => {
        if (err.status === 400) {
          alert('Incorrect username or password');
          this.show = false;
        } else {
          console.log(err);
        }
      }
    );

  }
}
