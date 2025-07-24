import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { AuthService } from '../../shared/service/auth.service';
import { Router } from '@angular/router';
import { RulesInputComponent } from '../../shared/components/rules-input/rules-input.component';
import { AlertErrorComponent } from '../../shared/components/alert-error/alert-error.component';
import { ErrorAlertDto } from '../../shared/interface/global.model';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoadingComponent,
    RulesInputComponent,
    AlertErrorComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  title = inject(Title);
  authService = inject(AuthService);
  router = inject(Router);

  loginForm!: FormGroup;
  showPassword: boolean = false;
  isLoading: boolean = false;
  errorAlert!: ErrorAlertDto;

  // _______________________________________________________ onLoad Function
  ngOnInit(): void {
    this.title.setTitle(`Backoffice Krusty Crab - Login`);
    const isSessionInvalid = localStorage.getItem('BACKOFFICE_INVALID_SESSION');
    if (isSessionInvalid) {
      this.errorAlert = {
        statusCode: 401,
        message: isSessionInvalid
      }
    }
    this.buildForm();
  }

  buildForm() {
    this.loginForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    });
  }

  // _______________________________________________________ onClick Function
  submitForm() {
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const formValue = this.loginForm.value;
     const success = this.authService.login(formValue.username, formValue.password);
    if (success) {
      localStorage.removeItem('BACKOFFICE_INVALID_SESSION');
      this.router.navigate(['/dashboard']);
    } else {
      this.errorAlert = {
        statusCode: 400,
        message: 'Invalid username or password '
      }
    }
  }

  toggleShowPassword() {
   this.showPassword = !this.showPassword;
  }
 
  // _______________________________________________________ helper Function
  getInputType() {
    if (this.showPassword) {
      return 'text';
    }
    return 'password';
  }

  resetAlertError() {
    this.errorAlert = {
      ...this.errorAlert,
      statusCode: 0,
      message: '',
    }
  }

}
