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
  constructor(private messageService: MessageService) { }
}
