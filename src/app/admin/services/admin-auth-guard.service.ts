import { AppUser } from 'shared/models/app-user';
import { UserService } from 'shared/services/user.service';
import { AuthService } from 'shared/services/auth.service';
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router, private userService: UserService) { }

  canActivate() {
    return this.auth.appUser$
    .pipe(
      map((appUser: AppUser) => {
      if (!appUser.isAdmin) {
       this.router.navigateByUrl('/');
      }
      return appUser.isAdmin;
    }));
  }
}
