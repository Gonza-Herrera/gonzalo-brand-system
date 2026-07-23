import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { GhButtonComponent, GhCardComponent, GhStackComponent } from 'gh-design-system';

import type {
  PortfolioContactFieldContent,
  PortfolioContactFormContent,
} from '../../../../content/models/contact-content.model';
import {
  CONTACT_FORM_LIMITS,
  type PortfolioContactSubmissionStatus,
} from '../../models/contact-form.model';
import { nonWhitespaceValidator } from '../../validators/contact-form.validators';

type ContactFormControlName = 'name' | 'email' | 'company' | 'subject' | 'message';

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

  readonly content = input.required<PortfolioContactFormContent>();
  readonly limits = CONTACT_FORM_LIMITS;
  readonly submissionStatus = signal<PortfolioContactSubmissionStatus>('unavailable');
  readonly isSubmitting = computed(() => this.submissionStatus() === 'submitting');
  readonly submitted = signal(false);

  readonly form = this.formBuilder.nonNullable.group({
    name: [
      '',
      [Validators.required, nonWhitespaceValidator, Validators.maxLength(CONTACT_FORM_LIMITS.name)],
    ],
    email: [
      '',
      [Validators.required, Validators.email, Validators.maxLength(CONTACT_FORM_LIMITS.email)],
    ],
    company: ['', [Validators.maxLength(CONTACT_FORM_LIMITS.company)]],
    subject: [
      '',
      [
        Validators.required,
        nonWhitespaceValidator,
        Validators.maxLength(CONTACT_FORM_LIMITS.subject),
      ],
    ],
    message: [
      '',
      [
        Validators.required,
        nonWhitespaceValidator,
        Validators.minLength(CONTACT_FORM_LIMITS.messageMin),
        Validators.maxLength(CONTACT_FORM_LIMITS.messageMax),
      ],
    ],
  });

  constructor() {
    this.form.disable({ emitEvent: false });
  }

  submit(): void {
    this.submissionStatus.set('unavailable');
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
    if (errors['email']) {
      return field.invalidMessage;
    }
    if (errors['minlength']) {
      return field.minLengthMessage;
    }
    if (errors['maxlength']) {
      return field.maxLengthMessage;
    }
    return undefined;
  }
}
