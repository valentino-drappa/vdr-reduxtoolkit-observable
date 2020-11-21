import { FetchErrorPayload } from '../interface/FetchErrorPayload.interface';
import { AxiosResponse } from 'axios';
import { SliceActionExecutor } from '../interface/SliceActionExecutor.interface';
export declare abstract class AbstractEpicReducer<State, FetchPayload, FetchSuccessPayload> implements SliceActionExecutor<State, FetchPayload, FetchSuccessPayload> {
    abstract fetchApiCall: (data: FetchPayload) => Promise<AxiosResponse<FetchSuccessPayload>>;
    abstract fetch: (state: State, action: FetchPayload) => State;
    abstract fetchSuccess: (state: State, action: FetchSuccessPayload) => State;
    abstract fetchError: (state: State, action: FetchErrorPayload) => State;
    private actionName;
    private fetchAction;
    private fetchSuccessAction;
    private fetchErrorAction;
    constructor(sliceName: string, actionName: string);
    get epic(): any;
    get reducers(): any;
}
