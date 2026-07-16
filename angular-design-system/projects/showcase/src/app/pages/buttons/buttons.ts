import { Component, signal } from '@angular/core';
import { GhButtonComponent, type GhButtonSize, type GhButtonVariant } from 'gh-design-system';

import { CodePreview } from '../../shared/components/code-preview/code-preview';
import { DocumentationSection } from '../../shared/components/documentation-section/documentation-section';

interface ButtonVariantExample {
  readonly label: string;
  readonly description: string;
  readonly variant: GhButtonVariant;
}

interface ButtonSizeExample {
  readonly label: string;
  readonly description: string;
  readonly size: GhButtonSize;
}

@Component({
  selector: 'showcase-buttons-page',
  standalone: true,
  imports: [CodePreview, DocumentationSection, GhButtonComponent],
  templateUrl: './buttons.html',
  styleUrl: './buttons.scss',
})
export class ButtonsPage {
  protected readonly formStatus = signal('The form has not been submitted.');
  protected readonly variants = [
    {
      label: 'Primary',
      description: 'The highest-priority action in a section.',
      variant: 'primary',
    },
    {
      label: 'Secondary',
      description: 'Supporting actions with medium visual hierarchy.',
      variant: 'secondary',
    },
    {
      label: 'Ghost',
      description: 'Low-emphasis actions placed on an existing surface.',
      variant: 'ghost',
    },
    {
      label: 'Danger',
      description: 'Destructive or sensitive actions with explicit context.',
      variant: 'danger',
    },
  ] as const satisfies readonly ButtonVariantExample[];
  protected readonly sizes = [
    {
      label: 'Small',
      description: 'Toolbars, compact tables and dense interfaces.',
      size: 'sm',
    },
    {
      label: 'Medium',
      description: 'Forms and standard application actions.',
      size: 'md',
    },
    {
      label: 'Large',
      description: 'Prominent calls to action and hero sections.',
      size: 'lg',
    },
  ] as const satisfies readonly ButtonSizeExample[];

  protected readonly basicExample = `<gh-button>
  Save changes
</gh-button>`;
  protected readonly variantExample = `<gh-button
  variant="secondary"
  size="lg"
>
  View project
</gh-button>`;
  protected readonly loadingExample = `<gh-button
  [loading]="isSaving()"
  type="submit"
>
  Save
</gh-button>`;
  protected readonly iconExample = `<gh-button aria-label="Add project">
  <svg ghButtonIconStart aria-hidden="true">
    <!-- icon -->
  </svg>
</gh-button>`;

  protected handleSubmit(event: SubmitEvent): void {
    event.preventDefault();
    this.formStatus.set('Example form submitted successfully.');
  }

  protected handleReset(): void {
    this.formStatus.set('The example form was reset.');
  }
}
