import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../services/hero.service';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: [
  ]
})
export class ListPageComponent implements OnInit {

    public heroes: Hero[] = [] 

    constructor(private heroService: HeroService){

    }

    ngOnInit(): void {
        this.heroService.getHeroes()
        .subscribe( (heroes:Hero[]) => {
            this.heroes = heroes
            
        })
    }
}
