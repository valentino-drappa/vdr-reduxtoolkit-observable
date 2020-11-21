import { FetchErrorPayload } from './FetchErrorPayload.interface';
import { AxiosResponse } from 'axios';

export interface SliceActionExecutor<State, FetchPayload, FetchSuccessPayload> {
  fetchApiCall: (data: FetchPayload) => Promise<AxiosResponse<FetchSuccessPayload>>;
  fetch: (state: State, action: FetchPayload) => State;
  fetchSuccess: (state: State, action: FetchSuccessPayload) => State;
  fetchError: (state: State, action: FetchErrorPayload) => State;
}
