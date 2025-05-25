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
import { Widget } from '../../models/dashboard';
import { DashboardService } from '../../services/dashboard.service';

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
  ],
  templateUrl: './widgets.component.html',
  styleUrl: './widgets.component.scss',
})
export class WidgetsComponent {
  settingsForm = new FormGroup({
    label: new FormControl('', [Validators.pattern('[a-zA-Z ]*')]),
    dataSource: new FormControl(''),
  });
  store = inject(DashboardService);
  data = input.required<Widget>();

  widgets: Widget[] = this.store.addedWidgets();

  constructor() {
    effect(() => {
      const widget = this.data();
      this.settingsForm.patchValue({
        label: widget.label,
        // Only if widget includes dataSource
        dataSource: (widget as any).dataSource ?? '',
      });
    });
  }

  onSubmit(event: Event) {
    // console.log('submitted');
    if (this.settingsForm.valid) {
      const updatedValues = this.settingsForm.value;
      const widgetUpdate: Partial<Widget> = {
        label: updatedValues.label ?? undefined,
        // optionally filter others if Widget grows
      };
      this.store.updateWidget(this.data().id, widgetUpdate);
    }
  }
}
