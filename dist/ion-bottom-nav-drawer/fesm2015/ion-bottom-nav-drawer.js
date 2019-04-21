import * as Hammer from 'hammerjs';
import { DIRECTION_VERTICAL } from 'hammerjs';
import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, NgModule } from '@angular/core';
import { DomController, Platform, IonicModule } from '@ionic/angular';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {number} */
const DrawerState = {
    Bottom: 0,
    Docked: 1,
    Top: 2,
};
DrawerState[DrawerState.Bottom] = 'Bottom';
DrawerState[DrawerState.Docked] = 'Docked';
DrawerState[DrawerState.Top] = 'Top';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IonBottomNavDrawerComponent {
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
        hammer.get('pan').set({ enable: true, direction: DIRECTION_VERTICAL });
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IonBottomNavDrawerModule {
}
IonBottomNavDrawerModule.decorators = [
    { type: NgModule, args: [{
                declarations: [IonBottomNavDrawerComponent],
                imports: [IonicModule],
                exports: [IonBottomNavDrawerComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { DrawerState, IonBottomNavDrawerComponent, IonBottomNavDrawerModule };

//# sourceMappingURL=ion-bottom-nav-drawer.js.map