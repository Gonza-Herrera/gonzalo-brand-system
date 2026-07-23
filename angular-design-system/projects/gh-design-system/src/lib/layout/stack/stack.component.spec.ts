import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import type { GhLayoutGap } from '../layout.types';
import { GhStackComponent } from './stack.component';
import type { GhStackAlign, GhStackJustify } from './stack.types';

@Component({
  standalone: true,
  imports: [GhStackComponent],
  template: `
    <gh-stack [gap]="gap()" [align]="align()" [justify]="justify()" [wrap]="wrap()">
      <span>First</span><span>Second</span>
    </gh-stack>
  `,
})
class StackTestHost {
  readonly gap = signal<GhLayoutGap>('md');
  readonly align = signal<GhStackAlign>('stretch');
  readonly justify = signal<GhStackJustify>('start');
  readonly wrap = signal(false);
}

describe('GhStackComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [StackTestHost] }).compileComponents();
  });

  it('uses vertical layout defaults and projects every child', () => {
    const fixture = TestBed.createComponent(StackTestHost);
    fixture.detectChanges();

    const stack = (fixture.nativeElement as HTMLElement).querySelector('gh-stack');
    const styles = getComputedStyle(stack as HTMLElement);

    expect(stack?.classList).toContain('gh-stack--gap-md');
    expect(stack?.classList).toContain('gh-stack--align-stretch');
    expect(stack?.classList).toContain('gh-stack--justify-start');
    expect(stack?.querySelectorAll('span')).toHaveLength(2);
    expect(styles.display).toBe('flex');
    expect(styles.flexDirection).toBe('column');
  });

  it('applies gap, alignment, justification and wrap options', () => {
    const fixture = TestBed.createComponent(StackTestHost);
    fixture.componentInstance.gap.set('xl');
    fixture.componentInstance.align.set('center');
    fixture.componentInstance.justify.set('between');
    fixture.componentInstance.wrap.set(true);
    fixture.detectChanges();

    const stack = (fixture.nativeElement as HTMLElement).querySelector('gh-stack');

    expect(stack?.classList).toContain('gh-stack--gap-xl');
    expect(stack?.classList).toContain('gh-stack--align-center');
    expect(stack?.classList).toContain('gh-stack--justify-between');
    expect(stack?.classList).toContain('gh-stack--wrap');
  });
});
