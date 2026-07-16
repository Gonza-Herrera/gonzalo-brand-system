import { Component, inject } from '@angular/core';
import { GhThemeService } from 'gh-design-system';

interface FoundationToken {
  readonly label: string;
  readonly value: string;
  readonly cssVariable: string;
  readonly cssValue: string;
}

interface TypographyToken extends FoundationToken {
  readonly sample: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly themeService = inject(GhThemeService);

  protected readonly activeTheme = this.themeService.theme;

  protected readonly colorTokens = [
    {
      label: 'Ivory',
      value: '#F7F4F1',
      cssVariable: '--gh-color-ivory',
      cssValue: 'var(--gh-color-ivory)',
    },
    {
      label: 'Lavender Mist',
      value: '#CBB9E8',
      cssVariable: '--gh-color-lavender',
      cssValue: 'var(--gh-color-lavender)',
    },
    {
      label: 'Soft Peach',
      value: '#F4B7A8',
      cssVariable: '--gh-color-peach',
      cssValue: 'var(--gh-color-peach)',
    },
    {
      label: 'Cloud Blue',
      value: '#A9C9F5',
      cssVariable: '--gh-color-cloud-blue',
      cssValue: 'var(--gh-color-cloud-blue)',
    },
    {
      label: 'Deep Ink',
      value: '#101828',
      cssVariable: '--gh-color-ink',
      cssValue: 'var(--gh-color-ink)',
    },
    {
      label: 'Mint',
      value: '#A8E6CF',
      cssVariable: '--gh-color-mint',
      cssValue: 'var(--gh-color-mint)',
    },
  ] as const satisfies readonly FoundationToken[];

  protected readonly typographyTokens = [
    {
      label: 'Hero',
      value: '64px',
      cssVariable: '--gh-font-size-hero',
      cssValue: 'var(--gh-font-size-hero)',
      sample: 'Think bigger.',
    },
    {
      label: 'Heading 1',
      value: '48px',
      cssVariable: '--gh-font-size-h1',
      cssValue: 'var(--gh-font-size-h1)',
      sample: 'Build smarter.',
    },
    {
      label: 'Heading 2',
      value: '32px',
      cssVariable: '--gh-font-size-h2',
      cssValue: 'var(--gh-font-size-h2)',
      sample: 'Engineering with clarity.',
    },
    {
      label: 'Body',
      value: '18px',
      cssVariable: '--gh-font-size-body',
      cssValue: 'var(--gh-font-size-body)',
      sample: 'Calm technology, thoughtful leadership and durable software.',
    },
    {
      label: 'Caption',
      value: '14px',
      cssVariable: '--gh-font-size-caption',
      cssValue: 'var(--gh-font-size-caption)',
      sample: 'Frontend Tech Lead & AI-Augmented Engineer',
    },
  ] as const satisfies readonly TypographyToken[];

  protected readonly spacingTokens = [
    {
      label: 'XS',
      value: '4px',
      cssVariable: '--gh-space-xs',
      cssValue: 'var(--gh-space-xs)',
    },
    {
      label: 'SM',
      value: '8px',
      cssVariable: '--gh-space-sm',
      cssValue: 'var(--gh-space-sm)',
    },
    {
      label: 'MD',
      value: '16px',
      cssVariable: '--gh-space-md',
      cssValue: 'var(--gh-space-md)',
    },
    {
      label: 'LG',
      value: '24px',
      cssVariable: '--gh-space-lg',
      cssValue: 'var(--gh-space-lg)',
    },
    {
      label: 'XL',
      value: '32px',
      cssVariable: '--gh-space-xl',
      cssValue: 'var(--gh-space-xl)',
    },
    {
      label: 'XXL',
      value: '48px',
      cssVariable: '--gh-space-xxl',
      cssValue: 'var(--gh-space-xxl)',
    },
    {
      label: 'Section',
      value: '96px',
      cssVariable: '--gh-space-section',
      cssValue: 'var(--gh-space-section)',
    },
  ] as const satisfies readonly FoundationToken[];

  protected readonly radiusTokens = [
    {
      label: 'Small',
      value: '8px',
      cssVariable: '--gh-radius-sm',
      cssValue: 'var(--gh-radius-sm)',
    },
    {
      label: 'Medium',
      value: '12px',
      cssVariable: '--gh-radius-md',
      cssValue: 'var(--gh-radius-md)',
    },
    {
      label: 'Large',
      value: '16px',
      cssVariable: '--gh-radius-lg',
      cssValue: 'var(--gh-radius-lg)',
    },
    {
      label: 'Extra large',
      value: '24px',
      cssVariable: '--gh-radius-xl',
      cssValue: 'var(--gh-radius-xl)',
    },
    {
      label: 'Pill',
      value: '999px',
      cssVariable: '--gh-radius-pill',
      cssValue: 'var(--gh-radius-pill)',
    },
  ] as const satisfies readonly FoundationToken[];

  protected readonly shadowTokens = [
    {
      label: 'Small',
      value: '0 2px 8px / 8%',
      cssVariable: '--gh-shadow-sm',
      cssValue: 'var(--gh-shadow-sm)',
    },
    {
      label: 'Medium',
      value: '0 8px 24px / 12%',
      cssVariable: '--gh-shadow-md',
      cssValue: 'var(--gh-shadow-md)',
    },
    {
      label: 'Large',
      value: '0 16px 48px / 16%',
      cssVariable: '--gh-shadow-lg',
      cssValue: 'var(--gh-shadow-lg)',
    },
  ] as const satisfies readonly FoundationToken[];

  protected toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
