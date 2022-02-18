//Dependencia inyectable
import { Injectable } from '@angular/core';
//Interfaz
import { Hero } from './hero'
//Array de héroes
import { HEROES } from './mock-heroes'
//Observable que "escucha" al servidor
import { Observable, of } from 'rxjs';
//Servicio de mensajes (Servicio en Servicio)
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES);
    this.messageService.add('HeroService: fetched heroes');
    return heroes;
  }
  getHero(id: number): Observable<Hero> {
    // For now, assume that a hero with the specified `id` always exists.
    // Error handling will be added in the next step of the tutorial.
    const hero = HEROES.find(h => h.id === id)!;
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(hero);
  }
  constructor(private messageService: MessageService) { }
}
