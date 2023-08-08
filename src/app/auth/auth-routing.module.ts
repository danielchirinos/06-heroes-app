import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

const routes: Routes = [
    {
        path: "",
        component: LayoutPageComponent,
        children: [
            { path: "login", component: LoginPageComponent },
            { path: "new-acount", component: RegisterPageComponent }, //ruta comodin, se debe tener cuidado donde se coloca para que no pise las anteriores
            { path: "**", redirectTo: "login" },
        ]
    },

]

@NgModule({
    imports: [ RouterModule.forChild( routes ) ],
    exports: [ RouterModule ],
})
export class AppRougintModule { }
