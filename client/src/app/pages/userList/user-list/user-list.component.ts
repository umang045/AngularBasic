import { Component, inject } from '@angular/core';
import { AuthservService } from '../../../core/services/auth/authserv.service';

@Component({
  selector: 'app-user-list',
  imports: [],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent {
  authService = inject(AuthservService);
  userList: any = [];
  ngOnInit() {
    this.fetchAllUsers();
  }

  async fetchAllUsers() {
    try {
      const result = await this.authService.getAllUsersForAdmin();
      // console.log(result);
      this.userList = result[1];
      console.log(this.userList);
    } catch (error) {
      console.log(error);
    }
  }
}
