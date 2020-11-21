import { createSlice, CaseReducers, Actions, Slice } from '@reduxjs/toolkit';
import { combineEpics } from 'redux-observable';
import { AbstractEpicReducer } from './AbstractEpicReducer';
import { AbstractSingleReducer } from './AbstractSingleReducer';

export abstract class AbstractStateSlice<State> {
  abstract getStatName: () => string;
  abstract getInitialState: () => State;

  private _singleReducers: AbstractSingleReducer<State, any>[];
  private _epicReducers: AbstractEpicReducer<State, any, any>[];
  private _slice: Slice<State, CaseReducers<State, Actions>, string> | null = null;
  private _epic: any = null;

  constructor(
    epicReducers: Array<AbstractEpicReducer<State, any, any>> | null,
    singleReducers: Array<AbstractSingleReducer<State, any>> | null,
  ) {
    this._epicReducers = epicReducers || [];
    this._singleReducers = singleReducers || [];
  }

  get slice(): Slice {
    if (!this._slice) {
      this._slice = createSlice<State, CaseReducers<State, Actions>, string>({
        name: this.getStatName(),
        initialState: this.getInitialState(),
        reducers: {
          ...this._singleReducers.reduce(
            (prev, next) => Object.assign(prev, { [next.actionName]: next.consumeAction }),
            {},
          ),
          ...this._epicReducers.map((x) => x.reducers).reduce((prev, next) => Object.assign(prev, next), {}),
        },
      });
    }
    return this._slice;
  }

  get epic(): any {
    if (!this._epic) {
      this._epic = combineEpics(...this._epicReducers.map((x) => x.epic));
    }
    return this._epic;
  }
}
