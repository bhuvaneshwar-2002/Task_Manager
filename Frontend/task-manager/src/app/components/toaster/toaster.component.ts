import { Component, Input } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-toaster',
  standalone: true,
  imports: [CommonModule, TitleCasePipe], // ✅ add CommonModule & TitleCasePipe
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.css']
})
export class ToasterComponent {
  @Input() message: string = '';
  @Input() type: 'success' | 'error' | 'info' | 'warn' = 'info';
  @Input() autoClose: boolean = true;
  @Input() duration: number = 3000; // in ms
  @Input() showCloseButton: boolean = true;

  visible = true;

  ngOnInit() {
    if (this.autoClose) {
      setTimeout(() => this.close(), this.duration);
    }
  }

  close() {
    this.visible = false;
  }
}
