import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewPageComponent } from '../heroes/pages/new-page/new-page.component';
import { SearchPageComponent } from '../heroes/pages/search-page/search-page.component';
import { ListPageComponent } from '../heroes/pages/list-page/list-page.component';
import { HeroPageComponent } from '../heroes/pages/hero-page/hero-page.component';
import { LayoutSharedComponent } from './pages/layout/layout-shared/layout-shared.component';

const routes: Routes = [
    {
        path: "",
        component: LayoutSharedComponent,
        children: [
            { path: "new-hero", component: NewPageComponent },
            { path: "search", component: SearchPageComponent },
            { path: "edit/:id", component: NewPageComponent },
            { path: "list", component: ListPageComponent },
            { path: ":id", component: HeroPageComponent }, //ruta comodin, se debe tener cuidado donde se coloca para que no pise las anteriores
            { path: "**", redirectTo: "list" },
        ]
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
