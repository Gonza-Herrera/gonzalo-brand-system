import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import type { GhInlineAlign, GhInlineJustify } from '../inline/inline.types';
import type { GhLayoutGap } from '../layout.types';
import { GhClusterComponent } from './cluster.component';

@Component({
  standalone: true,
  imports: [GhClusterComponent],
  template: `
    <gh-cluster [gap]="gap()" [align]="align()" [justify]="justify()">
      <span>Angular</span><span>TypeScript</span><span>Signals</span>
    </gh-cluster>
  `,
})
class ClusterTestHost {
  readonly gap = signal<GhLayoutGap>('sm');
  readonly align = signal<GhInlineAlign>('center');
  readonly justify = signal<GhInlineJustify>('start');
}

describe('GhClusterComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ClusterTestHost] }).compileComponents();
  });

  it('projects a permanently wrapping cluster with defaults', () => {
    const fixture = TestBed.createComponent(ClusterTestHost);
    fixture.detectChanges();

    const cluster = (fixture.nativeElement as HTMLElement).querySelector('gh-cluster');

    expect(cluster?.classList).toContain('gh-cluster');
    expect(cluster?.classList).toContain('gh-cluster--gap-sm');
    expect(cluster?.classList).toContain('gh-cluster--align-center');
    expect(cluster?.classList).toContain('gh-cluster--justify-start');
    expect(cluster?.querySelectorAll('span')).toHaveLength(3);
  });

  it('applies gap, alignment and justification options', () => {
    const fixture = TestBed.createComponent(ClusterTestHost);
    fixture.componentInstance.gap.set('xl');
    fixture.componentInstance.align.set('end');
    fixture.componentInstance.justify.set('around');
    fixture.detectChanges();

    const cluster = (fixture.nativeElement as HTMLElement).querySelector('gh-cluster');

    expect(cluster?.classList).toContain('gh-cluster--gap-xl');
    expect(cluster?.classList).toContain('gh-cluster--align-end');
    expect(cluster?.classList).toContain('gh-cluster--justify-around');
  });
});
