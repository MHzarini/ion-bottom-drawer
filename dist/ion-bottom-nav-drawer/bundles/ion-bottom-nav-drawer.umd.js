(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('hammerjs'), require('@angular/core'), require('@ionic/angular')) :
    typeof define === 'function' && define.amd ? define('ion-bottom-nav-drawer', ['exports', 'hammerjs', '@angular/core', '@ionic/angular'], factory) :
    (factory((global['ion-bottom-nav-drawer'] = {}),global.Hammer,global.ng.core,global.angular));
}(this, (function (exports,Hammer,core,angular) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @enum {number} */
    var DrawerState = {
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
    var IonBottomNavDrawerComponent = /** @class */ (function () {
        function IonBottomNavDrawerComponent(_element, _renderer, _domCtrl, _platform) {
            this._element = _element;
            this._renderer = _renderer;
            this._domCtrl = _domCtrl;
            this._platform = _platform;
            this.state = DrawerState.Bottom;
            this.stateChange = new core.EventEmitter();
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
        IonBottomNavDrawerComponent.prototype.ngAfterViewInit = /**
         * @return {?}
         */
            function () {
                var _this = this;
                this._renderer.setStyle(this._element.nativeElement.querySelector('.ion-bottom-drawer-scrollable-content :first-child'), 'touch-action', 'none');
                this._setDrawerState(this.state);
                /** @type {?} */
                var hammer = new Hammer(this._element.nativeElement);
                hammer.get('pan').set({ enable: true, direction: Hammer.DIRECTION_VERTICAL });
                hammer.on('pan panstart panend', ( /**
                 * @param {?} ev
                 * @return {?}
                 */function (ev) {
                    if (_this.disableDrag) {
                        return;
                    }
                    switch (ev.type) {
                        case 'panstart':
                            _this._handlePanStart();
                            break;
                        case 'panend':
                            _this._handlePanEnd(ev);
                            break;
                        default:
                            _this._handlePan(ev);
                    }
                }));
            };
        /**
         * @param {?} changes
         * @return {?}
         */
        IonBottomNavDrawerComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
            function (changes) {
                if (!changes.state) {
                    return;
                }
                this._setDrawerState(changes.state.currentValue);
            };
        /**
         * @private
         * @param {?} state
         * @return {?}
         */
        IonBottomNavDrawerComponent.prototype._setDrawerState = /**
         * @private
         * @param {?} state
         * @return {?}
         */
            function (state) {
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
            };
        /**
         * @private
         * @return {?}
         */
        IonBottomNavDrawerComponent.prototype._handlePanStart = /**
         * @private
         * @return {?}
         */
            function () {
                this._startPositionTop = this._element.nativeElement.getBoundingClientRect().top;
            };
        /**
         * @private
         * @param {?} ev
         * @return {?}
         */
        IonBottomNavDrawerComponent.prototype._handlePanEnd = /**
         * @private
         * @param {?} ev
         * @return {?}
         */
            function (ev) {
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
            };
        /**
         * @private
         * @param {?} ev
         * @return {?}
         */
        IonBottomNavDrawerComponent.prototype._handleTopPanEnd = /**
         * @private
         * @param {?} ev
         * @return {?}
         */
            function (ev) {
                if (ev.deltaY > this._BOUNCE_DELTA) {
                    this.state = DrawerState.Docked;
                }
                else {
                    this._setTranslateY(this.distanceTop + 'px');
                }
            };
        /**
         * @private
         * @param {?} ev
         * @return {?}
         */
        IonBottomNavDrawerComponent.prototype._handleDockedPanEnd = /**
         * @private
         * @param {?} ev
         * @return {?}
         */
            function (ev) {
                /** @type {?} */
                var absDeltaY = Math.abs(ev.deltaY);
                if (absDeltaY > this._BOUNCE_DELTA && ev.deltaY < 0) {
                    this.state = DrawerState.Top;
                }
                else if (absDeltaY > this._BOUNCE_DELTA && ev.deltaY > 0) {
                    this.state = DrawerState.Bottom;
                }
                else {
                    this._setTranslateY((this._platform.height() - this.dockedHeight) + 'px');
                }
            };
        /**
         * @private
         * @param {?} ev
         * @return {?}
         */
        IonBottomNavDrawerComponent.prototype._handleBottomPanEnd = /**
         * @private
         * @param {?} ev
         * @return {?}
         */
            function (ev) {
                if (-ev.deltaY > this._BOUNCE_DELTA) {
                    this.state = DrawerState.Docked;
                }
                else {
                    this._setTranslateY('calc(100vh - ' + this.minimumHeight + 'px)');
                }
            };
        /**
         * @private
         * @param {?} ev
         * @return {?}
         */
        IonBottomNavDrawerComponent.prototype._handlePan = /**
         * @private
         * @param {?} ev
         * @return {?}
         */
            function (ev) {
                /** @type {?} */
                var pointerY = ev.center.y;
                this._renderer.setStyle(this._element.nativeElement, 'transition', 'none');
                if (pointerY > 0 && pointerY < this._platform.height()) {
                    if (ev.additionalEvent === 'panup' || ev.additionalEvent === 'pandown') {
                        /** @type {?} */
                        var newTop = this._startPositionTop + ev.deltaY;
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
            };
        /**
         * @private
         * @param {?} value
         * @return {?}
         */
        IonBottomNavDrawerComponent.prototype._setTranslateY = /**
         * @private
         * @param {?} value
         * @return {?}
         */
            function (value) {
                var _this = this;
                this._domCtrl.write(( /**
                 * @return {?}
                 */function () {
                    _this._renderer.setStyle(_this._element.nativeElement, 'transform', 'translateY(' + value + ')');
                }));
            };
        IonBottomNavDrawerComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'ion-bottom-nav-drawer',
                        template: "<ion-content class=\"ion-bottom-drawer-scrollable-content\" no-bounce>\r\n  <ng-content></ng-content>\r\n</ion-content>\r\n",
                        styles: [":host{width:100%;height:100%;position:absolute;left:0;z-index:11!important;background-color:#fff;-webkit-transform:translateY(100vh);transform:translateY(100vh)}"]
                    }] }
        ];
        /** @nocollapse */
        IonBottomNavDrawerComponent.ctorParameters = function () {
            return [
                { type: core.ElementRef },
                { type: core.Renderer2 },
                { type: angular.DomController },
                { type: angular.Platform }
            ];
        };
        IonBottomNavDrawerComponent.propDecorators = {
            dockedHeight: [{ type: core.Input }],
            shouldBounce: [{ type: core.Input }],
            disableDrag: [{ type: core.Input }],
            distanceTop: [{ type: core.Input }],
            transition: [{ type: core.Input }],
            state: [{ type: core.Input }],
            minimumHeight: [{ type: core.Input }],
            stateChange: [{ type: core.Output }]
        };
        return IonBottomNavDrawerComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var IonBottomNavDrawerModule = /** @class */ (function () {
        function IonBottomNavDrawerModule() {
        }
        IonBottomNavDrawerModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [IonBottomNavDrawerComponent],
                        imports: [angular.IonicModule],
                        exports: [IonBottomNavDrawerComponent]
                    },] }
        ];
        return IonBottomNavDrawerModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    exports.DrawerState = DrawerState;
    exports.IonBottomNavDrawerComponent = IonBottomNavDrawerComponent;
    exports.IonBottomNavDrawerModule = IonBottomNavDrawerModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=ion-bottom-nav-drawer.umd.js.map