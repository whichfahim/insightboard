import { computed, effect, Injectable, signal } from '@angular/core';
import { Widget } from '../models/dashboard';
import { TotalUsersComponent } from '../pages/dashboard/widgets/total-users.component';
import { SalesDataComponent } from '../pages/dashboard/widgets/sales-data.component';
import { TasksCompletedComponent } from '../pages/dashboard/widgets/tasks-completed.component';
import { RevenueComponent } from '../pages/dashboard/widgets/revenue.component';
import { TrafficSourcesComponent } from '../pages/dashboard/widgets/traffic-sources.component';
import { DataTableComponent } from '../pages/dashboard/widgets/data-table.component';
import { TasksCompletedPercentageComponent } from '../pages/dashboard/widgets/tasks-completed-percentage.component';
import { RecentActivityComponent } from '../pages/dashboard/widgets/recent-activity.component';
import { nanoid, customAlphabet } from 'nanoid';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  widgetId = 0;

  getNextId(): number {
    return ++this.widgetId;
  }

  widgets = signal<Widget[]>([
    {
      id: this.getNextId(),
      label: 'Total Users',
      content: TotalUsersComponent,
      dataSource: 'Primary',
    },
    {
      id: this.getNextId(),
      label: 'Sales Data',
      content: SalesDataComponent,
      dataSource: 'Primary',
      columns: 2,
      rows: 1,
    },
    {
      id: this.getNextId(),
      label: 'Tasks Completed',
      content: TasksCompletedComponent,
      dataSource: 'Primary',
    },
    {
      id: this.getNextId(),
      label: 'Revenue',
      content: RevenueComponent,
      dataSource: 'Primary',
    },
    {
      id: this.getNextId(),
      label: 'Traffic Sources',
      content: TrafficSourcesComponent,
      dataSource: 'Primary',
      rows: 1,
      columns: 2,
    },
    {
      id: this.getNextId(),
      label: 'Data Table',
      content: DataTableComponent,
      dataSource: 'Primary',
    },
    {
      id: this.getNextId(),
      label: 'Tasks Completed',
      content: TasksCompletedPercentageComponent,
      dataSource: 'Primary',
    },
    {
      id: this.getNextId(),
      label: 'Recent Activity',
      content: RecentActivityComponent,
      dataSource: 'Primary',
    },
  ]);

  addedWidgets = signal<Widget[]>([]);

  widgetsToAdd = computed(() => {
    const addedIds = this.addedWidgets().map((w) => w.id);
    return this.widgets().filter((w) => !addedIds.includes(w.id));
  });

  addWidget(w: Widget) {
    this.addedWidgets.set([...this.addedWidgets(), { ...w }]);
  }

  addNewWidget(w: Widget) {
    this.widgets.set([...this.widgets(), { ...w }]);
  }

  updateWidget(id: number, widget: Partial<Widget>) {
    const index = this.addedWidgets().findIndex((w) => w.id === id);
    if (index !== -1) {
      const newWidgets = [...this.addedWidgets()];
      newWidgets[index] = { ...newWidgets[index], ...widget };
      this.addedWidgets.set(newWidgets);
    }

    const allIndex = this.widgets().findIndex((w) => w.id === id);
    if (allIndex !== -1) {
      const updatedAllWidgets = [...this.widgets()];
      updatedAllWidgets[allIndex] = {
        ...updatedAllWidgets[allIndex],
        ...widget,
      };
      this.widgets.set(updatedAllWidgets);
    }
  }

  removeWidget(id: number) {
    this.addedWidgets.set(this.addedWidgets().filter((w) => w.id !== id));
  }

  deleteWidget(id: number) {
    this.widgets.set(this.widgets().filter((w) => w.id !== id));
    this.addedWidgets.set(this.addedWidgets().filter((w) => w.id !== id));
  }

  fetchWidgets() {
    const widgetsAsString = localStorage.getItem('dashboardWidgets');
    if (widgetsAsString) {
      const widgets = JSON.parse(widgetsAsString) as Widget[];
      widgets.forEach((widget) => {
        const content = this.widgets().find((w) => w.id === widget.id)?.content;
        if (content) {
          widget.content = content;
        }
      });

      this.addedWidgets.set(widgets);
    }
  }

  fetchAllWidgets() {
    const allWidgetsString = localStorage.getItem('dashboardAllWidgets');

    if (allWidgetsString) {
      const allWidgets = JSON.parse(allWidgetsString) as Widget[];
      this.widgets.set(allWidgets);
    }
  }

  updateWidgetPosition(srcWidgetId: number, dstWidgetId: number) {
    const srcIdx = this.addedWidgets().findIndex((w) => w.id === srcWidgetId);

    if (srcIdx === -1) {
      return;
    }

    const newWidgets = [...this.addedWidgets()];
    const srcWidget = newWidgets.splice(srcIdx, 1)[0];

    const dstIdx = newWidgets.findIndex((w) => w.id === dstWidgetId);
    if (dstIdx === -1) {
      return;
    }

    const insertAt = dstIdx === srcIdx ? dstIdx + 1 : dstIdx;

    newWidgets.splice(insertAt, 0, srcWidget);

    this.addedWidgets.set(newWidgets);
  }

  constructor() {
    this.fetchWidgets();
  }

  saveWidgets = effect(() => {
    const widgetsWithoutContent: Partial<Widget>[] = this.addedWidgets().map(
      (w) => ({ ...w })
    );
    widgetsWithoutContent.forEach((w) => {
      delete w.content;
    });

    localStorage.setItem(
      'dashboardWidgets',
      JSON.stringify(widgetsWithoutContent)
    );

    const cleanedWidgets = this.widgets().map((w) => {
      const { content, ...rest } = w;
      return rest;
    });

    localStorage.setItem('dashboardAllWidgets', JSON.stringify(cleanedWidgets));
  });
}
