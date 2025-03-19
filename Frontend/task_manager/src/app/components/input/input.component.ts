import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  @Input() type: 'text' | 'email' | 'password' | 'number' = 'text';
  @Input() placeholder = '';
  @Input() icon?: string;
  @Input() formGroup!: FormGroup;  // Accepts FormGroup from parent
  @Input() formControlName!: string; // Accepts formControlName from parent

  get control() {
    return this.formGroup?.get(this.formControlName);
  }

  get errorMessage(): string {
    if (!this.control) return '';
    if (this.control.hasError('required') && this.control.touched) return 'This field is required';
    if (this.control.hasError('email')) return 'Invalid email format';
    return '';
  }
}
