import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-password-field',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: './password-field.html',
  styleUrl: './password-field.scss',
})
export class PasswordField {
  @Input({ required: true }) control!: FormControl;
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  get passwordErrors(): string | null {
    const control = this.control.get('password');
    if (control?.hasError('required')) return 'O cadastro da senha é obrigatório.';
    if (control?.hasError('minlength')) return 'O nome completo deve ter no mínimo 6 caracteres.';
    return null;
  }
}
