import { Slice } from '@reduxjs/toolkit';
import { AbstractEpicReducer } from './AbstractEpicReducer';
import { AbstractSingleReducer } from './AbstractSingleReducer';
export declare abstract class AbstractStateSlice<State> {
    abstract getSliceName: () => string;
    abstract getInitialState: () => State;
    private _singleReducers;
    private _epicReducers;
    private _slice;
    private _epic;
    constructor(epicReducers: Array<AbstractEpicReducer<State, any, any>> | null, singleReducers: Array<AbstractSingleReducer<State, any>> | null);
    get slice(): Slice;
    get epic(): any;
}
