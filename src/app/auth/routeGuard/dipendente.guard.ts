import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { map, take } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DipendenteGuard implements CanActivate {

  constructor(private authSrv: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    Observable<boolean | UrlTree> |
    Promise<boolean | UrlTree> |
    boolean | UrlTree {

    return this.authSrv.user$.pipe(
      take(1),
      map((user) => {
        if (user) {
          if (user.user.role === "DIPENDENTE") {
            return true;
          }
        }
        return this.router.createUrlTree([ '/login' ]);
      })
    );
  }


}
