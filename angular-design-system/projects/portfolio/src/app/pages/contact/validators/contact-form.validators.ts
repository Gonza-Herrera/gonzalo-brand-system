import type { AbstractControl, ValidationErrors } from '@angular/forms';

export function nonWhitespaceValidator(control: AbstractControl<unknown>): ValidationErrors | null {
  return typeof control.value === 'string' && control.value.trim().length > 0
    ? null
    : { whitespace: true };
}
