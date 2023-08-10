import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';

@Pipe({
  name: 'heroImage'
})
export class HeroImagePipe implements PipeTransform {

  transform(hero: Hero): string {

    if(!hero.id && !hero.atl_img){
        return "assets/no-image.png"
    }
    
    if(hero.atl_img){
        return hero.atl_img;
    }

    return `assets/heroes/${hero.id}.jpg`;
  }

}
