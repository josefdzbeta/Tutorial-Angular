import { Component, OnInit } from '@angular/core';

//Importamos interfaz
import { Hero } from '../hero';

//Array de héroes
import { HEROES } from '../mock-heroes'


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
  heroes = HEROES;
  selectedHero?: Hero;


 
  constructor() {}
  
  ngOnInit():void {}
  
  onSelect (hero: Hero): void{
    this.selectedHero = hero;
  }
}
