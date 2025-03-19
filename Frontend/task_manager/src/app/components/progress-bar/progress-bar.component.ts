import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressBarComponent {
  @Input() type: 'line' | 'spiral' = 'line';
  @Input() progress: number = 0;
  @Input() width: number = 200;
  @Input() height: number = 10;
  @Input() color: string = '#4caf50';
  @Input() animated: boolean = true;
  @Input() indeterminate: boolean = false;  // Enables loading state
  @Input() duration: number = 0.5; // Animation duration in seconds
}



// progressValue = 30;
// isLoading = false;

// constructor(private progressService: ProgressService) {}

// updateProgress(value: number) {
//   this.progressService.setProgress(value);
//   this.progressValue = value;
// }

// toggleLoading() {
//   this.isLoading = !this.isLoading;
// }