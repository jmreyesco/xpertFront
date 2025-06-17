import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoggedIn = false;
  userName = '';
  title = 'angular';
    // Agrega esta propiedad a tu clase AppComponent
  showMobileMenu = false;
  
  constructor(private authService: AuthService, private router: Router) {}
  
  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      this.isLoggedIn = !!user;
      this.userName = user ? user.name : '';
    });
  }
  
  logout(event: Event): void {
    event.preventDefault();
    this.authService.logout();
  }
}