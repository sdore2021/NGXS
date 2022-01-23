import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { Decrement, Increment, MulPar2, Reset } from './counter.action';

@State<number>({
  name: 'count',
  defaults: 0,
})
@Injectable()
export class CountState {
  @Action(Increment)
  public increment(ctx: StateContext<number>) {
    const state = ctx.getState();
    ctx.setState(state + 1);
  }

  @Action(Decrement)
  public decrement(ctx: StateContext<number>) {
    const state = ctx.getState();
    ctx.setState(state - 1);
  }

  @Action(MulPar2)
  public mulPar2(ctx: StateContext<number>) {
    const state = ctx.getState();
    ctx.setState(state * 2);
    ctx.dispatch(Increment);
  }

  @Action(Reset)
  public reset(ctx: StateContext<number>) {
    ctx.setState(0);
  }
}
