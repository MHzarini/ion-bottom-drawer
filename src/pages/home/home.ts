import { Component } from '@angular/core';
import { DrawerState } from 'ion-bottom-nav-drawer';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
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
