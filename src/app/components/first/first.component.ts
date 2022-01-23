import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { MulPar2 } from 'src/app/store/counter/counter.action';
import { CountState } from 'src/app/store/counter/counter.state';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.css'],
})
export class FirstComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {}

  @Select(CountState) count$: Observable<number> | undefined;

  mulPar2() {
    this.store.dispatch(new MulPar2());
  }
}
