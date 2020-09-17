import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter
} from '@angular/core';
import { fromEvent, Subscription, Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  tap
} from 'rxjs/operators';

@Component({
  selector: 'lib-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {
  private typeahead: Subscription;
  private searchBoxElement: HTMLElement;
  @Output() public onSearch = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.searchBoxElement = document.getElementById('search-box');
    this.typeahead = fromEvent(this.searchBoxElement, 'input')
      .pipe(
        map((e: KeyboardEvent) => (e.target as HTMLInputElement).value),
        filter(text => text.length > 2),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(data => {
        // console.log(data);
        this.onSearch.emit(data);
      });
  }

  ngOnDestroy() {
    this.typeahead.unsubscribe();
  }
}
