import { Injectable, signal } from '@angular/core';
import { Widget } from '../models/dashboard';
import { TotalUsersComponent } from '../pages/dashboard/widgets/total-users.component';
import { SalesDataComponent } from '../pages/dashboard/widgets/sales-data.component';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  widgets = signal<Widget[]>([
    {
      id: 1,
      label: 'Total Users',
      content: TotalUsersComponent,
    },
    {
      id: 2,
      label: 'Sales Data',
      content: SalesDataComponent,
    },
  ]);
  constructor() {}
}
