import { ActionCreatorWithPayload, ActionCreatorWithoutPayload } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
export declare class SlicerActionEpic<FetchPayload, FetchSuccessPayload> {
    private _actionType;
    private _onSuccess;
    private _onError;
    private _apiCall;
    private _epic;
    constructor(actionType: string, onSuccess: ActionCreatorWithPayload<any> | ActionCreatorWithoutPayload, onError: ActionCreatorWithPayload<any> | ActionCreatorWithoutPayload, apiCall: (data: FetchPayload) => Promise<AxiosResponse<FetchSuccessPayload>>);
    private execAction;
    get epic(): any;
}
