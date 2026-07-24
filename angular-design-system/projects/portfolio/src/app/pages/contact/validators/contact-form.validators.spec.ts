import { FormControl } from '@angular/forms';

import { nonWhitespaceValidator, trimmedMinLengthValidator } from './contact-form.validators';

describe('nonWhitespaceValidator', () => {
  it.each(['', '   ', '\t', '\n', ' \t\n '])('rejects a blank value: %j', (value) => {
    expect(nonWhitespaceValidator(new FormControl(value, { nonNullable: true }))).toEqual({
      whitespace: true,
    });
  });

  it.each(['Angular', '  Angular  ', 'Diseño con IA'])('accepts meaningful text: %j', (value) => {
    expect(nonWhitespaceValidator(new FormControl(value, { nonNullable: true }))).toBeNull();
  });

  it('rejects null and unexpected non-string values defensively', () => {
    expect(nonWhitespaceValidator(new FormControl<string | null>(null))).toEqual({
      whitespace: true,
    });
    expect(nonWhitespaceValidator(new FormControl<number | null>(42))).toEqual({
      whitespace: true,
    });
  });

  it('does not mutate the control value', () => {
    const control = new FormControl('  Angular  ', { nonNullable: true });

    nonWhitespaceValidator(control);

    expect(control.value).toBe('  Angular  ');
  });
});

describe('trimmedMinLengthValidator', () => {
  const validator = trimmedMinLengthValidator(3);

  it('measures meaningful content after trimming boundary whitespace', () => {
    expect(validator(new FormControl('  AB  ', { nonNullable: true }))).toEqual({
      minlength: {
        requiredLength: 3,
        actualLength: 2,
      },
    });
    expect(validator(new FormControl('  ABC  ', { nonNullable: true }))).toBeNull();
  });

  it('leaves empty-value handling to required and does not mutate the control', () => {
    const control = new FormControl('', { nonNullable: true });

    expect(validator(control)).toBeNull();
    expect(control.value).toBe('');
  });
});
