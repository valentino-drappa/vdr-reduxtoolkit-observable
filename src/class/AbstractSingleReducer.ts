import { Action } from 'redux';

interface SingleReducerExecuter<State, ActionPayload> {
  consumeAction: (state: State, action: Action<ActionPayload>) => State;
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

  abstract consumeAction: (state: State, action: Action<ActionPayload>) => State;
}
