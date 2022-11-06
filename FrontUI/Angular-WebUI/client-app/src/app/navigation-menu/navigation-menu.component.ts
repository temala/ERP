import { Component, Input, OnInit } from '@angular/core';
import { Menu } from '../client/model/menu';

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.scss']
})
export class NavigationMenuComponent implements OnInit {

  @Input() menu: Menu = [];
  
  constructor() { }

  ngOnInit(): void {
  }

}