import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { StringUtil } from '../../utils/string.util';
import { messagesValidation } from '../../types/constant';

@Component({
  selector: 'app-rules-input',
  imports: [
    CommonModule, 
    ReactiveFormsModule
  ],
  templateUrl: './rules-input.component.html',
  styleUrl: './rules-input.component.scss'
})
export class RulesInputComponent {

  @Input() control?: AbstractControl | null;
  @Input() field?: string | null;

  constructor(private readonly stringFormat: StringUtil) {}

  hasError(): boolean {
    return (this.control &&
      this.control.invalid &&
      (this.control.dirty || this.control.touched)) as boolean;
  }

  getErrors(): string[] {
    if (this.control) {
      return Object.keys(this.control.errors as ValidationErrors);
    } else {
      return [];
    }
  }

  getErrorValues(key: string): string[] {
    if (this.control && this.control.errors) {
      const error: ValidationErrors = this.control.errors[key] || {};

      if (Object.values(error).length > 0) {
        return Object.values(error);
      }
    }

    return [];
  }

  getMessage(key: string): string {
    const text: string = messagesValidation[key.toLowerCase()] || null;
    const params = this.getErrorValues(key);
    this.field = this.field ? this.field.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase() : ''; 

    return text
      ? (this.stringFormat.format(text, this.field, ...params) as string)
      : '';
  }
}
