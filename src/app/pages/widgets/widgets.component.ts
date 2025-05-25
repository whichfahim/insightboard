import { Component, effect, inject, input, signal, Type } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Widget } from '../../models/dashboard';
import { DashboardService } from '../../services/dashboard.service';

import { FormComponent } from '../settings/form/form.component';
import { WidgetComponent } from '../../components/widget/widget.component';

@Component({
  selector: 'app-widgets',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    FormComponent,
  ],
  templateUrl: './widgets.component.html',
  styleUrl: './widgets.component.scss',
})
export class WidgetsComponent {
  store = inject(DashboardService);

  addNewWidget() {
    const newWidget: Widget = {
      id: this.store.getNextId(),
      label: 'New Widget',
      content: WidgetComponent,
      dataSource: 'API endpoint',
    };

    this.store.addNewWidget(newWidget);
  }
}
