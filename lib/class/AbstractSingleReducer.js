"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractSingleReducer = void 0;
class AbstractSingleReducer {
    constructor(actionName) {
        this._actionName = '';
        this.reduce = (state, action) => this.consumeAction(state, action.payload);
        this._actionName = actionName;
    }
    get actionName() {
        return this._actionName;
    }
}
exports.AbstractSingleReducer = AbstractSingleReducer;
