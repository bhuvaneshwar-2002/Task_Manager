import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'danger' | 'outline' | 'text' = 'primary';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() icon?: string;
  @Input() loading = false;
  @Input() disabled = false;
}
