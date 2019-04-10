import { Component } from '@angular/core';
import { DrawerState } from 'ion-bottom-nav-drawer';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  shouldBounce = true;
  disableDrag = false;
  dockedHeight = 150;
  distanceTop = 56;
  drawerState = DrawerState.Docked;
  states = DrawerState;
  minimumHeight = 0;
}
