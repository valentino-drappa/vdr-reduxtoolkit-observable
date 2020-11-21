import { Action } from 'redux';
interface SingleReducerExecuter<State, ActionPayload> {
    consumeAction: (state: State, action: Action<ActionPayload>) => State;
}
export declare abstract class AbstractSingleReducer<State, ActionPayload> implements SingleReducerExecuter<State, ActionPayload> {
    private _actionName;
    constructor(actionName: string);
    get actionName(): string;
    abstract consumeAction: (state: State, action: Action<ActionPayload>) => State;
}
export {};
