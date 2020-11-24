import { FetchErrorPayload } from './FetchErrorPayload.interface';
import { AxiosResponse } from 'axios';

export interface SliceActionExecutor<State, FetchPayload, FetchSuccessPayload> {
  fetchApiCall: (payload: FetchPayload) => Promise<AxiosResponse<FetchSuccessPayload>>;
  fetch: (state: State, payload: FetchPayload) => State;
  fetchSuccess: (state: State, payload: FetchSuccessPayload) => State;
  fetchError: (state: State, payload: FetchErrorPayload) => State;
}
