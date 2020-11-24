interface SingleReducerExecuter<State, ActionPayload> {
    consumeAction: (state: State, payload: ActionPayload) => State;
}
export declare abstract class AbstractSingleReducer<State, ActionPayload> implements SingleReducerExecuter<State, ActionPayload> {
    private _actionName;
    constructor(actionName: string);
    get actionName(): string;
    reduce: (state: State, action: {
        type: string;
        payload: ActionPayload;
    }) => State;
    abstract consumeAction: (state: State, payload: ActionPayload) => State;
}
export {};
