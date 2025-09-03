import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ToastMessage {
  severity: 'success' | 'info' | 'warn' | 'error';
  summary?: string;
  detail: string;
  life?: number;
  closable?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  private _messages = new BehaviorSubject<ToastMessage[]>([]);
  messages$ = this._messages.asObservable();

  show(message: ToastMessage) {
    const current = this._messages.getValue();
    this._messages.next([...current, message]);

    if (message.life && message.life > 0) {
      setTimeout(() => this.remove(message), message.life);
    }
  }

  remove(message: ToastMessage) {
    const current = this._messages.getValue();
    this._messages.next(current.filter(m => m !== message));
  }

  clear() {
    this._messages.next([]);
  }
}
