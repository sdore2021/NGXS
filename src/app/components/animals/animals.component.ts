import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import {
  AddZebra,
  ChangeName,
  ChangePandaName,
  InitializeState,
  RemovePanda,
} from 'src/app/store/counter/animal/animal.actions';
import { AnimalsStateModel } from 'src/app/store/counter/animal/animal.model';
import { AnimalsState } from 'src/app/store/counter/animal/animal.state';

@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.css'],
})
export class AnimalsComponent {
  animals!: AnimalsStateModel;

  constructor(private store: Store) {
    this.store.select(AnimalsState).subscribe((data) => {
      this.animals = data;
      console.log('***contructor call***', data);
    });
  }

  //@Select(AnimalsState) animals$: Observable<AnimalsStateModel> | undefined;

  initializeState() {
    this.store.dispatch(new InitializeState());
  }

  changeName(name: string) {
    this.store.dispatch(new ChangeName(name));
  }

  addZebra(zebra: string) {
    this.store.dispatch(new AddZebra(zebra));
  }

  removePanda(panda: string) {
    this.store.dispatch(new RemovePanda(panda));
  }

  changePandaName(old: string, newName: string) {
    const panda = { name: old, newName: newName };
    this.store.dispatch(new ChangePandaName(panda));
  }
}
