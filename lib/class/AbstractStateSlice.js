"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractStateSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const redux_observable_1 = require("redux-observable");
class AbstractStateSlice {
    constructor(epicReducers, singleReducers) {
        this._slice = null;
        this._epic = null;
        this._epicReducers = epicReducers || [];
        this._singleReducers = singleReducers || [];
    }
    get slice() {
        if (!this._slice) {
            this._slice = toolkit_1.createSlice({
                name: this.getStatName(),
                initialState: this.getInitialState(),
                reducers: Object.assign(Object.assign({}, this._singleReducers.reduce((prev, next) => Object.assign(prev, { [next.actionName]: next.consumeAction }), {})), this._epicReducers.map((x) => x.reducers).reduce((prev, next) => Object.assign(prev, next), {})),
            });
        }
        return this._slice;
    }
    get epic() {
        if (!this._epic) {
            this._epic = redux_observable_1.combineEpics(...this._epicReducers.map((x) => x.epic));
        }
        return this._epic;
    }
}
exports.AbstractStateSlice = AbstractStateSlice;
