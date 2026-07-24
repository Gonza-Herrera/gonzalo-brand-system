import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import type { GhLayoutGap } from '../layout.types';
import { GhGridComponent } from './grid.component';
import type { GhGridAlign, GhGridColumns, GhGridMinItemSize } from './grid.types';

@Component({
  standalone: true,
  imports: [GhGridComponent],
  template: `
    <gh-grid [columns]="columns()" [minItemSize]="minItemSize()" [gap]="gap()" [align]="align()">
      <article>First</article>
      <article>Second</article>
    </gh-grid>
  `,
})
class GridTestHost {
  readonly columns = signal<GhGridColumns>('auto');
  readonly minItemSize = signal<GhGridMinItemSize>('md');
  readonly gap = signal<GhLayoutGap>('lg');
  readonly align = signal<GhGridAlign>('stretch');
}

describe('GhGridComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [GridTestHost] }).compileComponents();
  });

  it('uses responsive auto-fit defaults and projects content', () => {
    const fixture = TestBed.createComponent(GridTestHost);
    fixture.detectChanges();

    const grid = (fixture.nativeElement as HTMLElement).querySelector('gh-grid');
    const styles = getComputedStyle(grid as HTMLElement);

    expect(grid?.classList).toContain('gh-grid--columns-auto');
    expect(grid?.classList).toContain('gh-grid--min-md');
    expect(grid?.classList).toContain('gh-grid--gap-lg');
    expect(grid?.classList).toContain('gh-grid--align-stretch');
    expect(grid?.querySelectorAll('article')).toHaveLength(2);
    expect(styles.display).toBe('grid');
  });

  it('applies fixed columns, minimum size, gap and alignment classes', () => {
    const fixture = TestBed.createComponent(GridTestHost);
    fixture.componentInstance.columns.set(4);
    fixture.componentInstance.minItemSize.set('sm');
    fixture.componentInstance.gap.set('md');
    fixture.componentInstance.align.set('start');
    fixture.detectChanges();

    const grid = (fixture.nativeElement as HTMLElement).querySelector('gh-grid');

    expect(grid?.classList).toContain('gh-grid--columns-4');
    expect(grid?.classList).toContain('gh-grid--min-sm');
    expect(grid?.classList).toContain('gh-grid--gap-md');
    expect(grid?.classList).toContain('gh-grid--align-start');
  });
});
