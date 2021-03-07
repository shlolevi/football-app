import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AuthService } from "../auth.service";

@Injectable({
  providedIn: "root",
})
export class PlayerGaurdGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.isAdmin().pipe(
      map((isAdmin) => {
        if (isAdmin) {
          return true;
        } else {
          this.router.navigate(["/players/list"]);
          return false;
        }
      })
    );
  }
}
