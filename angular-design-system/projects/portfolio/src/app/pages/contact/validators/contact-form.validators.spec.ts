import { FormControl } from '@angular/forms';

import { nonWhitespaceValidator } from './contact-form.validators';

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
});
