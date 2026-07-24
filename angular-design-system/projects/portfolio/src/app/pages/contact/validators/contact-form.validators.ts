import type { AbstractControl, ValidationErrors } from '@angular/forms';

export function nonWhitespaceValidator(control: AbstractControl<unknown>): ValidationErrors | null {
  return typeof control.value === 'string' && control.value.trim().length > 0
    ? null
    : { whitespace: true };
}

export function trimmedMinLengthValidator(minLength: number) {
  return (control: AbstractControl<unknown>): ValidationErrors | null => {
    if (typeof control.value !== 'string' || control.value.length === 0) {
      return null;
    }

    const actualLength = control.value.trim().length;

    return actualLength >= minLength
      ? null
      : {
          minlength: {
            requiredLength: minLength,
            actualLength,
          },
        };
  };
}
