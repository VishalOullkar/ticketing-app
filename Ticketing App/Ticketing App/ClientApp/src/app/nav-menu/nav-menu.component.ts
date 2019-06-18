import { Component } from '@angular/core';
declare const myMethod: any;
declare const popUp: any;

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  logout()
  {
    localStorage.clear();
  }

  onClick() {
    popUp();
  }


  ngOnInit() {
   // myMethod();
   // load();
  }
}
