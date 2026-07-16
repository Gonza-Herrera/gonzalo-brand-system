import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { GhButtonComponent } from './button.component';

@Component({
  standalone: true,
  imports: [GhButtonComponent],
  template: `
    <form (submit)="handleSubmit($event)">
      <gh-button
        [variant]="variant()"
        [size]="size()"
        [type]="type()"
        [disabled]="disabled()"
        [loading]="loading()"
        [fullWidth]="fullWidth()"
        aria-label="Save project"
        (click)="handleClick()"
      >
        <svg ghButtonIconStart data-testid="start-icon"></svg>
        Save changes
        <svg ghButtonIconEnd data-testid="end-icon"></svg>
      </gh-button>
    </form>
  `,
})
class ButtonTestHost {
  readonly variant = signal<'primary' | 'secondary' | 'ghost' | 'danger'>('primary');
  readonly size = signal<'sm' | 'md' | 'lg'>('md');
  readonly type = signal<'button' | 'submit' | 'reset'>('button');
  readonly disabled = signal(false);
  readonly loading = signal(false);
  readonly fullWidth = signal(false);

  clickCount = 0;
  submitCount = 0;

  handleClick(): void {
    this.clickCount += 1;
  }

  handleSubmit(event: SubmitEvent): void {
    event.preventDefault();
    this.submitCount += 1;
  }
}

describe('GhButtonComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonTestHost],
    }).compileComponents();
  });

  it('renders projected content with accessible native defaults', () => {
    const fixture = TestBed.createComponent(ButtonTestHost);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const button = element.querySelector('button');

    expect(button).not.toBeNull();
    expect(button?.textContent).toContain('Save changes');
    expect(button?.type).toBe('button');
    expect(button?.classList).toContain('gh-button--primary');
    expect(button?.classList).toContain('gh-button--md');
    expect(button?.getAttribute('aria-label')).toBe('Save project');
  });

  it('applies variant, size, type and full-width inputs', () => {
    const fixture = TestBed.createComponent(ButtonTestHost);
    const host = fixture.componentInstance;

    host.variant.set('secondary');
    host.size.set('lg');
    host.type.set('reset');
    host.fullWidth.set(true);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const component = element.querySelector('gh-button');
    const button = element.querySelector('button');

    expect(button?.classList).toContain('gh-button--secondary');
    expect(button?.classList).toContain('gh-button--lg');
    expect(button?.classList).toContain('gh-button--full-width');
    expect(button?.type).toBe('reset');
    expect(component?.classList).toContain('gh-button-host--full-width');
  });

  it('projects start and end icon content into their slots', () => {
    const fixture = TestBed.createComponent(ButtonTestHost);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;

    expect(
      element.querySelector('.gh-button__icon--start [data-testid="start-icon"]'),
    ).not.toBeNull();
    expect(element.querySelector('.gh-button__icon--end [data-testid="end-icon"]')).not.toBeNull();
  });

  it('reflects disabled state and prevents native click actions', () => {
    const fixture = TestBed.createComponent(ButtonTestHost);
    const host = fixture.componentInstance;

    host.disabled.set(true);
    fixture.detectChanges();

    const button = (fixture.nativeElement as HTMLElement).querySelector('button');
    button?.click();

    expect(button?.disabled).toBe(true);
    expect(host.clickCount).toBe(0);
  });

  it('renders an accessible loading state and prevents interaction', () => {
    const fixture = TestBed.createComponent(ButtonTestHost);
    const host = fixture.componentInstance;

    host.type.set('submit');
    host.loading.set(true);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const button = element.querySelector('button');
    button?.click();

    expect(button?.disabled).toBe(true);
    expect(button?.getAttribute('aria-busy')).toBe('true');
    expect(element.querySelector('.gh-button__spinner')).not.toBeNull();
    expect(button?.textContent).toContain('Save changes');
    expect(host.clickCount).toBe(0);
    expect(host.submitCount).toBe(0);
  });

  it('submits its containing form only when configured as submit', () => {
    const fixture = TestBed.createComponent(ButtonTestHost);
    const host = fixture.componentInstance;

    fixture.detectChanges();
    (fixture.nativeElement as HTMLElement).querySelector('button')?.click();
    expect(host.submitCount).toBe(0);

    host.type.set('submit');
    fixture.detectChanges();
    (fixture.nativeElement as HTMLElement).querySelector('button')?.click();

    expect(host.submitCount).toBe(1);
  });
});
