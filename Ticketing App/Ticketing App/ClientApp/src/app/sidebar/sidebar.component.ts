import { Component, OnInit } from '@angular/core';
import { SidebarService } from './sidebar.service';
import { Router } from '@angular/router';
declare const openNav: any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  menus = [];

  constructor(public sidebarservice: SidebarService, private router: Router) {
    this.menus = sidebarservice.getMenuList();
  }
  //public displayNav: boolean = false;
  ngOnInit() {
  }

  //openNav() {
  //  this.displayNav = true;
  //}

  //closeNav() {
  //  this.displayNav = false;
  //}

  logout() {
    localStorage.clear();
  }


  getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }

  toggle(currentMenu) {
    if (currentMenu.type === 'dropdown') {
      this.menus.forEach(element => {
        if (element === currentMenu) {
          currentMenu.active = !currentMenu.active;
        } else {
          element.active = false;
        }
      });
    }
  }
  AddUser()
  {
    this.router.navigate(['user']);
  }

  getState(currentMenu) {

    if (currentMenu.active) {
      return 'down';
    } else {
      return 'up';
    }
  }

  hasBackgroundImage() {
    return this.sidebarservice.hasBackgroundImage;
  }

}
