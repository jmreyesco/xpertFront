import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  returnUrl: string;
  
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { 
    // Redirigir a home si ya está logueado
    if (this.authService.currentUserValue) { 
      this.router.navigate(['/profile']);
    }
    
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/profile';
  }

  ngOnInit(): void {}
  
  get f() { return this.loginForm.controls; }
  
  onSubmit(): void {
    this.submitted = true;
    
    if (this.loginForm.invalid) {
      return;
    }
    
    this.loading = true;
    this.authService.login(this.f['email'].value, this.f['password'].value)
      .subscribe(
        data => {
          if (data.success) {
            this.router.navigate([this.returnUrl]);
          } else {
            this.error = data.message || 'Error en la autenticación';
            this.loading = false;
          }
        },
        error => {
          this.error = error.error?.message || 'Error en la autenticación';
          this.loading = false;
        }
      );
  }
}
