import { Component, inject } from '@angular/core';
import { AuthservService } from '../../../core/services/auth/authserv.service';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
@Component({
  selector: 'app-user-list',
  imports: [CommonModule, NzTableModule,NzPaginationModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent {
  authService = inject(AuthservService);
  userList: any = [];
  sellerList: any = [];
  ngOnInit() {
    this.fetchAllUsers();
  }

  async fetchAllUsers() {
    try {
      const result = await this.authService.getAllUsersForAdmin();
      this.sellerList = result[0];
      this.userList = result[1];
      console.log(this.userList, this.sellerList);

      // console.log(this.userList);
    } catch (error) {
      console.log(error);
    }
  }
}
