interface SingleReducerExecuter<State, ActionPayload> {
  consumeAction: (state: State, payload: ActionPayload) => State;
}

export abstract class AbstractSingleReducer<State, ActionPayload>
  implements SingleReducerExecuter<State, ActionPayload> {
  private _actionName: string = '';

  constructor(actionName: string) {
    this._actionName = actionName;
  }

  get actionName() {
    return this._actionName;
  }

  reduce = (state: State, action: { type: string; payload: ActionPayload }) =>
    this.consumeAction(state, action.payload);

  abstract consumeAction: (state: State, payload: ActionPayload) => State;
}
