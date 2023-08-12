import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroService } from '../../services/hero.service';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent implements OnInit {

    public heroForm = new FormGroup({
        id: new FormControl<string>(""),
        superhero: new FormControl<string>("", { nonNullable: true }),
        publisher: new FormControl<Publisher>( Publisher.Seleccione ),
        alter_ego: new FormControl(""),
        first_appearance: new FormControl(""),
        characters: new FormControl(""),
        atl_img: new FormControl(""),
    })
    
    public publishers = [
        {id: "DC Comics", desc: "DC - Comics"},
        {id: "Marvel Comics", desc: "Marvel - Comics"}
    ]

    constructor( private heroService: HeroService, private activatedRouter: ActivatedRoute, private router: Router, private snackBar: MatSnackBar, private dialog: MatDialog){ }

    ngOnInit(): void {
        if ( !this.router.url.includes("edit") ) return

        this.activatedRouter.params
        .pipe(
            switchMap( ({ id }) => this.heroService.getHeroById( id )), 
        ).subscribe( hero => {

            if( !hero ) return this.router.navigateByUrl("/")

            this.heroForm.reset( hero )
            return
        }) 

    }

    get currentHero(): Hero{
        const hero = this.heroForm.value as Hero;
        return hero
    }


    onSubmit():void {
        if( this.heroForm.invalid ) return;

        if( this.currentHero.id ){

            this.heroService.updateHero( this.currentHero )
            .subscribe( hero => {
                this.showSnacBar(` ${hero.superhero} updated `)
                
            })
            return;
            
        }
        
        this.heroService.addHero( this.currentHero )
        .subscribe( hero => {
            this.showSnacBar(` ${hero.superhero} created `)
            this.router.navigate(["/heroes/edit", hero.id])
        })
        
    }

    onConfirmDelete(){
        if( !this.currentHero.id ) throw new Error("id del hero requerido");
        
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: this.heroForm.value,
        });
      
        dialogRef.afterClosed()
        .pipe(
            filter( (result :boolean) => result), //si presiono el boton de ok en la confirmacion
            switchMap( () => this.heroService.deleteHeroById( this.currentHero.id )  ),
            filter( (deleted :boolean) => deleted ), //si el servicio devuelve true
        )
        .subscribe( () => {
            this.showSnacBar(` ${this.currentHero.superhero} deleted `)
            this.router.navigateByUrl("/heroes/list/");
        })
        // dialogRef.afterClosed().subscribe(result => {
        //     if( !result ) return
            
        //     this.heroService.deleteHeroById( this.currentHero.id )
        //     .subscribe( res => {
        //         if(res){
        //             this.showSnacBar(` ${this.currentHero.superhero} deleted `)
        //             this.router.navigateByUrl("/heroes/list/");
        //         }
        //     } )
        // });

    }

    showSnacBar(message: string ):void{
        this.snackBar.open(message, 'Done', {
            duration: 3000,
        })
    }
}
