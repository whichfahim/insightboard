import { Component, effect, inject, input, model } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { Widget } from '../../../models/dashboard';
import { DashboardService } from '../../../services/dashboard.service';
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

@Component({
  selector: 'app-widget-options',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './widget-options.component.html',
  styleUrl: './widget-options.component.scss',
})
export class WidgetOptionsComponent {
  data = input.required<Widget>();
  showOptions = model<boolean>(false);

  store = inject(DashboardService);

  settingsForm = new FormGroup({
    label: new FormControl('', [Validators.required]),
    dataSource: new FormControl('', [Validators.required]),
  });

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

  // private dashboardService = inject(DashboardService);

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
    this.showOptions.set(false);
  }
}
