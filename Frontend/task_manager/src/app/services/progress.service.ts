import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  private progressSubject = new BehaviorSubject<number>(0);
  progress$ = this.progressSubject.asObservable();

  setProgress(value: number) {
    if (value >= 0 && value <= 100) {
      this.progressSubject.next(value);
    }
  }

  resetProgress() {
    this.progressSubject.next(0);
  }
}
