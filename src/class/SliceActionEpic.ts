import { ActionCreatorWithPayload, ActionCreatorWithoutPayload, ActionCreator, Action } from '@reduxjs/toolkit';
import { from, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { AxiosResponse, AxiosError } from 'axios';
import { FetchErrorPayload } from '../interface/FetchErrorPayload.interface';

export class SlicerActionEpic<FetchPayload, FetchSuccessPayload> {
  private _actionType: string;
  private _onSuccess: ActionCreatorWithPayload<FetchSuccessPayload> | ActionCreatorWithoutPayload;
  private _onError: ActionCreatorWithPayload<FetchErrorPayload> | ActionCreatorWithoutPayload;
  private _apiCall: (data: FetchPayload) => Promise<AxiosResponse<FetchSuccessPayload>>;
  private _epic: any = null;

  constructor(
    actionType: string,
    onSuccess: ActionCreatorWithPayload<any> | ActionCreatorWithoutPayload,
    onError: ActionCreatorWithPayload<any> | ActionCreatorWithoutPayload,
    apiCall: (data: FetchPayload) => Promise<AxiosResponse<FetchSuccessPayload>>,
  ) {
    this._actionType = actionType;
    this._onSuccess = onSuccess;
    this._onError = onError;
    this._apiCall = apiCall;
  }

  private execAction = (data: FetchPayload) => {
    return from(this._apiCall(data)).pipe(
      map((res: any) => {
        if (res && res.data) {
          return this._onSuccess(res.data as FetchSuccessPayload);
        }
        return this._onError({
          errorCode: '500',
          errorMsg: 'AXIOS INVALID DATA',
          errorData: res,
        });
      }),
      catchError((err: AxiosError) =>
        of(
          this._onError({
            errorCode: err.code || '500',
            errorMsg: err.message,
            errorData: err,
          }),
        ),
      ),
    );
  };

  get epic(): any {
    if (!this._epic) {
      this._epic = (action$: any) =>
        action$.pipe(
          ofType(this._actionType),
          map((x: { type: string; payload: FetchPayload }) => x.payload),
          switchMap((payload: FetchPayload) => this.execAction(payload)),
          catchError((e) => of(this._onError(e))),
        );
    }
    return this._epic;
  }
}
