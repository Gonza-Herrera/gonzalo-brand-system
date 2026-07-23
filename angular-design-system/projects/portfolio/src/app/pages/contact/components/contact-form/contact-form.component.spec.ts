import { TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';

import { EN_CONTACT_CONTENT } from '../../../../content/en/contact.content';
import { ES_CONTACT_CONTENT } from '../../../../content/es/contact.content';
import {
  CONTACT_FORM_LIMITS,
  type PortfolioContactSubmissionResult,
} from '../../models/contact-form.model';
import { ContactService } from '../../services/contact.service';
import { ContactFormComponent } from './contact-form.component';

describe('ContactFormComponent', () => {
  async function createComponent(
    options: {
      readonly configured?: boolean;
      readonly locale?: 'en' | 'es';
      readonly withFallbackEmail?: boolean;
    } = {},
  ) {
    const submission = new Subject<PortfolioContactSubmissionResult>();
    const contactService = {
      isConfigured: vi.fn(() => options.configured ?? true),
      sendMessage: vi.fn(() => submission.asObservable()),
    };

    await TestBed.configureTestingModule({
      imports: [ContactFormComponent],
      providers: [{ provide: ContactService, useValue: contactService }],
    }).compileComponents();

    const fixture = TestBed.createComponent(ContactFormComponent);
    fixture.componentRef.setInput(
      'content',
      options.locale === 'es' ? ES_CONTACT_CONTENT.form : EN_CONTACT_CONTENT.form,
    );

    if (options.withFallbackEmail) {
      fixture.componentRef.setInput('fallbackEmail', {
        href: 'mailto:gonzalo@domain.test',
        address: 'gonzalo@domain.test',
      });
    }

    fixture.detectChanges();

    return { fixture, component: fixture.componentInstance, contactService, submission };
  }

  function setValidValue(component: ContactFormComponent): void {
    component.form.setValue({
      name: 'Gonzalo Herrera',
      email: 'gonzalo@domain.test',
      subject: 'Angular architecture',
      message: 'A sufficiently detailed professional message.',
      botcheck: false,
    });
  }

  it('renders four visible fields, an off-screen honeypot and an enabled submit button', async () => {
    const { fixture, component } = await createComponent();
    const element = fixture.nativeElement as HTMLElement;
    const visibleControls = element.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
      'input:not([type="checkbox"]), textarea',
    );
    const honeypot = element.querySelector<HTMLInputElement>('#contact-botcheck');

    expect(component.form.enabled).toBe(true);
    expect(component.submissionStatus()).toBe('idle');
    expect(element.querySelectorAll('form')).toHaveLength(1);
    expect(visibleControls).toHaveLength(4);
    expect([...visibleControls].map((control) => control.id)).toEqual([
      'contact-name',
      'contact-email',
      'contact-subject',
      'contact-message',
    ]);
    expect(honeypot?.type).toBe('checkbox');
    expect(honeypot?.tabIndex).toBe(-1);
    expect(honeypot?.autocomplete).toBe('off');
    expect(honeypot?.closest('[aria-hidden="true"]')).not.toBeNull();
    expect(element.querySelector('button[type="submit"]')?.hasAttribute('disabled')).toBe(false);
    expect(element.textContent).not.toContain('not configured yet');

    for (const control of visibleControls) {
      expect(element.querySelector(`label[for="${control.id}"]`)).not.toBeNull();
      expect(control.hasAttribute('placeholder')).toBe(true);
      expect(control.hasAttribute('aria-describedby')).toBe(true);
    }
  });

  it('applies required, trimmed minimum, email and maximum validations', async () => {
    const { component } = await createComponent();
    const form = component.form;

    expect(form.invalid).toBe(true);
    expect(form.controls.name.hasError('required')).toBe(true);

    form.controls.name.setValue(' A ');
    expect(form.controls.name.hasError('minlength')).toBe(true);
    form.controls.name.setValue(' '.repeat(3));
    expect(form.controls.name.hasError('whitespace')).toBe(true);
    form.controls.name.setValue('x'.repeat(CONTACT_FORM_LIMITS.nameMax + 1));
    expect(form.controls.name.hasError('maxlength')).toBe(true);

    form.controls.email.setValue('invalid');
    expect(form.controls.email.hasError('email')).toBe(true);
    form.controls.email.setValue('x'.repeat(CONTACT_FORM_LIMITS.emailMax + 1));
    expect(form.controls.email.hasError('maxlength')).toBe(true);

    form.controls.subject.setValue(' AB ');
    expect(form.controls.subject.hasError('minlength')).toBe(true);
    form.controls.subject.setValue('x'.repeat(CONTACT_FORM_LIMITS.subjectMax + 1));
    expect(form.controls.subject.hasError('maxlength')).toBe(true);

    form.controls.message.setValue('x'.repeat(CONTACT_FORM_LIMITS.messageMin - 1));
    expect(form.controls.message.hasError('minlength')).toBe(true);
    form.controls.message.setValue('x'.repeat(CONTACT_FORM_LIMITS.messageMax + 1));
    expect(form.controls.message.hasError('maxlength')).toBe(true);
  });

  it('marks invalid fields as touched, links errors and does not call the service', async () => {
    const { fixture, component, contactService } = await createComponent();

    component.submit();
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const nameInput = element.querySelector<HTMLInputElement>('#contact-name');

    expect(component.form.controls.name.touched).toBe(true);
    expect(component.submitted()).toBe(true);
    expect(contactService.sendMessage).not.toHaveBeenCalled();
    expect(nameInput?.getAttribute('aria-invalid')).toBe('true');
    expect(nameInput?.getAttribute('aria-describedby')).toContain('contact-name-error');
    expect(element.querySelector('#contact-name-error')?.textContent).toContain('Enter your name.');
    expect(element.querySelector('#contact-form-validation-summary')?.textContent).toContain(
      'Please review the highlighted fields.',
    );
  });

  it('renders the matching localized minimum, format and maximum messages', async () => {
    const { fixture, component } = await createComponent();
    const form = component.form;

    form.controls.name.setValue('A');
    form.controls.email.setValue('invalid');
    form.controls.subject.setValue('AB');
    form.controls.message.setValue('Too short');
    form.markAllAsTouched();
    fixture.detectChanges();

    let text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text).toContain('Your name must contain at least 2 characters.');
    expect(text).toContain('Enter a valid email address.');
    expect(text).toContain('The subject must contain at least 3 characters.');
    expect(text).toContain('Message must contain at least 20 characters.');

    const element = fixture.nativeElement as HTMLElement;
    const enterValue = (selector: string, value: string): void => {
      const control = element.querySelector<HTMLInputElement | HTMLTextAreaElement>(selector)!;
      control.value = value;
      control.dispatchEvent(new Event('input', { bubbles: true }));
    };

    enterValue('#contact-name', 'x'.repeat(CONTACT_FORM_LIMITS.nameMax + 1));
    enterValue('#contact-email', 'x'.repeat(CONTACT_FORM_LIMITS.emailMax + 1));
    enterValue('#contact-subject', 'x'.repeat(CONTACT_FORM_LIMITS.subjectMax + 1));
    enterValue('#contact-message', 'x'.repeat(CONTACT_FORM_LIMITS.messageMax + 1));
    fixture.detectChanges();

    text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text).toContain('Your name cannot exceed 80 characters.');
    expect(text).toContain('Your email address cannot exceed 160 characters.');
    expect(text).toContain('The subject cannot exceed 120 characters.');
    expect(text).toContain('Message cannot exceed 2000 characters.');
  });

  it('silently blocks a valid-looking bot submission without issuing a request', async () => {
    const { component, contactService } = await createComponent();
    setValidValue(component);
    component.form.controls.botcheck.setValue(true);

    component.submit();

    expect(contactService.sendMessage).not.toHaveBeenCalled();
    expect(component.submissionStatus()).toBe('idle');
  });

  it('enters submitting, disables only the button and ignores duplicate submits', async () => {
    const { fixture, component, contactService } = await createComponent();
    setValidValue(component);

    component.submit();
    component.submit();
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;

    expect(contactService.sendMessage).toHaveBeenCalledTimes(1);
    expect(component.submissionStatus()).toBe('submitting');
    expect(element.querySelector('form')?.getAttribute('aria-busy')).toBe('true');
    expect(element.querySelector('fieldset')?.hasAttribute('disabled')).toBe(false);
    expect(element.querySelector('button[type="submit"]')?.hasAttribute('disabled')).toBe(true);
    expect(element.textContent).toContain('Sending…');
  });

  it('shows localized success, resets only after success and re-enables submission', async () => {
    const { fixture, component, submission } = await createComponent();
    setValidValue(component);

    component.submit();
    submission.next({ success: true });
    submission.complete();
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;

    expect(component.submissionStatus()).toBe('success');
    expect(component.form.getRawValue()).toEqual({
      name: '',
      email: '',
      subject: '',
      message: '',
      botcheck: false,
    });
    expect(component.form.pristine).toBe(true);
    expect(component.form.untouched).toBe(true);
    expect(component.submitted()).toBe(false);
    expect(element.querySelector('[role="status"]')?.textContent).toContain(
      'Message sent successfully',
    );
    expect(element.querySelector('button[type="submit"]')?.hasAttribute('disabled')).toBe(false);
    expect(element.querySelector('.contact-field__error')).toBeNull();
  });

  it('shows localized error, preserves values and allows a retry', async () => {
    const { fixture, component, submission } = await createComponent();
    setValidValue(component);
    const snapshot = component.form.getRawValue();

    component.submit();
    submission.error(new Error('Network failure'));
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;

    expect(component.submissionStatus()).toBe('error');
    expect(component.form.getRawValue()).toEqual(snapshot);
    expect(element.querySelector('[role="alert"]')?.textContent).toContain(
      'The message could not be sent',
    );
    expect(element.querySelector('button[type="submit"]')?.hasAttribute('disabled')).toBe(false);
  });

  it('renders a safe fallback when configuration is absent and keeps direct email visible', async () => {
    const { fixture, component, contactService } = await createComponent({
      configured: false,
      withFallbackEmail: true,
    });
    const element = fixture.nativeElement as HTMLElement;

    expect(component.submissionStatus()).toBe('unavailable');
    expect(element.querySelector('fieldset')?.hasAttribute('disabled')).toBe(true);
    expect(element.querySelector('button[type="submit"]')?.hasAttribute('disabled')).toBe(true);
    expect(element.querySelector('a[href="mailto:gonzalo@domain.test"]')?.textContent).toContain(
      'gonzalo@domain.test',
    );
    expect(element.querySelector('[role="status"]')?.textContent).toContain(
      'temporarily unavailable',
    );
    expect(element.textContent).not.toContain('access key');

    component.submit();
    expect(contactService.sendMessage).not.toHaveBeenCalled();
  });

  it('renders Spanish fields, placeholders, submitting and success feedback', async () => {
    const { fixture, component, submission } = await createComponent({ locale: 'es' });
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('label[for="contact-name"]')?.textContent).toContain('Nombre');
    expect(element.querySelector<HTMLInputElement>('#contact-name')?.placeholder).toBe('Tu nombre');
    expect(element.querySelector<HTMLInputElement>('#contact-email')?.placeholder).toBe(
      'tu@ejemplo.com',
    );

    setValidValue(component);
    component.submit();
    fixture.detectChanges();
    expect(element.textContent).toContain('Enviando…');

    submission.next({ success: true });
    fixture.detectChanges();
    expect(element.textContent).toContain('Mensaje enviado correctamente');
  });
});
