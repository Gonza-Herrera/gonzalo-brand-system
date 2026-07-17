import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import type { GhLayoutGap } from '../layout.types';
import { GhInlineComponent } from './inline.component';
import type { GhInlineAlign, GhInlineJustify } from './inline.types';

@Component({
  standalone: true,
  imports: [GhInlineComponent],
  template: `
    <gh-inline
      [gap]="gap()"
      [align]="align()"
      [justify]="justify()"
      [wrap]="wrap()"
      [fullWidth]="fullWidth()"
    >
      <span>Metadata</span><button type="button">Action</button>
    </gh-inline>
  `,
})
class InlineTestHost {
  readonly gap = signal<GhLayoutGap>('sm');
  readonly align = signal<GhInlineAlign>('center');
  readonly justify = signal<GhInlineJustify>('start');
  readonly wrap = signal(true);
  readonly fullWidth = signal(false);
}

describe('GhInlineComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [InlineTestHost] }).compileComponents();
  });

  it('wraps horizontal content with the expected defaults', () => {
    const fixture = TestBed.createComponent(InlineTestHost);
    fixture.detectChanges();

    const inline = (fixture.nativeElement as HTMLElement).querySelector('gh-inline');

    expect(inline?.classList).toContain('gh-inline--gap-sm');
    expect(inline?.classList).toContain('gh-inline--align-center');
    expect(inline?.classList).toContain('gh-inline--justify-start');
    expect(inline?.classList).toContain('gh-inline--wrap');
    expect(inline?.querySelector('button')).not.toBeNull();
  });

  it('supports full width, no wrap and alternate alignment', () => {
    const fixture = TestBed.createComponent(InlineTestHost);
    fixture.componentInstance.gap.set('lg');
    fixture.componentInstance.align.set('baseline');
    fixture.componentInstance.justify.set('between');
    fixture.componentInstance.wrap.set(false);
    fixture.componentInstance.fullWidth.set(true);
    fixture.detectChanges();

    const inline = (fixture.nativeElement as HTMLElement).querySelector('gh-inline');

    expect(inline?.classList).toContain('gh-inline--gap-lg');
    expect(inline?.classList).toContain('gh-inline--align-baseline');
    expect(inline?.classList).toContain('gh-inline--justify-between');
    expect(inline?.classList).toContain('gh-inline--full-width');
    expect(inline?.classList).not.toContain('gh-inline--wrap');
  });
});
