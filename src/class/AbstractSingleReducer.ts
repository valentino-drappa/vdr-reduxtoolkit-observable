import { Action } from 'redux';
import { SingleAction } from '../interface/SingleAction.interface';

interface SingleReducerExecuter<State, ActionPayload> {
  consumeAction: (state: State, action: SingleAction<ActionPayload>) => State;
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

  abstract consumeAction: (state: State, action: SingleAction<ActionPayload>) => State;
}
