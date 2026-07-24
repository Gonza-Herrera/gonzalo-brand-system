import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { GhButtonComponent, GhCardComponent, GhStackComponent } from 'gh-design-system';

import type {
  PortfolioContactFieldContent,
  PortfolioContactFormContent,
} from '../../../../content/models/contact-content.model';
import {
  CONTACT_FORM_LIMITS,
  type PortfolioContactEmailFallback,
  type PortfolioContactSubmissionStatus,
} from '../../models/contact-form.model';
import { ContactService } from '../../services/contact.service';
import {
  nonWhitespaceValidator,
  trimmedMinLengthValidator,
} from '../../validators/contact-form.validators';

type ContactFormControlName = 'name' | 'email' | 'subject' | 'message';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule, GhButtonComponent, GhCardComponent, GhStackComponent],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactFormComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly contactService = inject(ContactService);
  private readonly destroyRef = inject(DestroyRef);

  readonly content = input.required<PortfolioContactFormContent>();
  readonly fallbackEmail = input<PortfolioContactEmailFallback | undefined>(undefined);
  readonly limits = CONTACT_FORM_LIMITS;
  readonly submissionStatus = signal<PortfolioContactSubmissionStatus>(
    this.contactService.isConfigured() ? 'idle' : 'unavailable',
  );
  readonly isSubmitting = computed(() => this.submissionStatus() === 'submitting');
  readonly isUnavailable = computed(() => this.submissionStatus() === 'unavailable');
  readonly submitted = signal(false);

  readonly form = this.formBuilder.nonNullable.group({
    name: [
      '',
      [
        Validators.required,
        nonWhitespaceValidator,
        trimmedMinLengthValidator(CONTACT_FORM_LIMITS.nameMin),
        Validators.maxLength(CONTACT_FORM_LIMITS.nameMax),
      ],
    ],
    email: [
      '',
      [Validators.required, Validators.email, Validators.maxLength(CONTACT_FORM_LIMITS.emailMax)],
    ],
    subject: [
      '',
      [
        Validators.required,
        nonWhitespaceValidator,
        trimmedMinLengthValidator(CONTACT_FORM_LIMITS.subjectMin),
        Validators.maxLength(CONTACT_FORM_LIMITS.subjectMax),
      ],
    ],
    message: [
      '',
      [
        Validators.required,
        nonWhitespaceValidator,
        trimmedMinLengthValidator(CONTACT_FORM_LIMITS.messageMin),
        Validators.maxLength(CONTACT_FORM_LIMITS.messageMax),
      ],
    ],
    botcheck: [false],
  });

  submit(): void {
    if (this.isSubmitting()) {
      return;
    }

    this.submitted.set(true);
    this.form.markAllAsTouched();

    if (!this.contactService.isConfigured()) {
      this.submissionStatus.set('unavailable');
      return;
    }

    if (this.form.invalid) {
      return;
    }

    const value = this.form.getRawValue();

    if (value.botcheck) {
      return;
    }

    this.submissionStatus.set('submitting');

    this.contactService
      .sendMessage(value)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.form.reset({
            name: '',
            email: '',
            subject: '',
            message: '',
            botcheck: false,
          });
          this.submitted.set(false);
          this.submissionStatus.set('success');
        },
        error: () => {
          this.submissionStatus.set('error');
        },
      });
  }

  protected showValidationSummary(): boolean {
    return this.submitted() && this.form.invalid;
  }

  protected formDescribedBy(): string {
    const ids = ['contact-required-fields'];

    if (this.submissionStatus() === 'unavailable') {
      ids.push('contact-form-unavailable-description');
    }
    if (this.submissionStatus() === 'success') {
      ids.push('contact-form-success-description');
    }
    if (this.submissionStatus() === 'error') {
      ids.push('contact-form-error-description');
    }
    if (this.showValidationSummary()) {
      ids.push('contact-form-validation-summary');
    }

    return ids.join(' ');
  }

  protected describedBy(controlName: ContactFormControlName): string {
    const ids = [`contact-${controlName}-description`];
    if (this.shouldShowError(controlName)) {
      ids.push(`contact-${controlName}-error`);
    }
    return ids.join(' ');
  }

  protected ariaInvalid(controlName: ContactFormControlName): true | null {
    return this.shouldShowError(controlName) ? true : null;
  }

  protected fieldError(controlName: ContactFormControlName): string | undefined {
    const control = this.form.controls[controlName];
    const field = this.content().fields[controlName];

    if (!this.shouldShowError(controlName) || !control.errors) {
      return undefined;
    }

    return this.resolveErrorMessage(control.errors, field);
  }

  private shouldShowError(controlName: ContactFormControlName): boolean {
    const control = this.form.controls[controlName];
    return control.invalid && (control.touched || this.submitted());
  }

  private resolveErrorMessage(
    errors: Readonly<Record<string, unknown>>,
    field: PortfolioContactFieldContent,
  ): string | undefined {
    if (errors['required']) {
      return field.requiredMessage;
    }
    if (errors['whitespace']) {
      return field.whitespaceMessage;
    }
    if (errors['maxlength']) {
      return field.maxLengthMessage;
    }
    if (errors['email']) {
      return field.invalidMessage;
    }
    if (errors['minlength']) {
      return field.minLengthMessage;
    }
    return undefined;
  }
}
