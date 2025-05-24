import { computed, inject, signal } from '@angular/core';
import { signalStore, withState, patchState } from '@ngrx/signals';
import {
  withEntities,
  addEntities,
  updateEntity,
  removeEntity,
} from '@ngrx/signals/entities';
import { withComputed, withHooks, withMethods } from '@ngrx/signals';
import { DashboardService } from '../../services/dashboard.service';
import { Widget } from '../../models/dashboard';
import { TotalUsersComponent } from './widgets/total-users.component';
import { SalesDataComponent } from './widgets/sales-data.component';
import { TasksCompletedComponent } from './widgets/tasks-completed.component';
import { RevenueComponent } from './widgets/revenue.component';
import { TrafficSourcesComponent } from './widgets/traffic-sources.component';
import { DataTableComponent } from './widgets/data-table.component';
import { TasksCompletedPercentageComponent } from './widgets/tasks-completed-percentage.component';
import { RecentActivityComponent } from './widgets/recent-activity.component';
import { switchMap } from 'rxjs/operators';

const allWidgets = [
  {
    id: 1,
    label: 'Total Users',
    content: TotalUsersComponent,
    dataSource: 'Primary',
  },
  {
    id: 2,
    label: 'Sales Data',
    content: SalesDataComponent,
    dataSource: 'Primary',
    columns: 2,
    rows: 1,
  },
  {
    id: 3,
    label: 'Tasks Completed',
    content: TasksCompletedComponent,
    dataSource: 'Primary',
  },
  { id: 4, label: 'Revenue', content: RevenueComponent, dataSource: 'Primary' },
  {
    id: 5,
    label: 'Traffic Sources',
    content: TrafficSourcesComponent,
    dataSource: 'Primary',
    rows: 1,
    columns: 2,
  },
  {
    id: 6,
    label: 'Data Table',
    content: DataTableComponent,
    dataSource: 'Primary',
  },
  {
    id: 7,
    label: 'Tasks Completed',
    content: TasksCompletedPercentageComponent,
    dataSource: 'Primary',
  },
  {
    id: 8,
    label: 'Recent Activity',
    content: RecentActivityComponent,
    dataSource: 'Primary',
  },
];

export type DashboardState = {
  order: number[];
};

const initialState: DashboardState = {
  order: [],
};

export const DashboardStore = signalStore(
  withState(initialState),
  withEntities<Widget>({ idKey: 'id' }),
  withComputed(({ entities, order, entityMap }) => ({
    widgetsToAdd: computed(() => {
      const addedIds = entities().map((w) => w.id);
      return allWidgets.filter((w) => !addedIds.includes(w.id));
    }),
    addedWidgets: computed(() => {
      return order()
        .map((id) => entityMap()[id])
        .filter(Boolean);
    }),
  })),
  withMethods((store, dashboardService = inject(DashboardService)) => ({
    fetchWidgets() {
      const layout = dashboardService.fetchWidgets();
      const order = dashboardService.fetchOrder();
      patchState(store, addEntities(layout));
      patchState(store, { order });
    },

    addWidget(widget: Widget) {
      patchState(store, addEntities([widget]));
      patchState(store, (state) => ({ order: [...state.order, widget.id] }));
    },

    updateWidget(id: number, update: Partial<Widget>) {
      patchState(store, updateEntity({ id, changes: update }));
    },

    removeWidget(id: number) {
      patchState(store, removeEntity({ id }));
      patchState(store, (state) => ({
        order: state.order.filter((i) => i !== id),
      }));
    },

    updateWidgetPosition(srcId: number, dstId: number) {
      patchState(store, (state) => {
        const currentOrder = [...state.order];
        const srcIdx = currentOrder.indexOf(srcId);
        const dstIdx = currentOrder.indexOf(dstId);
        if (srcIdx === -1 || dstIdx === -1) return state;

        const [moved] = currentOrder.splice(srcIdx, 1);
        currentOrder.splice(dstIdx, 0, moved);

        return { order: currentOrder };
      });
    },

    saveWidgets: rxMethod<Widget[]>(
      switchMap((widgets) => dashboardService.saveWidgets(widgets))
    ),

    saveOrder: rxMethod<number[]>(
      switchMap((order) => dashboardService.saveOrder(order))
    ),
  })),

  withHooks({
    onInit(store) {
      store.fetchWidgets();
      store.saveWidgets(store.entities());
      store.saveOrder(store.order());
    },
  })
);
