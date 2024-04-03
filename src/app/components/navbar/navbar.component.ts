import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  userRole: string | null = null;
  isLoggedIn!: Observable<boolean>;

  constructor(private authService: AuthService,
    private router: Router) { }

  

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.authService.getUserRole().subscribe(role => {
      this.userRole = role;
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
  
  isAdmin(): boolean {
    return this.userRole === 'ADMIN';
  }
}
