import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: [ './hero-search.component.css' ]
})
export class HeroSearchComponent implements OnInit {
  heroes$!: Observable<Hero[]>;

  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) {}

  // Push un término en el observable.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      // esperar 300ms después de cada tecla pulsada antes de evaluar el término
      debounceTime(300),

      // ignorar el nuevo término si es igual al anterior
      distinctUntilChanged(),

      // llama al servicio search cada vez que el término cambia
      switchMap((term: string) => this.heroService.searchHeroes(term)),

      //With the switchMap operator, every qualifying key event can trigger an HttpClient.get() method call.
      //Even with a 300ms pause between requests, you could have multiple HTTP requests in flight and they may not return in the order sent.
      // switchMap() preserves the original request order while returning only the observable from the most recent HTTP method call. Results from prior calls are canceled and discarded.
      // Note that canceling a previous searchHeroes() Observable doesn't actually abort a pending HTTP request. Unwanted results are discarded before they reach your application code.
    );
  }
}