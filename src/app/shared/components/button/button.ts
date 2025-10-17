import {Component, Input, Output, EventEmitter} from '@angular/core';
import {CommonModule} from '@angular/common';

export type ButtonVariant = 'primary' | 'secondary';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.html',
  styleUrl: './button.scss'
})
export class Button {
  @Input() variant: ButtonVariant = 'primary';
  @Input() disabled: boolean = false;
  @Input() icon?: string;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  
  @Output() click = new EventEmitter<Event>();

  onButtonClick(event: Event): void {
    if (!this.disabled) {
      this.click.emit(event);
    }
  }
}
