import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, CanMatchFn, Route, UrlSegment, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, tap } from 'rxjs';



const checkAuthStatus = (): boolean | Observable<boolean> => {
    //se inyectan el AuthService y el Router
    const authService: AuthService = inject(AuthService);
    const router: Router = inject(Router);
   
    return authService.checkAuthentication()
    .pipe(
        tap( isAuthenticated => {
            
            if (!isAuthenticated) {
                console.log("esta en el otro guard");
                
                router.navigate(['./auth/login']);
            }
        })
    );
  };

//Tipado CanMatchFN
export const canMatchGuard: CanMatchFn = ( route: Route, segments: UrlSegment[] ) => {

    // console.log('CanMatch');
    // console.log({ route, segments });
    
    return checkAuthStatus();
};

//Hay que tener en cuenta el tipado CanActiveFn
export const canActivateGuard: CanActivateFn = ( route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    // console.log('CanActivate');
    // console.log({ route, state });
    
    return checkAuthStatus();
};


