import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../Shared/login.service';
import { Users } from '../Models/users';
import { strictEqual } from 'assert';
import { UserDetails } from '../Models/UserDetails';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model = new UserDetails('', '');
  Conditionhide: boolean = true;
  constructor(private router: Router, private loginService: LoginService) {

    //this.OnSubmit(username, Email)
    //{

    //}




  }

  SelectedUser: Users[];
  msg: string;

  ngOnInit() {
  }


  checkusernameandpassword(uname: string, pwd: string) {
    console.warn(this.SelectedUser[0].EmailId);
    if ((uname == this.SelectedUser[0].EmailId) && (pwd == this.SelectedUser[0].Password)) {
      localStorage.setItem('username', this.SelectedUser[0].Username);
      this.Conditionhide = true;
      return true;
    }
    else {
      this.Conditionhide = false;
      return false;
    }
  }



  OnSubmit(userName, password) {
    console.log(userName)
    console.log(password)
    let Username = userName.trim();
    let Password = password.trim();

    //this.loginService.getAuthenticatedUser(Username, Password)
    //  .subscribe(res => {
    //    this.SelectedUser = res;
    //    console.log(this.SelectedUser.EmailId);
    //  })

    this.loginService.getAuthenticatedUser(Username, Password)
      .subscribe(res => {
        this.SelectedUser = res;

        if (this.SelectedUser.length == 0) {

          this.Conditionhide = false;
          setTimeout(function () {
            this.Conditionhide = true;
          }.bind(this), 3000);

        }
        else {

          var output = this.checkusernameandpassword(Username, Password)

          if (output == true) {
            localStorage.setItem('username', this.SelectedUser[0].Username);

            this.router.navigate(['/incidentSupport'])
          }
          else if (userName.trim() == "" && password.trim() == "") {
            this.msg = "Please enter the username or Password"
          }
          else {
            this.msg = "Invalid username or password"
          }
        }
      })



    //console.log(this.loginService.SelectedUser);

    //console.warn(this.loginService.testvariable);


    //    var output = this.loginService.IsLogin(Username, Password);



    //var output =this.loginService.checkusernameandpassword(Username,Password)


  }
  //if ((userName.trim() == "" && password.trim() == "")) {
  //  this.msg = "Please enter the username or Password"
  //  console.warn(this.msg);
  //}
  //else if ((userName.trim() == "vishal" && password.trim() == "123")) {
  //  this.router.navigate(['/incidentSupport'])
  //  console.warn('Welcome to application');
  //}
  //else if ((userName.trim() == "admin" && password.trim() == "123")) {
  //  this.router.navigate(['/incidentSupport'])
  //  console.warn('Welcome to application');
  //}
  //else {
  //  this.msg = "Invalid username or password"
  //  console.warn('Invalid username or password');
  //}





}
