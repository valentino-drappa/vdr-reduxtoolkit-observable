"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractEpicReducer = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const SliceActionEpic_1 = require("./SliceActionEpic");
class AbstractEpicReducer {
    constructor(sliceName, actionName) {
        this.fetchAction = toolkit_1.createAction(`${sliceName}/${actionName}_fetch`);
        this.fetchSuccessAction = toolkit_1.createAction(`${sliceName}/${actionName}_fetchSuccess`);
        this.fetchErrorAction = toolkit_1.createAction(`${sliceName}/${actionName}_fetchError`);
        this.actionName = actionName;
    }
    get epic() {
        return new SliceActionEpic_1.SlicerActionEpic(this.fetchAction.type, this.fetchSuccessAction, this.fetchErrorAction, this.fetchApiCall).epic;
    }
    get reducers() {
        return {
            [`${this.actionName}_fetch`]: (state, action) => this.fetch(state, action.payload),
            [`${this.actionName}_fetchSuccess`]: (state, action) => this.fetchSuccess(state, action.payload),
            [`${this.actionName}_fetchError`]: (state, action) => this.fetchError(state, action.payload),
        };
    }
}
exports.AbstractEpicReducer = AbstractEpicReducer;
