import { TestBed } from '@angular/core/testing';

import { FormsPage } from './forms';

describe('FormsPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [FormsPage] }).compileComponents();
  });

  it('renders every supported native control without parallel Angular components', () => {
    const fixture = TestBed.createComponent(FormsPage);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;

    for (const type of ['text', 'email', 'password', 'number', 'search']) {
      expect(element.querySelector(`input.gh-input[type="${type}"]`)).not.toBeNull();
    }
    expect(element.querySelector('textarea.gh-textarea')).not.toBeNull();
    expect(element.querySelector('select.gh-select')).not.toBeNull();
    expect(element.querySelector('input.gh-checkbox__control[type="checkbox"]')).not.toBeNull();
    expect(element.querySelector('input.gh-radio__control[type="radio"]')).not.toBeNull();
    expect(element.querySelector('input.gh-switch__control[role="switch"]')).not.toBeNull();
    expect(element.querySelector('gh-input, gh-select, gh-checkbox, gh-switch')).toBeNull();
  });

  it('associates labels, hints and invalid errors with stable IDs', () => {
    const fixture = TestBed.createComponent(FormsPage);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const hintInput = element.querySelector<HTMLInputElement>('#forms-hint');
    const invalidInput = element.querySelector<HTMLInputElement>('#forms-invalid');

    expect(element.querySelector('label[for="forms-hint"]')).not.toBeNull();
    expect(hintInput?.getAttribute('aria-describedby')).toBe('forms-hint-description');
    expect(invalidInput?.getAttribute('aria-invalid')).toBe('true');
    expect(invalidInput?.getAttribute('aria-describedby')).toBe('forms-invalid-error');
    expect(element.querySelector('#forms-invalid-error.gh-form-field__error')).not.toBeNull();
  });

  it('preserves native selection semantics and states', () => {
    const fixture = TestBed.createComponent(FormsPage);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const indeterminate = [
      ...element.querySelectorAll<HTMLInputElement>('.gh-checkbox__control'),
    ].find((control) => control.indeterminate);
    const selectedRadio = element.querySelector<HTMLInputElement>('.gh-radio__control:checked');
    const switchControl = element.querySelector<HTMLInputElement>('.gh-switch__control:checked');

    expect(indeterminate).toBeDefined();
    expect(selectedRadio?.value).toBe('professional');
    expect(switchControl?.getAttribute('role')).toBe('switch');
    expect(element.querySelector('.gh-checkbox__control:disabled')).not.toBeNull();
    expect(element.querySelector('.gh-radio__control:disabled')).not.toBeNull();
    expect(element.querySelector('.gh-switch__control:disabled')).not.toBeNull();
  });

  it('uses typed Reactive Forms and exposes linked errors after submit', () => {
    const fixture = TestBed.createComponent(FormsPage);
    fixture.detectChanges();

    const form = (fixture.nativeElement as HTMLElement).querySelector<HTMLFormElement>(
      '.contact-demo',
    );
    form?.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    const name = (fixture.nativeElement as HTMLElement).querySelector<HTMLInputElement>(
      '#forms-contact-name',
    );
    expect(name?.getAttribute('aria-invalid')).toBe('true');
    expect(name?.getAttribute('aria-describedby')).toBe('forms-contact-name-error');
  });
});
