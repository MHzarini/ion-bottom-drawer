# Ionic 4 Bottom Navigation Drawer

Bottom Navigation Drawer component for Ionic 4.

# Installation

```
$ npm i ion-bottom-nav-drawer --save
```

# API

## Inputs

  - `dockedHeight: number` - Height of the drawer in docked position. Default value: `50`.
  - `shouldBounce: boolean` - Determines whether the drawer should automatically bounce between docked, closed and top positions. Default value: `True`.
  - `disableDrag: boolean` - Disables drawer drag. Default value: `False`.
  - `distanceTop: number` - Distance from top of fully opened drawer. Default value: `0`.
  - `transition: string` - Specify custom CSS transition for bounce movement. Default value: `0.25s ease-in-out`.
  - `state: DrawerState` - Current state of the drawer. Possible values: DrawerState.Bottom, DrawerState.Docked, DrawerState.Top. Default value: `DrawerState.Docked`.
  - `minimumHeight: number` - Height of the drawer when in closed state calculated from the bottom of the screen. Default value: `0`. 


# Behavior
The drawer has three basic states: closed, docked and opened to maximum 'distanceTop' from top of the screen. It will bounce by default which means it will always go to one of three states above. This can be disabled by setting 'shouldBounce' to false.

If 'ion-content' is beneath the drawer it might be bouncing itself while dragging the drawer. To prevent that add 'no-bounce' attribute to ion-content element.

```html
<ion-content padding no-bounce>
...
</ion-content>
```

# Integration and Usage
First, import the IonBottomNavDrawerModule to your app:

```typescript
import { IonBottomNavDrawerModule } from 'ion-bottom-nav-drawer';

@NgModule({
  imports: [
    ...,
    IonBottomNavDrawerModule
  ],
  ...
})
export class AppModule { }
```

Use it in your component template like this:

```html
<ion-content no-bounce>Component content.<ion-content>

<ion-bottom-nav-drawer [disableDrag]="disableDrag" [(state)]="drawerState" [minimumHeight]="minimumHeight"
  [dockedHeight]="dockedHeight" [shouldBounce]="shouldBounce" [distanceTop]="distanceTop">
  <div class="drawer-content">
    Bottom Drawer Content
  </div>
</ion-bottom-nav-drawer>
```

# License

The MIT License (MIT)

Copyright (c) [Mohammad Nuairat](mailto:mhn.zarini@gmail.com)
