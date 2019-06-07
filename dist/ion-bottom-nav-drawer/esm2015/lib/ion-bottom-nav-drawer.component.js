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
                template: "<ion-content class=\"ion-bottom-drawer-scrollable-content\" no-bounce>\r\n  <ng-content></ng-content>\r\n</ion-content>\r\n",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW9uLWJvdHRvbS1uYXYtZHJhd2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2lvbi1ib3R0b20tbmF2LWRyYXdlci8iLCJzb3VyY2VzIjpbImxpYi9pb24tYm90dG9tLW5hdi1kcmF3ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBRUwsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUVMLE1BQU0sRUFDTixTQUFTLEdBRVYsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RCxPQUFPLEtBQUssTUFBTSxNQUFNLFVBQVUsQ0FBQztBQUVuQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFPN0MsTUFBTSxPQUFPLDJCQUEyQjs7Ozs7OztJQXFCdEMsWUFDVSxRQUFvQixFQUNwQixTQUFvQixFQUNwQixRQUF1QixFQUN2QixTQUFtQjtRQUhuQixhQUFRLEdBQVIsUUFBUSxDQUFZO1FBQ3BCLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDcEIsYUFBUSxHQUFSLFFBQVEsQ0FBZTtRQUN2QixjQUFTLEdBQVQsU0FBUyxDQUFVO1FBYnBCLFVBQUssR0FBZ0IsV0FBVyxDQUFDLE1BQU0sQ0FBQztRQUl2QyxnQkFBVyxHQUE4QixJQUFJLFlBQVksRUFBZSxDQUFDO1FBR2xFLGtCQUFhLEdBQUcsRUFBRSxDQUFDO1FBUWxDLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxVQUFVLEdBQUcsbUJBQW1CLENBQUM7UUFDdEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxD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QUMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO2lCQUM1RTthQUNGO1NBQ0Y7SUFDSCxDQUFDOzs7Ozs7SUFFTyxjQUFjLENBQUMsS0FBSztRQUMxQixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUs7OztRQUFDLEdBQUcsRUFBRTtZQUN2QixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxXQUFXLEVBQUUsYUFBYSxHQUFHLEtBQUssR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNqRyxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7OztZQTlKRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHVCQUF1QjtnQkFDakMsdUlBQXFEOzthQUV0RDs7OztZQWpCQyxVQUFVO1lBS1YsU0FBUztZQUdGLGFBQWE7WUFBRSxRQUFROzs7MkJBWTdCLEtBQUs7MkJBRUwsS0FBSzswQkFFTCxLQUFLOzBCQUVMLEtBQUs7eUJBRUwsS0FBSztvQkFFTCxLQUFLOzRCQUVMLEtBQUs7MEJBRUwsTUFBTTs7OztJQWRQLG1EQUE4Qjs7SUFFOUIsbURBQStCOztJQUUvQixrREFBOEI7O0lBRTlCLGtEQUE2Qjs7SUFFN0IsaURBQTRCOztJQUU1Qiw0Q0FBaUQ7O0lBRWpELG9EQUErQjs7SUFFL0Isa0RBQW1GOzs7OztJQUVuRix3REFBa0M7Ozs7O0lBQ2xDLG9EQUFvQzs7Ozs7SUFHbEMsK0NBQTRCOzs7OztJQUM1QixnREFBNEI7Ozs7O0lBQzVCLCtDQUErQjs7Ozs7SUFDL0IsZ0RBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBBZnRlclZpZXdJbml0LFxyXG4gIENvbXBvbmVudCxcclxuICBFbGVtZW50UmVmLFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBJbnB1dCxcclxuICBPbkNoYW5nZXMsXHJcbiAgT3V0cHV0LFxyXG4gIFJlbmRlcmVyMixcclxuICBTaW1wbGVDaGFuZ2VzLFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBEb21Db250cm9sbGVyLCBQbGF0Zm9ybSB9IGZyb20gJ0Bpb25pYy9hbmd1bGFyJztcclxuaW1wb3J0ICogYXMgSGFtbWVyIGZyb20gJ2hhbW1lcmpzJztcclxuXHJcbmltcG9ydCB7IERyYXdlclN0YXRlIH0gZnJvbSAnLi9kcmF3ZXItc3RhdGUnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpb24tYm90dG9tLW5hdi1kcmF3ZXInLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9pb24tYm90dG9tLW5hdi1kcmF3ZXIuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2lvbi1ib3R0b20tbmF2LWRyYXdlci5jb21wb25lbnQuY3NzJ10sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBJb25Cb3R0b21OYXZEcmF3ZXJDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkNoYW5nZXMge1xyXG5cclxuICBASW5wdXQoKSBkb2NrZWRIZWlnaHQ6IG51bWJlcjtcclxuXHJcbiAgQElucHV0KCkgc2hvdWxkQm91bmNlOiBib29sZWFuO1xyXG5cclxuICBASW5wdXQoKSBkaXNhYmxlRHJhZzogYm9vbGVhbjtcclxuXHJcbiAgQElucHV0KCkgZGlzdGFuY2VUb3A6IG51bWJlcjtcclxuXHJcbiAgQElucHV0KCkgdHJhbnNpdGlvbjogc3RyaW5nO1xyXG5cclxuICBASW5wdXQoKSBzdGF0ZTogRHJhd2VyU3RhdGUgPSBEcmF3ZXJTdGF0ZS5Cb3R0b207XHJcblxyXG4gIEBJbnB1dCgpIG1pbmltdW1IZWlnaHQ6IG51bWJlcjtcclxuXHJcbiAgQE91dHB1dCgpIHN0YXRlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8RHJhd2VyU3RhdGU+ID0gbmV3IEV2ZW50RW1pdHRlcjxEcmF3ZXJTdGF0ZT4oKTtcclxuXHJcbiAgcHJpdmF0ZSBfc3RhcnRQb3NpdGlvblRvcDogbnVtYmVyO1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgX0JPVU5DRV9ERUxUQSA9IDMwO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgX2VsZW1lbnQ6IEVsZW1lbnRSZWYsXHJcbiAgICBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyLFxyXG4gICAgcHJpdmF0ZSBfZG9tQ3RybDogRG9tQ29udHJvbGxlcixcclxuICAgIHByaXZhdGUgX3BsYXRmb3JtOiBQbGF0Zm9ybVxyXG4gICkge1xyXG4gICAgdGhpcy5kb2NrZWRIZWlnaHQgPSA1MDtcclxuICAgIHRoaXMuc2hvdWxkQm91bmNlID0gdHJ1ZTtcclxuICAgIHRoaXMuZGlzYWJsZURyYWcgPSBmYWxzZTtcclxuICAgIHRoaXMuZGlzdGFuY2VUb3AgPSAwO1xyXG4gICAgdGhpcy50cmFuc2l0aW9uID0gJzAuMjVzIGVhc2UtaW4tb3V0JztcclxuICAgIHRoaXMubWluaW11bUhlaWdodCA9IDA7XHJcbiAgICB0aGlzLmRvY2tlZEhlaWdodCA9IDUwO1xyXG5cclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuaW9uLWJvdHRvbS1kcmF3ZXItc2Nyb2xsYWJsZS1jb250ZW50IDpmaXJzdC1jaGlsZCcpLFxyXG4gICAgICAndG91Y2gtYWN0aW9uJywgJ25vbmUnKTtcclxuICAgIHRoaXMuX3NldERyYXdlclN0YXRlKHRoaXMuc3RhdGUpO1xyXG5cclxuICAgIGNvbnN0IGhhbW1lciA9IG5ldyBIYW1tZXIodGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50KTtcclxuICAgIGhhbW1lci5nZXQoJ3BhbicpLnNldCh7IGVuYWJsZTogdHJ1ZSwgZGlyZWN0aW9uOiBIYW1tZXIuRElSRUNUSU9OX1ZFUlRJQ0FMIH0pO1xyXG4gICAgaGFtbWVyLm9uKCdwYW4gcGFuc3RhcnQgcGFuZW5kJywgKGV2OiBhbnkpID0+IHtcclxuICAgICAgaWYgKHRoaXMuZGlzYWJsZURyYWcpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgc3dpdGNoIChldi50eXBlKSB7XHJcbiAgICAgICAgY2FzZSAncGFuc3RhcnQnOlxyXG4gICAgICAgICAgdGhpcy5faGFuZGxlUGFuU3RhcnQoKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ3BhbmVuZCc6XHJcbiAgICAgICAgICB0aGlzLl9oYW5kbGVQYW5FbmQoZXYpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgIHRoaXMuX2hhbmRsZVBhbihldik7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xyXG4gICAgaWYgKCFjaGFuZ2VzLnN0YXRlKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMuX3NldERyYXdlclN0YXRlKGNoYW5nZXMuc3RhdGUuY3VycmVudFZhbHVlKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3NldERyYXdlclN0YXRlKHN0YXRlOiBEcmF3ZXJTdGF0ZSkge1xyXG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LCAndHJhbnNpdGlvbicsIHRoaXMudHJhbnNpdGlvbik7XHJcbiAgICBzd2l0Y2ggKHN0YXRlKSB7XHJcbiAgICAgIGNhc2UgRHJhd2VyU3RhdGUuQm90dG9tOlxyXG4gICAgICAgIHRoaXMuX3NldFRyYW5zbGF0ZVkoJ2NhbGMoMTAwdmggLSAnICsgdGhpcy5taW5pbXVtSGVpZ2h0ICsgJ3B4KScpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIERyYXdlclN0YXRlLkRvY2tlZDpcclxuICAgICAgICB0aGlzLl9zZXRUcmFuc2xhdGVZKCh0aGlzLl9wbGF0Zm9ybS5oZWlnaHQoKSAtIHRoaXMuZG9ja2VkSGVpZ2h0KSArICdweCcpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHRoaXMuX3NldFRyYW5zbGF0ZVkodGhpcy5kaXN0YW5jZVRvcCArICdweCcpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfaGFuZGxlUGFuU3RhcnQoKSB7XHJcbiAgICB0aGlzLl9zdGFydFBvc2l0aW9uVG9wID0gdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2hhbmRsZVBhbkVuZChldikge1xyXG4gICAgaWYgKHRoaXMuc2hvdWxkQm91bmNlICYmIGV2LmlzRmluYWwpIHtcclxuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LCAndHJhbnNpdGlvbicsIHRoaXMudHJhbnNpdGlvbik7XHJcblxyXG4gICAgICBzd2l0Y2ggKHRoaXMuc3RhdGUpIHtcclxuICAgICAgICBjYXNlIERyYXdlclN0YXRlLkRvY2tlZDpcclxuICAgICAgICAgIHRoaXMuX2hhbmRsZURvY2tlZFBhbkVuZChldik7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIERyYXdlclN0YXRlLlRvcDpcclxuICAgICAgICAgIHRoaXMuX2hhbmRsZVRvcFBhbkVuZChldik7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgdGhpcy5faGFuZGxlQm90dG9tUGFuRW5kKGV2KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5zdGF0ZUNoYW5nZS5lbWl0KHRoaXMuc3RhdGUpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfaGFuZGxlVG9wUGFuRW5kKGV2KSB7XHJcbiAgICBpZiAoZXYuZGVsdGFZID4gdGhpcy5fQk9VTkNFX0RFTFRBKSB7XHJcbiAgICAgIHRoaXMuc3RhdGUgPSBEcmF3ZXJTdGF0ZS5Eb2NrZWQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLl9zZXRUcmFuc2xhdGVZKHRoaXMuZGlzdGFuY2VUb3AgKyAncHgnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2hhbmRsZURvY2tlZFBhbkVuZChldikge1xyXG4gICAgY29uc3QgYWJzRGVsdGFZID0gTWF0aC5hYnMoZXYuZGVsdGFZKTtcclxuICAgIGlmIChhYnNEZWx0YVkgPiB0aGlzLl9CT1VOQ0VfREVMVEEgJiYgZXYuZGVsdGFZIDwgMCkge1xyXG4gICAgICB0aGlzLnN0YXRlID0gRHJhd2VyU3RhdGUuVG9wO1xyXG4gICAgfSBlbHNlIGlmIChhYnNEZWx0YVkgPiB0aGlzLl9CT1VOQ0VfREVMVEEgJiYgZXYuZGVsdGFZID4gMCkge1xyXG4gICAgICB0aGlzLnN0YXRlID0gRHJhd2VyU3RhdGUuQm90dG9tO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5fc2V0VHJhbnNsYXRlWSgodGhpcy5fcGxhdGZvcm0uaGVpZ2h0KCkgLSB0aGlzLmRvY2tlZEhlaWdodCkgKyAncHgnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2hhbmRsZUJvdHRvbVBhbkVuZChldikge1xyXG4gICAgaWYgKC1ldi5kZWx0YVkgPiB0aGlzLl9CT1VOQ0VfREVMVEEpIHtcclxuICAgICAgdGhpcy5zdGF0ZSA9IERyYXdlclN0YXRlLkRvY2tlZDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuX3NldFRyYW5zbGF0ZVkoJ2NhbGMoMTAwdmggLSAnICsgdGhpcy5taW5pbXVtSGVpZ2h0ICsgJ3B4KScpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfaGFuZGxlUGFuKGV2KSB7XHJcbiAgICBjb25zdCBwb2ludGVyWSA9IGV2LmNlbnRlci55O1xyXG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LCAndHJhbnNpdGlvbicsICdub25lJyk7XHJcbiAgICBpZiAocG9pbnRlclkgPiAwICYmIHBvaW50ZXJZIDwgdGhpcy5fcGxhdGZvcm0uaGVpZ2h0KCkpIHtcclxuICAgICAgaWYgKGV2LmFkZGl0aW9uYWxFdmVudCA9PT0gJ3BhbnVwJyB8fCBldi5hZGRpdGlvbmFsRXZlbnQgPT09ICdwYW5kb3duJykge1xyXG4gICAgICAgIGNvbnN0IG5ld1RvcCA9IHRoaXMuX3N0YXJ0UG9zaXRpb25Ub3AgKyBldi5kZWx0YVk7XHJcbiAgICAgICAgaWYgKG5ld1RvcCA+PSB0aGlzLmRpc3RhbmNlVG9wKSB7XHJcbiAgICAgICAgICB0aGlzLl9zZXRUcmFuc2xhdGVZKG5ld1RvcCArICdweCcpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobmV3VG9wIDwgdGhpcy5kaXN0YW5jZVRvcCkge1xyXG4gICAgICAgICAgdGhpcy5fc2V0VHJhbnNsYXRlWSh0aGlzLmRpc3RhbmNlVG9wICsgJ3B4Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChuZXdUb3AgPiB0aGlzLl9wbGF0Zm9ybS5oZWlnaHQoKSAtIHRoaXMubWluaW11bUhlaWdodCkge1xyXG4gICAgICAgICAgdGhpcy5fc2V0VHJhbnNsYXRlWSgodGhpcy5fcGxhdGZvcm0uaGVpZ2h0KCkgLSB0aGlzLm1pbmltdW1IZWlnaHQpICsgJ3B4Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9zZXRUcmFuc2xhdGVZKHZhbHVlKSB7XHJcbiAgICB0aGlzLl9kb21DdHJsLndyaXRlKCgpID0+IHtcclxuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LCAndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZVkoJyArIHZhbHVlICsgJyknKTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=