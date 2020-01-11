import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styles: []
})
export class RegistrationComponent implements OnInit {

  constructor(public service: UserService) { }
  show: boolean ;
  ngOnInit() {
    this.show = false;
    this.service.formModel.reset();
  }
  onSubmit() {
    this.show = !this.show;
    this.service.register().subscribe(
      (res: any) => {
        if (res.succeeded) {
          this.service.formModel.reset();
          alert('Signup successfully!!');
        } else {
          res.errors.forEach(element => {
            switch (element.code) {
              case 'DuplicateUserName':
                alert('Username is already taken');
                this.show = false;
                break;
              default:
                break;
            }
          });
        }
      },
      err => {
        this.show = false;
        console.log(err);
      }
    );
  }
}
