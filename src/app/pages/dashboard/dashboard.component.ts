import { Component, inject } from '@angular/core';
import { WidgetComponent } from '../../components/widget/widget.component';
import { identity } from 'rxjs';
import { Widget } from '../../models/dashboard';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  imports: [WidgetComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: [DashboardService],
})
export class DashboardComponent {
  store = inject(DashboardService);
}
