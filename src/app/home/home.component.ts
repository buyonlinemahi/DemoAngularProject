import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { UserService } from '../shared/user.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  userDetails;
  private sub: any;
  constructor(private router: Router,
              private ActiveRoute: ActivatedRoute,
              private service: UserService) { }

  ngOnInit() {
    if (this.service.loginFormData !== undefined)   {
this.userDetails = this.service.loginFormData;
    } else {
       // tslint:disable-next-line: radix
       this.getForUserProfile(parseInt(localStorage.getItem('tokenU')));
    }
  }

onLogOut() {
  localStorage.removeItem('token');
  localStorage.removeItem('tokenU');
  this.router.navigate(['/user/login']);
}

getForUserProfile(UserId: number) {
  this.service.getUserProfile(UserId).subscribe(
    res => {
      this.userDetails = Object.assign({}, res);
    },
    err => {
      console.log(err);
    },
  );
}
}
