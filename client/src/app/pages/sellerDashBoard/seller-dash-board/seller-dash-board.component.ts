import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-seller-dash-board',
  imports: [
    CommonModule,
    NzBreadCrumbModule,
    NzIconModule,
    NzMenuModule,
    NzLayoutModule,
    RouterLink,
    RouterOutlet,
  ],
  templateUrl: './seller-dash-board.component.html',
  styleUrl: './seller-dash-board.component.css',
})
export class SellerDashBoardComponent {
  isCollapsed = false;
  ngOnInit() {}
}
