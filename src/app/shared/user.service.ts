import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Login } from './login.model';



@Injectable({
  providedIn: 'root'
})
export class UserService {
   loginFormData: Login;
  constructor(private fb: FormBuilder, private http: HttpClient) { }

  formModel = this.fb.group({
    UserName: ['', Validators.required],
    EmailId: ['', Validators.email],
    FirstName: [''],
    LastName: [''],
    Passwords: this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword: ['', Validators.required],
    }, { validators: this.comparePasswords })
  });
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  comparePasswords(fb: FormGroup) {
    const confirmPswrdCtrl = fb.get('ConfirmPassword');
    if (confirmPswrdCtrl.errors === null || 'passwordMisMatch' in confirmPswrdCtrl.errors) {
      if (fb.get('Password').value !== confirmPswrdCtrl.value) {
        confirmPswrdCtrl.setErrors({ passwordMisMatch: true });
      } else {
        confirmPswrdCtrl.setErrors(null);
      }
    }
  }

  register() {
    const body = {
      UserName: this.formModel.value.UserName,
      EmailId: this.formModel.value.EmailId,
      FirstName: this.formModel.value.FirstName,
      LastName: this.formModel.value.LastName,
      Password: this.formModel.value.Passwords.Password,
    };
    return this.http.post(environment.apiURL + '/User/AddUser/{usersParam}', body);

  }
  login(formData) {
    const body = {
     ...this.loginFormData
    };
    return this.http.post(environment.apiURL + '/User/Login/{userParam}', JSON.stringify(formData), this.headers);
  }

  getUserProfile(id: number) {
    return this.http.get(environment.apiURL + '/User/GetUserByID/' + id);
  }
}

