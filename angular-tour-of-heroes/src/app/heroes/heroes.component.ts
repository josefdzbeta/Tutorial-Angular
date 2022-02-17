import { Component, OnInit } from '@angular/core';

//Importamos interfaz
import { Hero } from '../hero';

//Array de héroes
// import { HEROES } from '../mock-heroes'

//Servicios
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  hero: Hero = {
    id : 1,
    name: 'Windstorm'
  }

  //Obtener lista de héroes let hero (objeto) of heroes (lista de héroes)
  // heroes = HEROES;
  heroes: Hero[] = [];
  selectedHero?: Hero;


  //el parámetro simultáneamente define heroService como propiedad privada y la identifica como inyección de HeroService
  constructor(private heroService: HeroService, private messageService: MessageService) { }
  
  ngOnInit():void {
    this.getHeroes();
  }
  
  onSelect (hero: Hero): void{
    this.selectedHero = hero;
    this.messageService.add(`HeroesComponent: Héroe Seleccionado id=${hero.id}`);
  }

  getHeroes(): void {
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
  }
}
