import { NgIf } from '@angular/common';
import { Component, inject, NgModule } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-navbar',
  imports: [NgIf, NzAvatarModule, NzIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  route = inject(Router);
  userLocalDetail: any;
  tost = inject(ToastrService);
  buttonTxt: any = 'login/signIn';
  role: any;
  isMenuOpen = false;
  userId : any;

  ngOnInit() {
    // localStorage.getItem('')
    this.route.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.fetchLocal();
      }
    });
  }

  fetchLocal() {
    this.userLocalDetail = localStorage.getItem('userDetail');
    const jsonData = JSON.parse(this.userLocalDetail);
    this.role = jsonData?.role;
    this.userId = jsonData?.id;
    console.log(this.role);
    console.log(this.userLocalDetail);
  }

  checkLogin() {
    const userLocalDetail = localStorage.getItem('userDetail');
    if (userLocalDetail === null) {
      this.tost.info('You Need To Login First!!');
      this.route.navigateByUrl('/login');
    } else {
      this.route.navigateByUrl('cart');
    }
  }

  logOut() {
    localStorage.clear();
    this.tost.success('LogOut Successfully!!');
    this.route.navigateByUrl('/login');
    this.userLocalDetail = localStorage.getItem('userDetail');
  }

  handleRoute(url: any) {
    this.route.navigateByUrl(`/${url}`);
    this.isMenuOpen = false;
  }

  handleDropdownRoute(event: any) {
    const navUrl = event?.target?.value;
    this.route.navigateByUrl(`/${navUrl}`);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
