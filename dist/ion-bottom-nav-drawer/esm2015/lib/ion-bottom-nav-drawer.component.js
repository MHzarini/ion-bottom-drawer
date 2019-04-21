/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, } from '@angular/core';
import { DomController, Platform } from '@ionic/angular';
import * as Hammer from 'hammerjs';
import { DrawerState } from './drawer-state';
export class IonBottomNavDrawerComponent {
    /**
     * @param {?} _element
     * @param {?} _renderer
     * @param {?} _domCtrl
     * @param {?} _platform
     */
    constructor(_element, _renderer, _domCtrl, _platform) {
        this._element = _element;
        this._renderer = _renderer;
        this._domCtrl = _domCtrl;
        this._platform = _platform;
        this.state = DrawerState.Bottom;
        this.stateChange = new EventEmitter();
        this._BOUNCE_DELTA = 30;
        this.dockedHeight = 50;
        this.shouldBounce = true;
        this.disableDrag = false;
        this.distanceTop = 0;
        this.transition = '0.25s ease-in-out';
        this.minimumHeight = 0;
        this.dockedHeight = 50;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this._renderer.setStyle(this._element.nativeElement.querySelector('.ion-bottom-drawer-scrollable-content :first-child'), 'touch-action', 'none');
        this._setDrawerState(this.state);
        /** @type {?} */
        const hammer = new Hammer(this._element.nativeElement);
        hammer.get('pan').set({ enable: true, direction: Hammer.DIRECTION_VERTICAL });
        hammer.on('pan panstart panend', (/**
         * @param {?} ev
         * @return {?}
         */
        (ev) => {
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
        }));
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (!changes.state) {
            return;
        }
        this._setDrawerState(changes.state.currentValue);
    }
    /**
     * @private
     * @param {?} state
     * @return {?}
     */
    _setDrawerState(state) {
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
    /**
     * @private
     * @return {?}
     */
    _handlePanStart() {
        this._startPositionTop = this._element.nativeElement.getBoundingClientRect().top;
    }
    /**
     * @private
     * @param {?} ev
     * @return {?}
     */
    _handlePanEnd(ev) {
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
    /**
     * @private
     * @param {?} ev
     * @return {?}
     */
    _handleTopPanEnd(ev) {
        if (ev.deltaY > this._BOUNCE_DELTA) {
            this.state = DrawerState.Docked;
        }
        else {
            this._setTranslateY(this.distanceTop + 'px');
        }
    }
    /**
     * @private
     * @param {?} ev
     * @return {?}
     */
    _handleDockedPanEnd(ev) {
        /** @type {?} */
        const absDeltaY = Math.abs(ev.deltaY);
        if (absDeltaY > this._BOUNCE_DELTA && ev.deltaY < 0) {
            this.state = DrawerState.Top;
        }
        else if (absDeltaY > this._BOUNCE_DELTA && ev.deltaY > 0) {
            this.state = DrawerState.Bottom;
        }
        else {
            this._setTranslateY((this._platform.height() - this.dockedHeight) + 'px');
        }
    }
    /**
     * @private
     * @param {?} ev
     * @return {?}
     */
    _handleBottomPanEnd(ev) {
        if (-ev.deltaY > this._BOUNCE_DELTA) {
            this.state = DrawerState.Docked;
        }
        else {
            this._setTranslateY('calc(100vh - ' + this.minimumHeight + 'px)');
        }
    }
    /**
     * @private
     * @param {?} ev
     * @return {?}
     */
    _handlePan(ev) {
        /** @type {?} */
        const pointerY = ev.center.y;
        this._renderer.setStyle(this._element.nativeElement, 'transition', 'none');
        if (pointerY > 0 && pointerY < this._platform.height()) {
            if (ev.additionalEvent === 'panup' || ev.additionalEvent === 'pandown') {
                /** @type {?} */
                const newTop = this._startPositionTop + ev.deltaY;
                if (newTop >= this.distanceTop) {
                    this._setTranslateY(newTop + 'px');
                }
                else if (newTop < this.distanceTop) {
                    this._setTranslateY(this.distanceTop + 'px');
                }
                if (newTop > this._platform.height() - this.minimumHeight) {
                    this._setTranslateY((this._platform.height() - this.minimumHeight) + 'px');
                }
            }
        }
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    _setTranslateY(value) {
        console.log(value);
        this._domCtrl.write((/**
         * @return {?}
         */
        () => {
            this._renderer.setStyle(this._element.nativeElement, 'transform', 'translateY(' + value + ')');
        }));
    }
}
IonBottomNavDrawerComponent.decorators = [
    { type: Component, args: [{
                selector: 'ion-bottom-nav-drawer',
                template: "<ion-content class=\"ion-bottom-drawer-scrollable-content\" no-bounce>\n  <ng-content></ng-content>\n</ion-content>\n",
                styles: [":host{width:100%;height:100%;position:absolute;left:0;z-index:11!important;background-color:#fff;-webkit-transform:translateY(100vh);transform:translateY(100vh)}"]
            }] }
];
/** @nocollapse */
IonBottomNavDrawerComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: DomController },
    { type: Platform }
];
IonBottomNavDrawerComponent.propDecorators = {
    dockedHeight: [{ type: Input }],
    shouldBounce: [{ type: Input }],
    disableDrag: [{ type: Input }],
    distanceTop: [{ type: Input }],
    transition: [{ type: Input }],
    state: [{ type: Input }],
    minimumHeight: [{ type: Input }],
    stateChange: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    IonBottomNavDrawerComponent.prototype.dockedHeight;
    /** @type {?} */
    IonBottomNavDrawerComponent.prototype.shouldBounce;
    /** @type {?} */
    IonBottomNavDrawerComponent.prototype.disableDrag;
    /** @type {?} */
    IonBottomNavDrawerComponent.prototype.distanceTop;
    /** @type {?} */
    IonBottomNavDrawerComponent.prototype.transition;
    /** @type {?} */
    IonBottomNavDrawerComponent.prototype.state;
    /** @type {?} */
    IonBottomNavDrawerComponent.prototype.minimumHeight;
    /** @type {?} */
    IonBottomNavDrawerComponent.prototype.stateChange;
    /**
     * @type {?}
     * @private
     */
    IonBottomNavDrawerComponent.prototype._startPositionTop;
    /**
     * @type {?}
     * @private
     */
    IonBottomNavDrawerComponent.prototype._BOUNCE_DELTA;
    /**
     * @type {?}
     * @private
     */
    IonBottomNavDrawerComponent.prototype._element;
    /**
     * @type {?}
     * @private
     */
    IonBottomNavDrawerComponent.prototype._renderer;
    /**
     * @type {?}
     * @private
     */
    IonBottomNavDrawerComponent.prototype._domCtrl;
    /**
     * @type {?}
     * @private
     */
    IonBottomNavDrawerComponent.prototype._platform;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW9uLWJvdHRvbS1uYXYtZHJhd2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2lvbi1ib3R0b20tbmF2LWRyYXdlci8iLCJzb3VyY2VzIjpbImxpYi9pb24tYm90dG9tLW5hdi1kcmF3ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBRUwsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUVMLE1BQU0sRUFDTixTQUFTLEdBRVYsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RCxPQUFPLEtBQUssTUFBTSxNQUFNLFVBQVUsQ0FBQztBQUVuQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFPN0MsTUFBTSxPQUFPLDJCQUEyQjs7Ozs7OztJQXFCdEMsWUFDVSxRQUFvQixFQUNwQixTQUFvQixFQUNwQixRQUF1QixFQUN2QixTQUFtQjtRQUhuQixhQUFRLEdBQVIsUUFBUSxDQUFZO1FBQ3BCLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDcEIsYUFBUSxHQUFSLFFBQVEsQ0FBZTtRQUN2QixjQUFTLEdBQVQsU0FBUyxDQUFVO1FBYnBCLFVBQUssR0FBZ0IsV0FBVyxDQUFDLE1BQU0sQ0FBQztRQUl2QyxnQkFBVyxHQUE4QixJQUFJLFlBQVksRUFBZSxDQUFDO1FBR2xFLGtCQUFhLEdBQUcsRUFBRSxDQUFDO1FBUWxDLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxVQUFVLEdBQUcsbUJBQW1CLENBQUM7UUFDdEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxD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QUMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO2lCQUM1RTthQUNGO1NBQ0Y7SUFDSCxDQUFDOzs7Ozs7SUFFTyxjQUFjLENBQUMsS0FBSztRQUMxQixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSzs7O1FBQUMsR0FBRyxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLFdBQVcsRUFBRSxhQUFhLEdBQUcsS0FBSyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ2pHLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7O1lBL0pGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsdUJBQXVCO2dCQUNqQyxpSUFBcUQ7O2FBRXREOzs7O1lBakJDLFVBQVU7WUFLVixTQUFTO1lBR0YsYUFBYTtZQUFFLFFBQVE7OzsyQkFZN0IsS0FBSzsyQkFFTCxLQUFLOzBCQUVMLEtBQUs7MEJBRUwsS0FBSzt5QkFFTCxLQUFLO29CQUVMLEtBQUs7NEJBRUwsS0FBSzswQkFFTCxNQUFNOzs7O0lBZFAsbURBQThCOztJQUU5QixtREFBK0I7O0lBRS9CLGtEQUE4Qjs7SUFFOUIsa0RBQTZCOztJQUU3QixpREFBNEI7O0lBRTVCLDRDQUFpRDs7SUFFakQsb0RBQStCOztJQUUvQixrREFBbUY7Ozs7O0lBRW5GLHdEQUFrQzs7Ozs7SUFDbEMsb0RBQW9DOzs7OztJQUdsQywrQ0FBNEI7Ozs7O0lBQzVCLGdEQUE0Qjs7Ozs7SUFDNUIsK0NBQStCOzs7OztJQUMvQixnREFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT3V0cHV0LFxuICBSZW5kZXJlcjIsXG4gIFNpbXBsZUNoYW5nZXMsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRG9tQ29udHJvbGxlciwgUGxhdGZvcm0gfSBmcm9tICdAaW9uaWMvYW5ndWxhcic7XG5pbXBvcnQgKiBhcyBIYW1tZXIgZnJvbSAnaGFtbWVyanMnO1xuXG5pbXBvcnQgeyBEcmF3ZXJTdGF0ZSB9IGZyb20gJy4vZHJhd2VyLXN0YXRlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaW9uLWJvdHRvbS1uYXYtZHJhd2VyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2lvbi1ib3R0b20tbmF2LWRyYXdlci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2lvbi1ib3R0b20tbmF2LWRyYXdlci5jb21wb25lbnQuY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIElvbkJvdHRvbU5hdkRyYXdlckNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcyB7XG5cbiAgQElucHV0KCkgZG9ja2VkSGVpZ2h0OiBudW1iZXI7XG5cbiAgQElucHV0KCkgc2hvdWxkQm91bmNlOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIGRpc2FibGVEcmFnOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIGRpc3RhbmNlVG9wOiBudW1iZXI7XG5cbiAgQElucHV0KCkgdHJhbnNpdGlvbjogc3RyaW5nO1xuXG4gIEBJbnB1dCgpIHN0YXRlOiBEcmF3ZXJTdGF0ZSA9IERyYXdlclN0YXRlLkJvdHRvbTtcblxuICBASW5wdXQoKSBtaW5pbXVtSGVpZ2h0OiBudW1iZXI7XG5cbiAgQE91dHB1dCgpIHN0YXRlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8RHJhd2VyU3RhdGU+ID0gbmV3IEV2ZW50RW1pdHRlcjxEcmF3ZXJTdGF0ZT4oKTtcblxuICBwcml2YXRlIF9zdGFydFBvc2l0aW9uVG9wOiBudW1iZXI7XG4gIHByaXZhdGUgcmVhZG9ubHkgX0JPVU5DRV9ERUxUQSA9IDMwO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX2VsZW1lbnQ6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIF9kb21DdHJsOiBEb21Db250cm9sbGVyLFxuICAgIHByaXZhdGUgX3BsYXRmb3JtOiBQbGF0Zm9ybVxuICApIHtcbiAgICB0aGlzLmRvY2tlZEhlaWdodCA9IDUwO1xuICAgIHRoaXMuc2hvdWxkQm91bmNlID0gdHJ1ZTtcbiAgICB0aGlzLmRpc2FibGVEcmFnID0gZmFsc2U7XG4gICAgdGhpcy5kaXN0YW5jZVRvcCA9IDA7XG4gICAgdGhpcy50cmFuc2l0aW9uID0gJzAuMjVzIGVhc2UtaW4tb3V0JztcbiAgICB0aGlzLm1pbmltdW1IZWlnaHQgPSAwO1xuICAgIHRoaXMuZG9ja2VkSGVpZ2h0ID0gNTA7XG5cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLmlvbi1ib3R0b20tZHJhd2VyLXNjcm9sbGFibGUtY29udGVudCA6Zmlyc3QtY2hpbGQnKSxcbiAgICAgICd0b3VjaC1hY3Rpb24nLCAnbm9uZScpO1xuICAgIHRoaXMuX3NldERyYXdlclN0YXRlKHRoaXMuc3RhdGUpO1xuXG4gICAgY29uc3QgaGFtbWVyID0gbmV3IEhhbW1lcih0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQpO1xuICAgIGhhbW1lci5nZXQoJ3BhbicpLnNldCh7IGVuYWJsZTogdHJ1ZSwgZGlyZWN0aW9uOiBIYW1tZXIuRElSRUNUSU9OX1ZFUlRJQ0FMIH0pO1xuICAgIGhhbW1lci5vbigncGFuIHBhbnN0YXJ0IHBhbmVuZCcsIChldjogYW55KSA9PiB7XG4gICAgICBpZiAodGhpcy5kaXNhYmxlRHJhZykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBzd2l0Y2ggKGV2LnR5cGUpIHtcbiAgICAgICAgY2FzZSAncGFuc3RhcnQnOlxuICAgICAgICAgIHRoaXMuX2hhbmRsZVBhblN0YXJ0KCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3BhbmVuZCc6XG4gICAgICAgICAgdGhpcy5faGFuZGxlUGFuRW5kKGV2KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB0aGlzLl9oYW5kbGVQYW4oZXYpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmICghY2hhbmdlcy5zdGF0ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9zZXREcmF3ZXJTdGF0ZShjaGFuZ2VzLnN0YXRlLmN1cnJlbnRWYWx1ZSk7XG4gIH1cblxuICBwcml2YXRlIF9zZXREcmF3ZXJTdGF0ZShzdGF0ZTogRHJhd2VyU3RhdGUpIHtcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICd0cmFuc2l0aW9uJywgdGhpcy50cmFuc2l0aW9uKTtcbiAgICBzd2l0Y2ggKHN0YXRlKSB7XG4gICAgICBjYXNlIERyYXdlclN0YXRlLkJvdHRvbTpcbiAgICAgICAgdGhpcy5fc2V0VHJhbnNsYXRlWSgnY2FsYygxMDB2aCAtICcgKyB0aGlzLm1pbmltdW1IZWlnaHQgKyAncHgpJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBEcmF3ZXJTdGF0ZS5Eb2NrZWQ6XG4gICAgICAgIHRoaXMuX3NldFRyYW5zbGF0ZVkoKHRoaXMuX3BsYXRmb3JtLmhlaWdodCgpIC0gdGhpcy5kb2NrZWRIZWlnaHQpICsgJ3B4Jyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhpcy5fc2V0VHJhbnNsYXRlWSh0aGlzLmRpc3RhbmNlVG9wICsgJ3B4Jyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfaGFuZGxlUGFuU3RhcnQoKSB7XG4gICAgdGhpcy5fc3RhcnRQb3NpdGlvblRvcCA9IHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XG4gIH1cblxuICBwcml2YXRlIF9oYW5kbGVQYW5FbmQoZXYpIHtcbiAgICBpZiAodGhpcy5zaG91bGRCb3VuY2UgJiYgZXYuaXNGaW5hbCkge1xuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LCAndHJhbnNpdGlvbicsIHRoaXMudHJhbnNpdGlvbik7XG5cbiAgICAgIHN3aXRjaCAodGhpcy5zdGF0ZSkge1xuICAgICAgICBjYXNlIERyYXdlclN0YXRlLkRvY2tlZDpcbiAgICAgICAgICB0aGlzLl9oYW5kbGVEb2NrZWRQYW5FbmQoZXYpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIERyYXdlclN0YXRlLlRvcDpcbiAgICAgICAgICB0aGlzLl9oYW5kbGVUb3BQYW5FbmQoZXYpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHRoaXMuX2hhbmRsZUJvdHRvbVBhbkVuZChldik7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuc3RhdGVDaGFuZ2UuZW1pdCh0aGlzLnN0YXRlKTtcbiAgfVxuXG4gIHByaXZhdGUgX2hhbmRsZVRvcFBhbkVuZChldikge1xuICAgIGlmIChldi5kZWx0YVkgPiB0aGlzLl9CT1VOQ0VfREVMVEEpIHtcbiAgICAgIHRoaXMuc3RhdGUgPSBEcmF3ZXJTdGF0ZS5Eb2NrZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3NldFRyYW5zbGF0ZVkodGhpcy5kaXN0YW5jZVRvcCArICdweCcpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2hhbmRsZURvY2tlZFBhbkVuZChldikge1xuICAgIGNvbnN0IGFic0RlbHRhWSA9IE1hdGguYWJzKGV2LmRlbHRhWSk7XG4gICAgaWYgKGFic0RlbHRhWSA+IHRoaXMuX0JPVU5DRV9ERUxUQSAmJiBldi5kZWx0YVkgPCAwKSB7XG4gICAgICB0aGlzLnN0YXRlID0gRHJhd2VyU3RhdGUuVG9wO1xuICAgIH0gZWxzZSBpZiAoYWJzRGVsdGFZID4gdGhpcy5fQk9VTkNFX0RFTFRBICYmIGV2LmRlbHRhWSA+IDApIHtcbiAgICAgIHRoaXMuc3RhdGUgPSBEcmF3ZXJTdGF0ZS5Cb3R0b207XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3NldFRyYW5zbGF0ZVkoKHRoaXMuX3BsYXRmb3JtLmhlaWdodCgpIC0gdGhpcy5kb2NrZWRIZWlnaHQpICsgJ3B4Jyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfaGFuZGxlQm90dG9tUGFuRW5kKGV2KSB7XG4gICAgaWYgKC1ldi5kZWx0YVkgPiB0aGlzLl9CT1VOQ0VfREVMVEEpIHtcbiAgICAgIHRoaXMuc3RhdGUgPSBEcmF3ZXJTdGF0ZS5Eb2NrZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3NldFRyYW5zbGF0ZVkoJ2NhbGMoMTAwdmggLSAnICsgdGhpcy5taW5pbXVtSGVpZ2h0ICsgJ3B4KScpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2hhbmRsZVBhbihldikge1xuICAgIGNvbnN0IHBvaW50ZXJZID0gZXYuY2VudGVyLnk7XG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LCAndHJhbnNpdGlvbicsICdub25lJyk7XG4gICAgaWYgKHBvaW50ZXJZID4gMCAmJiBwb2ludGVyWSA8IHRoaXMuX3BsYXRmb3JtLmhlaWdodCgpKSB7XG4gICAgICBpZiAoZXYuYWRkaXRpb25hbEV2ZW50ID09PSAncGFudXAnIHx8IGV2LmFkZGl0aW9uYWxFdmVudCA9PT0gJ3BhbmRvd24nKSB7XG4gICAgICAgIGNvbnN0IG5ld1RvcCA9IHRoaXMuX3N0YXJ0UG9zaXRpb25Ub3AgKyBldi5kZWx0YVk7XG4gICAgICAgIGlmIChuZXdUb3AgPj0gdGhpcy5kaXN0YW5jZVRvcCkge1xuICAgICAgICAgIHRoaXMuX3NldFRyYW5zbGF0ZVkobmV3VG9wICsgJ3B4Jyk7XG4gICAgICAgIH0gZWxzZSBpZiAobmV3VG9wIDwgdGhpcy5kaXN0YW5jZVRvcCkge1xuICAgICAgICAgIHRoaXMuX3NldFRyYW5zbGF0ZVkodGhpcy5kaXN0YW5jZVRvcCArICdweCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuZXdUb3AgPiB0aGlzLl9wbGF0Zm9ybS5oZWlnaHQoKSAtIHRoaXMubWluaW11bUhlaWdodCkge1xuICAgICAgICAgIHRoaXMuX3NldFRyYW5zbGF0ZVkoKHRoaXMuX3BsYXRmb3JtLmhlaWdodCgpIC0gdGhpcy5taW5pbXVtSGVpZ2h0KSArICdweCcpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfc2V0VHJhbnNsYXRlWSh2YWx1ZSkge1xuICAgIGNvbnNvbGUubG9nKHZhbHVlKTtcbiAgICB0aGlzLl9kb21DdHJsLndyaXRlKCgpID0+IHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCwgJ3RyYW5zZm9ybScsICd0cmFuc2xhdGVZKCcgKyB2YWx1ZSArICcpJyk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==