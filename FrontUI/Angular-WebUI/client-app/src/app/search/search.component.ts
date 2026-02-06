import { debounceTime, fromEvent, tap } from 'rxjs';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements AfterViewInit {
  @Input() Hint!: string;

  @Output() searching: EventEmitter<string> = new EventEmitter<string>();
  keyword!: string;

  @ViewChild('inputSearch', {static: true}) inputSearch!: ElementRef;
  
  constructor() {
  }

  ngAfterViewInit() {
    // server-side search
    fromEvent(this.inputSearch.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        tap(() => {
          this.searching.emit(this.keyword);
        })
      )
      .subscribe();
  }
}
