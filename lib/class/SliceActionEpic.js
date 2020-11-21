"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlicerActionEpic = void 0;
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const redux_observable_1 = require("redux-observable");
class SlicerActionEpic {
    constructor(actionType, onSuccess, onError, apiCall) {
        this._epic = null;
        this.execAction = (data) => {
            return rxjs_1.from(this._apiCall(data)).pipe(operators_1.map((res) => {
                if (res && res.data) {
                    return this._onSuccess(res.data);
                }
                return this._onError({
                    errorCode: '500',
                    errorMsg: 'AXIOS INVALID DATA',
                    errorData: res,
                });
            }), operators_1.catchError((err) => rxjs_1.of(this._onError({
                errorCode: err.code || '500',
                errorMsg: err.message,
                errorData: err,
            }))));
        };
        this._actionType = actionType;
        this._onSuccess = onSuccess;
        this._onError = onError;
        this._apiCall = apiCall;
    }
    get epic() {
        if (!this._epic) {
            this._epic = (action$) => action$.pipe(redux_observable_1.ofType(this._actionType), operators_1.map((x) => x.payload), operators_1.switchMap((payload) => this.execAction(payload)), operators_1.catchError((e) => rxjs_1.of(this._onError(e))));
        }
        return this._epic;
    }
}
exports.SlicerActionEpic = SlicerActionEpic;
