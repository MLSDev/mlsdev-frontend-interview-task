import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/index';
import { map, take } from 'rxjs/operators';

import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';

import { UserService } from '../user.service';

@Injectable()
export class AuthenticatedGuard implements CanActivate {

  constructor(private user: UserService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this
      .user
      .isAuthenticated$
      .pipe(
        take(1),
        map((isAuthenticated) => {
          if (!isAuthenticated) {
            this.router.navigate(['/auth']);
          }
          return isAuthenticated;
        })
      );
  }
}
