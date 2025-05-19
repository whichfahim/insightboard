import { computed, Injectable, signal } from '@angular/core';
import { Widget } from '../models/dashboard';
import { TotalUsersComponent } from '../pages/dashboard/widgets/total-users.component';
import { SalesDataComponent } from '../pages/dashboard/widgets/sales-data.component';
import { TasksCompletedComponent } from '../pages/dashboard/widgets/tasks-completed.component';
import { RevenueComponent } from '../pages/dashboard/widgets/revenue.component';

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
    {
      id: 3,
      label: 'Tasks Completed',
      content: TasksCompletedComponent,
    },
    {
      id: 4,
      label: 'Revenue',
      content: RevenueComponent,
    },
  ]);

  addedWidgets = signal<Widget[]>([
    {
      id: 1,
      label: 'Total Users',
      content: TotalUsersComponent,
      rows: 2,
      columns: 2,
    },
    {
      id: 2,
      label: 'Sales Data',
      content: SalesDataComponent,
    },
  ]);
  widgetsToAdd = computed(() => {
    const addedIds = this.addedWidgets().map((w) => w.id);
    return this.widgets().filter((w) => !addedIds.includes(w.id));
  });

  addWidget(w: Widget) {
    this.addedWidgets.set([...this.addedWidgets(), { ...w }]);
  }

  updateWidget(id: number, widget: Partial<Widget>) {
    const index = this.addedWidgets().findIndex((w) => w.id === id);
    if (index !== -1) {
      const newWidgets = [...this.addedWidgets()];
      newWidgets[index] = { ...newWidgets[index], ...widget };
      this.addedWidgets.set(newWidgets);
    }
  }

  removeWidget(id: number) {
    this.addedWidgets.set(this.addedWidgets().filter((w) => w.id !== id));
  }
  constructor() {}
}
