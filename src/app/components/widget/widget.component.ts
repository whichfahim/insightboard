import { Component, input, signal } from '@angular/core';
import { Widget } from '../../models/dashboard';
import { NgComponentOutlet } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { WidgetOptionsComponent } from './widget-options/widget-options.component';

@Component({
  selector: 'app-widget',
  standalone: true,
  imports: [
    NgComponentOutlet,
    MatButtonModule,
    MatIcon,
    WidgetOptionsComponent,
  ],
  templateUrl: './widget.component.html',
  styleUrl: './widget.component.scss',
  host: {
    '[style.grid-area]':
      '"span " + (data().rows ?? 1) + "/ span " + (data().columns ?? 1)',
  },
})
export class WidgetComponent {
  data = input.required<Widget>();

  showOptions = signal(false);
}
