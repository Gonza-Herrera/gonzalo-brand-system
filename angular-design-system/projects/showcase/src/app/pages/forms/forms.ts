import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  GhAmbientBackgroundComponent,
  GhButtonComponent,
  GhCardComponent,
  GhIconButtonComponent,
} from 'gh-design-system';

import { CodePreview } from '../../shared/components/code-preview/code-preview';
import { DocumentationSection } from '../../shared/components/documentation-section/documentation-section';

type ContactDemoControl = 'name' | 'email' | 'message';

@Component({
  selector: 'showcase-forms-page',
  standalone: true,
  imports: [
    CodePreview,
    DocumentationSection,
    ReactiveFormsModule,
    GhAmbientBackgroundComponent,
    GhButtonComponent,
    GhCardComponent,
    GhIconButtonComponent,
  ],
  templateUrl: './forms.html',
  styleUrl: './forms.scss',
})
export class FormsPage {
  protected readonly submitted = signal(false);
  protected readonly contactForm = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    message: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(12)],
    }),
  });
  protected readonly switchControl = new FormControl(true, { nonNullable: true });
  protected readonly nativeExample = `<div class="gh-form-field">
  <label class="gh-form-field__label" for="email">Email</label>
  <p class="gh-form-field__hint" id="email-hint">Use your work email.</p>
  <input
    class="gh-input"
    id="email"
    type="email"
    aria-describedby="email-hint"
  />
</div>`;
  protected readonly selectionExample = `<label class="gh-switch">
  <input class="gh-switch__control" type="checkbox" role="switch" checked />
  <span>Email notifications</span>
</label>`;

  protected submitContactDemo(): void {
    this.submitted.set(true);
    this.contactForm.markAllAsTouched();

    if (this.contactForm.valid) {
      this.contactForm.reset({ name: '', email: '', message: '' });
      this.submitted.set(false);
    }
  }

  protected isInvalid(controlName: ContactDemoControl): boolean {
    const control = this.contactForm.controls[controlName];
    return control.invalid && (control.touched || this.submitted());
  }
}
