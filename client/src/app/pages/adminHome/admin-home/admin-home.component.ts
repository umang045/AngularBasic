import { Component, inject } from '@angular/core';
import { AuthservService } from '../../../core/services/auth/authserv.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-home',
  imports: [NgxChartsModule, CommonModule],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css',
})
export class AdminHomeComponent {
  authService = inject(AuthservService);
  totalUser: any;
  adminTotalOrder: any = 0;
  adminTotalSell: any = 0;
  adminTotalProducts: any = 0;

  yr = [
    {
      name: 2023,
      series: [
        { name: 'January', value: 55000 },
        { name: 'February', value: 65000 },
        { name: 'March', value: 75000 },
        { name: 'April', value: 85000 },
        { name: 'May', value: 95000 },
        { name: 'June', value: 105000 },
        { name: 'July', value: 11500 },
        { name: 'August', value: 125000 },
        { name: 'September', value: 1300 },
        { name: 'October', value: 145000 },
        { name: 'November', value: 155000 },
        { name: 'December', value: 165000 },
      ],
    },
  ];
  years = [
    {
      name: 2022,
      series: [
        { name: 'January', value: 55000 },
        { name: 'February', value: 65000 },
        { name: 'March', value: 75000 },
        { name: 'April', value: 85000 },
        { name: 'May', value: 95000 },
        { name: 'June', value: 105000 },
        { name: 'July', value: 11500 },
        { name: 'August', value: 125000 },
        { name: 'September', value: 1300 },
        { name: 'October', value: 145000 },
        { name: 'November', value: 155000 },
        { name: 'December', value: 165000 },
      ],
    },
    {
      name: 2023,
      series: [
        { name: 'January', value: 55000 },
        { name: 'February', value: 65000 },
        { name: 'March', value: 75000 },
        { name: 'April', value: 85000 },
        { name: 'May', value: 9500 },
        { name: 'June', value: 10500 },
        { name: 'July', value: 11500 },
        { name: 'August', value: 12500 },
        { name: 'September', value: 13009 },
        { name: 'October', value: 145000 },
        { name: 'November', value: 155000 },
        { name: 'December', value: 165000 },
      ],
    },
    {
      name: 2024,
      series: [
        { name: 'January', value: 55000 },
        { name: 'February', value: 65000 },
        { name: 'March', value: 75000 },
        { name: 'April', value: 85000 },
        { name: 'May', value: 95000 },
        { name: 'June', value: 105000 },
        { name: 'July', value: 1150 },
        { name: 'August', value: 12500 },
        { name: 'September', value: 1300 },
        { name: 'October', value: 14500 },
        { name: 'November', value: 155000 },
        { name: 'December', value: 165000 },
      ],
    },
  ];

  yrr: any = [];
  single: any = [];
  // yr: any = [];
  // years: any = [];
  // yrr: any = [];

  view: any = [900, 400];
  view1: any = [300, 300];

  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Months';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Sell';
  legendTitle: string = 'Months';
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: any = 'below';

  colorScheme: any = {
    domain: ['#5AA454', '#C7B42C', '#AAAAAA'],
  };

  orderColorScheme: any = {
    domain: ['yellow', 'red', 'green', 'orange', 'gray'],
  };

  constructor() {
    Object.assign(this.yr);
  }

  ngOnInit() {
    this.getTotalSell();
    this.getStausOfOrders();
    this.fetchTotalUser();
    this.fetchTotalOrderForAdmin();
    this.fetchTotalProdForAdmin();
    this.fetchTotalSellForAdmin();
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  onYearChange(name: any) {
    const selectedName = name?.target?.value;
    for (let index = 0; index < this.years.length; index++) {
      if (this.years[index]?.name == selectedName) {
        this.yr = [];
        this.yr.push(this.years[index]);
        break;
      }
    }
  }

  async getStausOfOrders() {
    try {
      const result = await this.authService.getOrderStatusCountForAdmin();
      this.single = result.map((item: any) => ({
        name: item.status,
        value: item.count,
      }));
    } catch (error) {
      console.log(error);
    }
  }

  async getTotalSell() {
    try {
      const result = await this.authService.getSellersYearWiseSell();
      // const salesData = result.reduce((acc: any, item: any) => {
      //   let year = acc.find((y: any) => y.name === item.year);
      //   if (!year) {
      //     year = { name: item.year, series: [] };
      //     acc.push(year);
      //   }
      //   year.series.push({ name: item.month, value: item.total_sales });
      //   return acc;
      // }, []);
    } catch (error) {
      console.log(error);
    }
  }

  async fetchTotalUser() {
    try {
      const result = await this.authService.getCountedTotalUsers();
      this.totalUser = result[0]?.totalusers;
    } catch (error) {
      console.log(error);
    }
  }

  async fetchTotalOrderForAdmin() {
    try {
      const result = await this.authService.getAllOrderForAdmin();
      this.adminTotalOrder = result?.totalSellersOrder;
      // console.log(result?.totalSellersOrder);
    } catch (error) {
      console.log(error);
    }
  }

  async fetchTotalSellForAdmin() {
    try {
      const result = await this.authService.getAllSellForAdmin();
      this.adminTotalSell = result?.totalSellerSell;
      console.log(result?.totalSellerSell);
    } catch (error) {
      console.log(error);
    }
  }

  async fetchTotalProdForAdmin() {
    try {
      const result = await this.authService.getAllProdForAdmin();
      this.adminTotalProducts = result?.totalSellerProd;
    } catch (error) {
      console.log(error);
    }
  }
}
