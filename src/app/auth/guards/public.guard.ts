import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, CanMatchFn, Route, UrlSegment, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, map, tap } from 'rxjs';



const checkAuthStatus = (): boolean |  Observable<boolean> => {
    //se inyectan el AuthService y el Router
    const authService: AuthService = inject(AuthService);
    const router: Router = inject(Router);
   
    return authService.checkAuthentication()
    .pipe(
        tap( isAuthenticated => {
            if (isAuthenticated) {
                router.navigate(['./']);
            }
        }),
        tap( isAuthenticated => console.log("is", isAuthenticated)),
        map( isAuthenticated => !isAuthenticated )
    );
  };

//Tipado CanMatchFN
export const canMatchPublicGuard: CanMatchFn = ( route: Route, segments: UrlSegment[] ) => {
    return checkAuthStatus();
};

//Hay que tener en cuenta el tipado CanActiveFn
export const canActivatePublicGuard: CanActivateFn = ( route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return checkAuthStatus();
};


