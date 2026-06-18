import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  display = signal('0');
  previousValue = signal<number | null>(null);
  operation = signal<string | null>(null);
  shouldResetDisplay = signal(false);

  buttons = [
    { label: 'AC', class: 'function-btn', value: 'clear' },
    { label: '⌫', class: 'function-btn', value: 'backspace' },
    { label: '%', class: 'function-btn', value: '%' },
    { label: '÷', class: 'operator-btn', value: '/' },
    
    { label: '7', class: 'number-btn', value: '7' },
    { label: '8', class: 'number-btn', value: '8' },
    { label: '9', class: 'number-btn', value: '9' },
    { label: '×', class: 'operator-btn', value: '*' },
    
    { label: '4', class: 'number-btn', value: '4' },
    { label: '5', class: 'number-btn', value: '5' },
    { label: '6', class: 'number-btn', value: '6' },
    { label: '−', class: 'operator-btn', value: '-' },
    
    { label: '1', class: 'number-btn', value: '1' },
    { label: '2', class: 'number-btn', value: '2' },
    { label: '3', class: 'number-btn', value: '3' },
    { label: '+', class: 'operator-btn', value: '+' },
    
    { label: '0', class: 'number-btn zero-btn', value: '0' },
    { label: '.', class: 'number-btn', value: '.' },
    { label: '=', class: 'equals-btn', value: '=' },
  ];

  onButtonClick(btn: any) {
    if (btn.value === 'clear') {
      this.clear();
    } else if (btn.value === 'backspace') {
      this.backspace();
    } else if (['+', '-', '*', '/', '%'].includes(btn.value)) {
      this.setOperation(btn.value);
    } else if (btn.value === '=') {
      this.calculate();
    } else {
      this.appendNumber(btn.value);
    }
  }

  appendNumber(num: string) {
    const current = this.display();
    
    if (num === '.') {
      if (current.includes('.')) return;
      this.display.set(current === '0' ? '0.' : current + '.');
    } else {
      if (current === '0' && num !== '0') {
        this.display.set(num);
      } else if (current === '0' && num === '0') {
        return;
      } else {
        this.display.set(current + num);
      }
    }
    
    this.shouldResetDisplay.set(false);
  }

  backspace() {
    const current = this.display();
    if (current.length > 1) {
      this.display.set(current.slice(0, -1));
    } else {
      this.display.set('0');
    }
  }

  setOperation(op: string) {
    const currentValue = parseFloat(this.display());
    
    if (this.previousValue() !== null && !this.shouldResetDisplay()) {
      this.calculate();
    }
    
    this.previousValue.set(currentValue);
    this.operation.set(op);
    this.shouldResetDisplay.set(true);
  }

  calculate() {
    const current = parseFloat(this.display());
    const previous = this.previousValue();
    const op = this.operation();
    
    if (previous === null || op === null) return;
    
    let result = 0;
    
    switch (op) {
      case '+':
        result = previous + current;
        break;
      case '-':
        result = previous - current;
        break;
      case '*':
        result = previous * current;
        break;
      case '/':
        result = current === 0 ? 0 : previous / current;
        break;
      case '%':
        result = previous % current;
        break;
    }
    
    this.display.set(this.formatResult(result));
    this.previousValue.set(null);
    this.operation.set(null);
    this.shouldResetDisplay.set(true);
  }

  clear() {
    this.display.set('0');
    this.previousValue.set(null);
    this.operation.set(null);
    this.shouldResetDisplay.set(false);
  }

  private formatResult(num: number): string {
    return Number.isInteger(num) ? num.toString() : num.toFixed(8).replace(/\.?0+$/, '');
  }
}
