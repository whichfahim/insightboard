import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { WidgetsComponent } from './pages/widgets/widgets.component';
import { TestApiComponent } from './components/test-api/test-api.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
  {
    path: 'widgets',
    component: WidgetsComponent,
  },
  {
    path: 'testapi',
    component: TestApiComponent,
  },
];
