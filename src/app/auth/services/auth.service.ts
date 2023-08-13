import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from 'src/environments/environments';
import { User } from '../interfaces/user.interface';
import { Observable, tap, catchError, of, map } from 'rxjs';


@Injectable({providedIn: 'root'})
export class AuthService {

    private baseUrl = environments.baseUrl;
    private user?: User;

    constructor(private http: HttpClient) { }

    get currentUser():User | undefined{
        if( !this.user ) return undefined;
        // return {...this.user};
        return structuredClone(this.user);
    }

    login(user:string, password:string):Observable<User | undefined>{
        return this.http.get<User>(`${this.baseUrl}/users/1`)
        .pipe(
            tap( user => this.user = user ),
            tap( user => localStorage.setItem("token", "ASDASDQasdasdsad123123qasdasd.asdasd.asdasdsadsa" ) ),
            catchError( error => of(undefined))
        )
    }

    checkAuthentication():Observable<boolean> {

        if(!localStorage.getItem("token")) return of(false)

        const token = localStorage.getItem("token")

        return this.http.get<User>(`${this.baseUrl}/users/1`)
        .pipe( 
            tap(user => this.user = user),
            map( user => !!user ), //doble negacion para convertir el valor a boleano
            catchError( err => of(false) )
        )

    }

    logout():void{
        localStorage.removeItem("token")
    }
    
}