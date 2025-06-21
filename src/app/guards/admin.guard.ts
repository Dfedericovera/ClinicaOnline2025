import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> | Observable<boolean> | boolean {

    return this.authService.isAuthenticated().then(isAuth => {
      // console.log('AuthGuard: Authentication status:', isAuth);

      if (isAuth) {
        if (this.authService.usuario === 'admin@admin.com') {
          return true;
        } else {
          this.router.navigate(['/Home']);
          return false;
        }
      } else {
        this.router.navigate(['/Home']);
        return false;
      }
    }).catch(() => {
      this.router.navigate(['/Home']);
      return false;
    });
  }
}