import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { append, patch, removeItem, updateItem } from '@ngxs/store/operators';
import {
  AddZebra,
  ChangeName,
  ChangePandaName,
  InitializeState,
  RemovePanda,
  UpdateCategory,
} from './animal.actions';
import { AnimalsStateModel } from './animal.model';

@State<AnimalsStateModel>({
  name: 'animals',
  defaults: {
    zebras: ['Jimmy', 'Jake', 'Alan'],
    pandas: ['Michael', 'John'],
    category: 0,
    name: 'zoo of toulouse',
  },
})
@Injectable()
export class AnimalsState {
  @Action(InitializeState)
  initializeState(ctx: StateContext<AnimalsStateModel>) {
    ctx.setState({
      zebras: ['Jimmy', 'Jake', 'Alan'],
      pandas: ['Michael', 'John'],
      category: 0,
      name: 'zoo of toulouse',
    });
  }

  @Action(ChangeName)
  changeName(ctx: StateContext<AnimalsStateModel>, { payload }: ChangeName) {
    let state = ctx.getState();
    state.name = payload;
    ctx.setState(state);
  }

  @Action(AddZebra)
  addZebra(ctx: StateContext<AnimalsStateModel>, { payload }: AddZebra) {
    ctx.setState(
      patch({
        zebras: append([payload]),
        name: 'test',
      })
    );
    ctx.dispatch(UpdateCategory);
  }

  @Action(RemovePanda)
  removePanda(ctx: StateContext<AnimalsStateModel>, { payload }: RemovePanda) {
    ctx.setState(
      patch({
        pandas: removeItem<string>((name) => name === payload),
      })
    );
    ctx.dispatch(UpdateCategory);
  }

  @Action(ChangePandaName)
  changePandaName(
    ctx: StateContext<AnimalsStateModel>,
    { payload }: ChangePandaName
  ) {
    ctx.setState(
      patch({
        pandas: updateItem<string>(
          (name) => name === payload.name,
          payload.newName
        ),
      })
    );
  }

  @Action(UpdateCategory)
  updateCategory(ctx: StateContext<AnimalsStateModel>) {
    const state = ctx.getState();
    const val = state.pandas.length + state.zebras.length;
    ctx.setState(
      patch({
        category: val,
      })
    );
  }
}
