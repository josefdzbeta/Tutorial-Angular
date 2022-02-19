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

import { HttpClient, HttpHeaders } from '@angular/common/http';

//Errores
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  // getHeroes(): Observable<Hero[]> {
  //   const heroes = of(HEROES);
  //   this.messageService.add('HeroService: fetched heroes');
  //   return heroes;
  // }

 /** Obtener heroes del servidor */
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }
  /** GET: Error 404 si el id no es encontrado */
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }
    
    /** Log un HeroService mensaje con MessageService */
    private log(message: string) {
      this.messageService.add(`HeroService: ${message}`);
    }
    // URL a la web api
    private heroesUrl = 'api/heroes';
    
    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
    
        console.error(error); 
    
        this.log(`${operation} failed: ${error.message}`);
    
        // Mantener la aplicación en ejecución devolviendo un resultado vacīo
        return of(result as T);
      };
    }
    /** actualizar héroe en el servidor */
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`id héroe actualizado=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  /** POST: añadir nuevo héroe al servidor */
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }
  /** DELETE: borrar héroe del servidor */
  deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }
  /* GET: obtener héroes que contengan el término a buscar */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // si no se encuentra el término, devolver un array vacío de héroes.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`se han encontrado héroes que coinciden "${term}"`) :
        this.log(`no se han encontrado héroes que coincidan "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }
}
