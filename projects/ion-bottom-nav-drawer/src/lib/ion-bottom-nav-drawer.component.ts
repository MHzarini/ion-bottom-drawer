import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { DomController, Platform } from '@ionic/angular';
import * as Hammer from 'hammerjs';

import { DrawerState } from './drawer-state';

@Component({
  selector: 'ion-bottom-nav-drawer',
  templateUrl: './ion-bottom-nav-drawer.component.html',
  styleUrls: ['./ion-bottom-nav-drawer.component.css'],
})
export class IonBottomNavDrawerComponent implements AfterViewInit, OnChanges {

  @Input() dockedHeight: number;

  @Input() shouldBounce: boolean;

  @Input() disableDrag: boolean;

  @Input() distanceTop: number;

  @Input() transition: string;

  @Input() state: DrawerState = DrawerState.Bottom;

  @Input() minimumHeight: number;

  @Output() stateChange: EventEmitter<DrawerState> = new EventEmitter<DrawerState>();

  private _startPositionTop: number;
  private readonly _BOUNCE_DELTA = 30;

  constructor(
    private _element: ElementRef,
    private _renderer: Renderer2,
    private _domCtrl: DomController,
    private _platform: Platform
  ) {
    this.dockedHeight = 50;
    this.shouldBounce = true;
    this.disableDrag = false;
    this.distanceTop = 0;
    this.transition = '0.25s ease-in-out';
    this.minimumHeight = 0;
    this.dockedHeight = 50;

  }

  ngAfterViewInit() {
    this._renderer.setStyle(this._element.nativeElement.querySelector('.ion-bottom-drawer-scrollable-content :first-child'),
      'touch-action', 'none');
    this._setDrawerState(this.state);

    const hammer = new Hammer(this._element.nativeElement);
    hammer.get('pan').set({ enable: true, direction: Hammer.DIRECTION_VERTICAL });
    hammer.on('pan panstart panend', (ev: any) => {
      if (this.disableDrag) {
        return;
      }
      switch (ev.type) {
        case 'panstart':
          this._handlePanStart();
          break;
        case 'panend':
          this._handlePanEnd(ev);
          break;
        default:
          this._handlePan(ev);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.state) {
      return;
    }
    this._setDrawerState(changes.state.currentValue);
  }

  private _setDrawerState(state: DrawerState) {
    this._renderer.setStyle(this._element.nativeElement, 'transition', this.transition);
    switch (state) {
      case DrawerState.Bottom:
        this._setTranslateY('calc(100vh - ' + this.minimumHeight + 'px)');
        break;
      case DrawerState.Docked:
        this._setTranslateY((this._platform.height() - this.dockedHeight) + 'px');
        break;
      default:
        this._setTranslateY(this.distanceTop + 'px');
    }
  }

  private _handlePanStart() {
    this._startPositionTop = this._element.nativeElement.getBoundingClientRect().top;
  }

  private _handlePanEnd(ev) {
    if (this.shouldBounce && ev.isFinal) {
      this._renderer.setStyle(this._element.nativeElement, 'transition', this.transition);

      switch (this.state) {
        case DrawerState.Docked:
          this._handleDockedPanEnd(ev);
          break;
        case DrawerState.Top:
          this._handleTopPanEnd(ev);
          break;
        default:
          this._handleBottomPanEnd(ev);
      }
    }
    this.stateChange.emit(this.state);
  }

  private _handleTopPanEnd(ev) {
    if (ev.deltaY > this._BOUNCE_DELTA) {
      this.state = DrawerState.Docked;
    } else {
      this._setTranslateY(this.distanceTop + 'px');
    }
  }

  private _handleDockedPanEnd(ev) {
    const absDeltaY = Math.abs(ev.deltaY);
    if (absDeltaY > this._BOUNCE_DELTA && ev.deltaY < 0) {
      this.state = DrawerState.Top;
    } else if (absDeltaY > this._BOUNCE_DELTA && ev.deltaY > 0) {
      this.state = DrawerState.Bottom;
    } else {
      this._setTranslateY((this._platform.height() - this.dockedHeight) + 'px');
    }
  }

  private _handleBottomPanEnd(ev) {
    if (-ev.deltaY > this._BOUNCE_DELTA) {
      this.state = DrawerState.Docked;
    } else {
      this._setTranslateY('calc(100vh - ' + this.minimumHeight + 'px)');
    }
  }

  private _handlePan(ev) {
    const pointerY = ev.center.y;
    this._renderer.setStyle(this._element.nativeElement, 'transition', 'none');
    if (pointerY > 0 && pointerY < this._platform.height()) {
      if (ev.additionalEvent === 'panup' || ev.additionalEvent === 'pandown') {
        const newTop = this._startPositionTop + ev.deltaY;
        if (newTop >= this.distanceTop) {
          this._setTranslateY(newTop + 'px');
        } else if (newTop < this.distanceTop) {
          this._setTranslateY(this.distanceTop + 'px');
        }
        if (newTop > this._platform.height() - this.minimumHeight) {
          this._setTranslateY((this._platform.height() - this.minimumHeight) + 'px');
        }
      }
    }
  }

  private _setTranslateY(value) {
    this._domCtrl.write(() => {
      this._renderer.setStyle(this._element.nativeElement, 'transform', 'translateY(' + value + ')');
    });
  }
}