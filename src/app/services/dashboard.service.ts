import { computed, Injectable, signal } from '@angular/core';
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
  constructor() {}
}
