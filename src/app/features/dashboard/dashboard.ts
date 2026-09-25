import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

interface KpiCard {
  title: string;
  value: string;
  subtitle: string;
  icon: string;
  trend: string;
  trendType: 'up' | 'down' | 'neutral';
  className: string;
}

interface Customer {
  name: string;
  orders: number;
  amount: string;
  percentage: number;
}

interface Shipment {
  customer: string;
  poCount: number;
  status: string;
  days: number;
}

interface Product {
  name: string;
  quantity: number;
  percentage: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent {

  selectedTab = 'overview';

  tabs = [
    {
      id: 'overview',
      label: 'Overview',
      icon: 'dashboard'
    },
    {
      id: 'sales',
      label: 'Sales',
      icon: 'trending_up'
    },
    {
      id: 'shipments',
      label: 'Shipments',
      icon: 'local_shipping'
    },
    {
      id: 'receivables',
      label: 'Receivables',
      icon: 'account_balance_wallet'
    }
  ];

  kpiCards: KpiCard[] = [
    {
      title: 'Total Turnover',
      value: '₹10,160.53 Cr',
      subtitle: '2025 - 2026',
      icon: 'currency_rupee',
      trend: '+8.6%',
      trendType: 'up',
      className: 'purple'
    },
    {
      title: 'Current Sales',
      value: '$1.43M',
      subtitle: 'Current Financial Year',
      icon: 'payments',
      trend: '+12.4%',
      trendType: 'up',
      className: 'blue'
    },
    {
      title: 'Total Receivables',
      value: '₹43.84 Cr',
      subtitle: 'Outstanding amount',
      icon: 'account_balance',
      trend: '-4.2%',
      trendType: 'down',
      className: 'pink'
    },
    {
      title: 'Delayed Shipments',
      value: '80',
      subtitle: 'Purchase orders',
      icon: 'local_shipping',
      trend: '10 Customers',
      trendType: 'neutral',
      className: 'orange'
    }
  ];

  salesData = [
    {
      month: 'Apr',
      previous: 62,
      current: 72
    },
    {
      month: 'May',
      previous: 68,
      current: 76
    },
    {
      month: 'Jun',
      previous: 70,
      current: 81
    },
    {
      month: 'Jul',
      previous: 74,
      current: 78
    },
    {
      month: 'Aug',
      previous: 79,
      current: 88
    },
    {
      month: 'Sep',
      previous: 82,
      current: 94
    }
  ];

  turnoverData = [
    {
      label: 'Quantity MT',
      previous: 7726,
      current: 7955,
      icon: 'fitness_center'
    },
    {
      label: 'Value USD',
      previous: 75.46,
      current: 75.90,
      icon: 'attach_money'
    },
    {
      label: 'INR Crores',
      previous: 533.61,
      current: 611.22,
      icon: 'currency_rupee'
    },
    {
      label: 'Containers',
      previous: 509,
      current: 518,
      icon: 'inventory_2'
    }
  ];

  customers: Customer[] = [
    {
      name: 'Eastern Fish Company LLC',
      orders: 19,
      amount: '$245K',
      percentage: 95
    },
    {
      name: 'Atlasgate Trading LLC',
      orders: 16,
      amount: '$212K',
      percentage: 82
    },
    {
      name: 'The Fishin Company',
      orders: 15,
      amount: '$198K',
      percentage: 76
    },
    {
      name: 'LLC Unifrost',
      orders: 7,
      amount: '$124K',
      percentage: 58
    },
    {
      name: 'Matsuda Sangyo Co. Ltd.',
      orders: 5,
      amount: '$98K',
      percentage: 45
    }
  ];

  shipments: Shipment[] = [
    {
      customer: 'Eastern Fish Company LLC',
      poCount: 19,
      status: 'Delayed',
      days: 12
    },
    {
      customer: 'Atlasgate Trading LLC',
      poCount: 16,
      status: 'Delayed',
      days: 8
    },
    {
      customer: 'The Fishin Company',
      poCount: 15,
      status: 'Delayed',
      days: 7
    },
    {
      customer: 'LLC Unifrost',
      poCount: 7,
      status: 'Delayed',
      days: 5
    },
    {
      customer: 'Matsuda Sangyo Co. Ltd.',
      poCount: 5,
      status: 'Pending',
      days: 3
    }
  ];

  products: Product[] = [
    {
      name: 'Frozen Seafood',
      quantity: 38,
      percentage: 82
    },
    {
      name: 'Fish Products',
      quantity: 27,
      percentage: 65
    },
    {
      name: 'Prawns',
      quantity: 21,
      percentage: 52
    },
    {
      name: 'Other Products',
      quantity: 14,
      percentage: 36
    }
  ];

  countries = [
    {
      name: 'USA',
      orders: 42,
      flag: '🇺🇸'
    },
    {
      name: 'UAE',
      orders: 28,
      flag: '🇦🇪'
    },
    {
      name: 'Japan',
      orders: 21,
      flag: '🇯🇵'
    },
    {
      name: 'China',
      orders: 18,
      flag: '🇨🇳'
    },
    {
      name: 'Germany',
      orders: 12,
      flag: '🇩🇪'
    }
  ];

  receivables = {
    total: '₹43.84 Cr',
    fdaCleared: '₹21.51 Cr',
    dueAmount: '₹22.07 Cr'
  };

  setTab(tab: string): void {
    this.selectedTab = tab;
  }

  getBarHeight(value: number): number {
    return Math.min(value, 100);
  }
}