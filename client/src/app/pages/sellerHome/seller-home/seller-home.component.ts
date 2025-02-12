import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-seller-home',
  imports: [CommonModule, NgxChartsModule],
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css',
})
export class SellerHomeComponent {
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

  single = [
    {
      name: 'pending',
      value: 8940000,
    },
    {
      name: 'Dispatched',
      value: 5000000,
    },
    {
      name: 'Out for delivery',
      value: 7200000,
    },
    {
      name: 'Deliverd',
      value: 6200000,
    },
  ];

  yrr: any = [];

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

  orderColorScheme:any = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor() {
    Object.assign(this.yr);
    // this.yrr.push(this.years[0]);
    // console.log(this.years[0], this.yr, this.yrr);
    // this.onYearChange()
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
}
