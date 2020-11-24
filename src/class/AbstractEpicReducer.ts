import { createAction, PayloadActionCreator, Action } from '@reduxjs/toolkit';
import { FetchErrorPayload } from '../interface/FetchErrorPayload.interface';
import { AxiosResponse } from 'axios';
import { SlicerActionEpic } from './SliceActionEpic';
import { SliceActionExecutor } from '../interface/SliceActionExecutor.interface';

export abstract class AbstractEpicReducer<State, FetchPayload, FetchSuccessPayload>
  implements SliceActionExecutor<State, FetchPayload, FetchSuccessPayload> {
  abstract fetchApiCall: (payload: FetchPayload) => Promise<AxiosResponse<FetchSuccessPayload>>;
  abstract fetch: (state: State, payload: FetchPayload) => State;
  abstract fetchSuccess: (state: State, payload: FetchSuccessPayload) => State;
  abstract fetchError: (state: State, payload: FetchErrorPayload) => State;

  private actionName: string;
  private fetchAction: PayloadActionCreator<FetchPayload, string>;
  private fetchSuccessAction: PayloadActionCreator<FetchSuccessPayload, string>;
  private fetchErrorAction: PayloadActionCreator<FetchErrorPayload, string>;

  constructor(sliceName: string, actionName: string) {
    this.fetchAction = createAction<FetchPayload>(`${sliceName}/${actionName}_fetch`);
    this.fetchSuccessAction = createAction<FetchSuccessPayload>(`${sliceName}/${actionName}_fetchSuccess`);
    this.fetchErrorAction = createAction<FetchErrorPayload>(`${sliceName}/${actionName}_fetchError`);
    this.actionName = actionName;
  }

  get epic(): any {
    return new SlicerActionEpic<FetchPayload, FetchSuccessPayload>(
      this.fetchAction.type,
      this.fetchSuccessAction,
      this.fetchErrorAction,
      this.fetchApiCall,
    ).epic;
  }

  get reducers(): any {
    return {
      [`${this.actionName}_fetch`]: (state: State, action: { type: string; payload: FetchPayload }): State =>
        this.fetch(state, action.payload),
      [`${this.actionName}_fetchSuccess`]: (
        state: State,
        action: { type: string; payload: FetchSuccessPayload },
      ): State => this.fetchSuccess(state, action.payload),
      [`${this.actionName}_fetchError`]: (state: State, action: { type: string; payload: FetchErrorPayload }): State =>
        this.fetchError(state, action.payload),
    };
  }
}
