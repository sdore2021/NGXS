import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CountState } from 'src/app/store/counter/counter.state';

@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.css'],
})
export class SecondComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @Select(CountState) count$: Observable<number> | undefined;
}
