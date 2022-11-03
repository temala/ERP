import { Component } from '@angular/core';
import { Menu } from './client/model/menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = $localize `Invoices`;

  opened = true;

  toggle(): void {
    this.opened = !this.opened;
  }

  menu: Menu = [
    {
      title: $localize `Home`,
      icon: 'home',
      link: '/home',
    },
    {
      title: $localize `Clients`,
      icon: 'account_circle',
      link: '/client',
    },
  ];
}
