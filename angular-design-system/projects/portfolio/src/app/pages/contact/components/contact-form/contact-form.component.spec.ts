import { TestBed } from '@angular/core/testing';

import { EN_CONTACT_CONTENT } from '../../../../content/en/contact.content';
import { CONTACT_FORM_LIMITS } from '../../models/contact-form.model';
import { ContactFormComponent } from './contact-form.component';

describe('ContactFormComponent', () => {
  async function createComponent() {
    await TestBed.configureTestingModule({ imports: [ContactFormComponent] }).compileComponents();
    const fixture = TestBed.createComponent(ContactFormComponent);
    fixture.componentRef.setInput('content', EN_CONTACT_CONTENT.form);
    fixture.detectChanges();
    return fixture;
  }

  it('renders a typed, disabled form with stable accessible controls', async () => {
    const fixture = await createComponent();
    const component = fixture.componentInstance;
    const element = fixture.nativeElement as HTMLElement;
    const controls = element.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
      'input, textarea',
    );
    const ids = [...controls].map((control) => control.id);

    expect(component.form.disabled).toBe(true);
    expect(component.submissionStatus()).toBe('unavailable');
    expect(element.querySelector('form')).not.toBeNull();
    expect(element.querySelector('fieldset')?.hasAttribute('disabled')).toBe(true);
    expect(element.querySelector('button[type="submit"]')?.hasAttribute('disabled')).toBe(true);
    expect(controls).toHaveLength(5);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids).toEqual([
      'contact-name',
      'contact-email',
      'contact-company',
      'contact-subject',
      'contact-message',
    ]);
    for (const control of controls) {
      expect(element.querySelector(`label[for="${control.id}"]`)).not.toBeNull();
      expect(control.hasAttribute('aria-describedby')).toBe(true);
    }
    expect(element.querySelector('[role="status"][aria-live="polite"]')?.textContent).toContain(
      'not configured yet',
    );
    expect(element.textContent).not.toContain(EN_CONTACT_CONTENT.form.success.title);
  });

  it('applies required, whitespace, email and length validation when enabled', async () => {
    const fixture = await createComponent();
    const form = fixture.componentInstance.form;
    form.enable();

    expect(form.invalid).toBe(true);
    expect(form.controls.name.hasError('required')).toBe(true);
    form.controls.name.setValue('   ');
    expect(form.controls.name.hasError('whitespace')).toBe(true);
    form.controls.email.setValue('invalid');
    expect(form.controls.email.hasError('email')).toBe(true);
    form.controls.company.setValue('x'.repeat(CONTACT_FORM_LIMITS.company + 1));
    expect(form.controls.company.hasError('maxlength')).toBe(true);
    form.controls.subject.setValue('x'.repeat(CONTACT_FORM_LIMITS.subject + 1));
    expect(form.controls.subject.hasError('maxlength')).toBe(true);
    form.controls.message.setValue('short');
    expect(form.controls.message.hasError('minlength')).toBe(true);
    form.controls.message.setValue('x'.repeat(CONTACT_FORM_LIMITS.messageMax + 1));
    expect(form.controls.message.hasError('maxlength')).toBe(true);
  });

  it('links visible validation feedback to the invalid field', async () => {
    const fixture = await createComponent();
    const form = fixture.componentInstance.form;
    form.enable();
    form.controls.name.markAsTouched();
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const input = element.querySelector<HTMLInputElement>('#contact-name');
    const error = element.querySelector('#contact-name-error');

    expect(input?.getAttribute('aria-invalid')).toBe('true');
    expect(input?.getAttribute('aria-describedby')).toContain('contact-name-description');
    expect(input?.getAttribute('aria-describedby')).toContain('contact-name-error');
    expect(error?.textContent).toContain('Name is required.');
  });

  it('keeps data intact and never reports success when submit is unavailable', async () => {
    const fixture = await createComponent();
    const component = fixture.componentInstance;
    component.form.setValue({
      name: 'Name',
      email: 'name@domain.test',
      company: '',
      subject: 'A subject',
      message: 'A sufficiently detailed professional message.',
    });
    const snapshot = component.form.getRawValue();

    component.submit();
    fixture.detectChanges();

    expect(component.submissionStatus()).toBe('unavailable');
    expect(component.form.getRawValue()).toEqual(snapshot);
    expect((fixture.nativeElement as HTMLElement).textContent).not.toContain(
      EN_CONTACT_CONTENT.form.success.description,
    );
  });
});
