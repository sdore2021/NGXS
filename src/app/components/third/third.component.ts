import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Reset } from 'src/app/store/counter/counter.action';
import { CountState } from 'src/app/store/counter/counter.state';

@Component({
  selector: 'app-third',
  templateUrl: './third.component.html',
  styleUrls: ['./third.component.css'],
})
export class ThirdComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {}

  @Select(CountState) count$: Observable<number> | undefined;

  reset() {
    this.store.dispatch(new Reset());
  }
}
