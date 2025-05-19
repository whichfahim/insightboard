import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { WidgetComponent } from '../../components/widget/widget.component';
import { identity } from 'rxjs';
import { Widget } from '../../models/dashboard';
import { DashboardService } from '../../services/dashboard.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { wrapGrid } from 'animate-css-grid';

@Component({
  selector: 'app-dashboard',
  imports: [WidgetComponent, MatButtonModule, MatIcon, MatMenuModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: [DashboardService],
})
export class DashboardComponent {
  store = inject(DashboardService);

  dashboard = viewChild.required<ElementRef>('dashboard');

  ngOnInit() {
    wrapGrid(this.dashboard().nativeElement, { duration: 300 });
  }
}
