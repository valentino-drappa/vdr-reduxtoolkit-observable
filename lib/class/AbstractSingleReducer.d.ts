import { SingleAction } from '../interface/SingleAction.interface';
interface SingleReducerExecuter<State, ActionPayload> {
    consumeAction: (state: State, action: SingleAction<ActionPayload>) => State;
}
export declare abstract class AbstractSingleReducer<State, ActionPayload> implements SingleReducerExecuter<State, ActionPayload> {
    private _actionName;
    constructor(actionName: string);
    get actionName(): string;
    abstract consumeAction: (state: State, action: SingleAction<ActionPayload>) => State;
}
export {};
