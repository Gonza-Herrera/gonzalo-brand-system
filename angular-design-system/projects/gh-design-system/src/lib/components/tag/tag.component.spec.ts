import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { GhTagComponent } from './tag.component';

@Component({
  standalone: true,
  imports: [GhTagComponent],
  template: `
    <div (click)="parentClickCount += 1">
      <gh-tag
        [mode]="mode()"
        [variant]="variant()"
        [size]="size()"
        [selected]="selected()"
        [disabled]="disabled()"
        [ariaLabel]="ariaLabel()"
        (selectedChange)="handleSelectedChange($event)"
        (removed)="removedCount += 1"
      >
        Angular
      </gh-tag>
    </div>
  `,
})
class TagTestHost {
  readonly mode = signal<'static' | 'selectable' | 'removable'>('static');
  readonly variant = signal<'neutral' | 'accent' | 'info'>('neutral');
  readonly size = signal<'sm' | 'md'>('md');
  readonly selected = signal(false);
  readonly disabled = signal(false);
  readonly ariaLabel = signal<string | undefined>('Remove Angular filter');

  parentClickCount = 0;
  removedCount = 0;
  selectedEvents: boolean[] = [];

  handleSelectedChange(selected: boolean): void {
    this.selectedEvents.push(selected);
    this.selected.set(selected);
  }
}

describe('GhTagComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagTestHost],
    }).compileComponents();
  });

  it('renders static projected content with non-interactive defaults', () => {
    const fixture = TestBed.createComponent(TagTestHost);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const tag = element.querySelector('.gh-tag');

    expect(tag?.tagName).toBe('SPAN');
    expect(tag?.textContent).toContain('Angular');
    expect(tag?.classList).toContain('gh-tag--static');
    expect(tag?.classList).toContain('gh-tag--neutral');
    expect(tag?.classList).toContain('gh-tag--md');
    expect(element.querySelector('button')).toBeNull();
  });

  it('renders a native selectable button and emits controlled selection changes', () => {
    const fixture = TestBed.createComponent(TagTestHost);
    const host = fixture.componentInstance;

    host.mode.set('selectable');
    fixture.detectChanges();

    const button = (fixture.nativeElement as HTMLElement).querySelector<HTMLButtonElement>(
      'button.gh-tag',
    );
    expect(button?.getAttribute('type')).toBe('button');
    expect(button?.getAttribute('aria-pressed')).toBe('false');
    expect(button?.tabIndex).toBe(0);
    expect(button?.textContent).toContain('Angular');

    button?.focus();
    expect(document.activeElement).toBe(button);

    button?.click();
    fixture.detectChanges();

    expect(host.selectedEvents).toEqual([true]);
    expect(button?.getAttribute('aria-pressed')).toBe('true');
    expect(button?.classList).toContain('gh-tag--selected');
  });

  it('does not emit selection changes when selectable is disabled', () => {
    const fixture = TestBed.createComponent(TagTestHost);
    const host = fixture.componentInstance;

    host.mode.set('selectable');
    host.disabled.set(true);
    fixture.detectChanges();

    const button = (fixture.nativeElement as HTMLElement).querySelector<HTMLButtonElement>(
      'button.gh-tag',
    );
    button?.click();

    expect(button?.hasAttribute('disabled')).toBe(true);
    expect(host.selectedEvents).toEqual([]);
  });

  it('renders an accessible remove button and stops its click from propagating', () => {
    const fixture = TestBed.createComponent(TagTestHost);
    const host = fixture.componentInstance;

    host.mode.set('removable');
    fixture.detectChanges();

    const remove = (fixture.nativeElement as HTMLElement).querySelector('.gh-tag__remove');
    expect(remove?.getAttribute('aria-label')).toBe('Remove Angular filter');
    expect((fixture.nativeElement as HTMLElement).querySelector('.gh-tag')?.textContent).toContain(
      'Angular',
    );

    (remove as HTMLButtonElement | null)?.click();

    expect(host.removedCount).toBe(1);
    expect(host.parentClickCount).toBe(0);
  });

  it('provides a safe fallback name for the removal control', () => {
    const fixture = TestBed.createComponent(TagTestHost);
    const host = fixture.componentInstance;

    host.mode.set('removable');
    host.ariaLabel.set(undefined);
    fixture.detectChanges();

    expect(
      (fixture.nativeElement as HTMLElement)
        .querySelector('.gh-tag__remove')
        ?.getAttribute('aria-label'),
    ).toBe('Remove tag');
  });

  it('does not emit removal when disabled', () => {
    const fixture = TestBed.createComponent(TagTestHost);
    const host = fixture.componentInstance;

    host.mode.set('removable');
    host.disabled.set(true);
    fixture.detectChanges();

    const remove = (fixture.nativeElement as HTMLElement).querySelector<HTMLButtonElement>(
      '.gh-tag__remove',
    );
    remove?.click();

    expect(remove?.disabled).toBe(true);
    expect(host.removedCount).toBe(0);
  });

  it('applies variant and size inputs', () => {
    const fixture = TestBed.createComponent(TagTestHost);
    const host = fixture.componentInstance;

    host.variant.set('accent');
    host.size.set('sm');
    fixture.detectChanges();

    const tag = (fixture.nativeElement as HTMLElement).querySelector('.gh-tag');

    expect(tag?.classList).toContain('gh-tag--accent');
    expect(tag?.classList).toContain('gh-tag--sm');
  });
});
