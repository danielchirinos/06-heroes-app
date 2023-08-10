import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../services/hero.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: [
  ]
})
export class HeroPageComponent implements OnInit {

    public hero?: Hero;

    constructor(private heroService: HeroService, private activatedRouter: ActivatedRoute, private router: Router){}


    ngOnInit(): void {

        this.activatedRouter.params
        .pipe(
            // delay(5000),
            switchMap( ({ id }) => this.heroService.getHeroById( id ))
        ).subscribe( hero => {
            if(!hero) return this.router.navigate([ "/heroes/list" ]);

            this.hero = hero
            return;
        })
        // this.heroService.getHeroById()
    }

    goBack(){
        this.router.navigateByUrl("/heroes/list")
    }


}
