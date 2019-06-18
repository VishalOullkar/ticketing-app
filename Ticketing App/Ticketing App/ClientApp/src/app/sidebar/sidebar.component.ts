import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../Shared/login.service';
import { Users } from '../Models/users';
declare const openNav: any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  menus = [];

  loggedinuser: Users[];
  Email: string;
  username: string;

  constructor(private router: Router, private loginService: LoginService)  {  }

  ngOnInit() {

   this.Email=localStorage.getItem('email')
    this.username = localStorage.getItem('username')
      // console.warn(this.Email);
  }

  logout() {
    localStorage.clear();
  }


  AddUser()
  {
    this.router.navigate(['user']);
  }

}
