import { Component, effect, inject, input } from '@angular/core';

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
import { DashboardService } from '../../../services/dashboard.service';
import { Widget } from '../../../models/dashboard';

@Component({
  selector: 'app-form',
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
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  store = inject(DashboardService);
  data = input.required<Widget>();

  settingsForm = new FormGroup({
    label: new FormControl('', [Validators.pattern('[a-zA-Z ]*')]),
    dataSource: new FormControl('API endpoint'),
  });

  widgets: Widget[];

  constructor() {
    effect(() => {
      let widget: Widget;
      try {
        widget = this.data();
      } catch {
        console.log('returned');
        return;
      }

      this.settingsForm.patchValue({
        label: widget?.label,
        // Only if widget includes dataSource
        dataSource: (widget as any).dataSource ?? '',
      });
    });
  }

  deleteWidget(event: Event) {
    this.store.deleteWidget(this.data().id);
  }

  onSubmit(event: Event) {
    if (!this.data()) throw new Error('Widget input not set yet');
    if (this.settingsForm.valid) {
      const updatedValues = this.settingsForm.value;
      const widgetUpdate: Partial<Widget> = {
        label: updatedValues.label ?? undefined,
      };
      this.store.updateWidget(this.data().id, widgetUpdate);
    }
  }
}
