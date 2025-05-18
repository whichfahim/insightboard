import { Component, computed, Input, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';

export type MenuItem = {
  icon: string;
  label: string;
  route: string;
};

@Component({
  selector: 'app-custom-sidenav',
  imports: [RouterModule, MatListModule, MatIconModule],
  templateUrl: './custom-sidenav.component.html',
  styleUrl: './custom-sidenav.component.css',
})
export class CustomSidenavComponent {
  sideNavCollapsed = signal(false);
  @Input() set collapsed(val: boolean) {
    this.sideNavCollapsed.set(val);
  }

  profilePicSize = computed(() => (this.sideNavCollapsed() ? '32' : '100'));

  menuItems = signal<MenuItem[]>([
    {
      icon: 'dashboard',
      label: 'Dashboard',
      route: 'dashboard',
    },
    {
      icon: 'settings',
      label: 'Settings',
      route: 'settings',
    },
    {
      icon: 'widgets',
      label: 'Widgets',
      route: 'widgets',
    },
  ]);
}
