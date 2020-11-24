import { FetchErrorPayload } from '../interface/FetchErrorPayload.interface';
import { AxiosResponse } from 'axios';
import { SliceActionExecutor } from '../interface/SliceActionExecutor.interface';
export declare abstract class AbstractEpicReducer<State, FetchPayload, FetchSuccessPayload> implements SliceActionExecutor<State, FetchPayload, FetchSuccessPayload> {
    abstract fetchApiCall: (payload: FetchPayload) => Promise<AxiosResponse<FetchSuccessPayload>>;
    abstract fetch: (state: State, payload: FetchPayload) => State;
    abstract fetchSuccess: (state: State, payload: FetchSuccessPayload) => State;
    abstract fetchError: (state: State, payload: FetchErrorPayload) => State;
    private actionName;
    private fetchAction;
    private fetchSuccessAction;
    private fetchErrorAction;
    constructor(sliceName: string, actionName: string);
    get epic(): any;
    get reducers(): any;
}
