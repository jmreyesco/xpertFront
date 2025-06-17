import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  success = '';
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    // Redirigir a home si ya está logueado
    if (this.authService.currentUserValue) {
      this.router.navigate(['/profile']);
    }
    
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {}
  
  get f() { return this.registerForm.controls; }
  
  onSubmit(): void {
    this.submitted = true;
    this.success = '';
    this.error = '';
    
    if (this.registerForm.invalid) {
      return;
    }
    
    this.loading = true;
    this.authService.register(this.f['name'].value, this.f['email'].value, this.f['password'].value)
      .subscribe(
        data => {
          if (data.success) {
            this.success = 'Registro exitoso! Redirigiendo al login...';
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 2000);
          } else {
            this.error = data.message || 'Error en el registro';
            this.loading = false;
          }
        },
        error => {
          this.error = error.error?.message || 'Error en el registro';
          this.loading = false;
        }
      );
  }
}
