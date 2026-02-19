import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PasswordField } from '../../shared/components/password-field/password-field';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../services/user';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { Auth } from '../../services/auth';
@Component({
  selector: 'app-register',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    PasswordField,
    ReactiveFormsModule,
    CommonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss',
  encapsulation: ViewEncapsulation.None,
})
export class Register implements OnInit {
  form: FormGroup;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: User,
    private router: Router,
    private authService: Auth,
  ) {
    this.form = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/tasks']);
    }
  }
  get passwordControl(): FormControl {
    return this.form.get('senha') as FormControl;
  }
  get fullNameErrors(): string | null {
    const control = this.form.get('nome');
    if (control?.hasError('required')) return 'O nome completo é obrigatório.';
    if (control?.hasError('minlength')) return 'O nome completo deve ter no mínimo 3 caracteres.';
    return null;
  }
  get emailErrors(): string | null {
    const control = this.form.get('email');
    if (control?.hasError('required')) return 'O email é obrigatório.';
    if (control?.hasError('email')) return 'O email informado não é válido.';
    return null;
  }
  get senhaErrors(): string | null {
    const control = this.form.get('senha');
    if (control?.hasError('required')) return 'A senha é obrigatória.';
    if (control?.hasError('minlength')) return 'A senha deve conter no mínimo 6 caracteres.';
    return null;
  }
  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    const formData = this.form.value;
    this.userService
      .register(formData)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (response) => {
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Erro ao registrar usuário:', error);
        },
      });
  }
}
