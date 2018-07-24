import { Injectable } from '@angular/core';
import { switchMap, take } from 'rxjs/operators';

import { UserService } from './user.service';
import { SessionService } from './session.service';

@Injectable()
export class CoreService {

  constructor(
    private user: UserService,
    private session: SessionService,
  ) {}

  public initialize(): void {
    this
      .session
      .exists$
      .pipe(
        take(1),
        switchMap((exists) => {
          return this.user.initialize(exists);
        })
      )
      .subscribe();
  }

}
