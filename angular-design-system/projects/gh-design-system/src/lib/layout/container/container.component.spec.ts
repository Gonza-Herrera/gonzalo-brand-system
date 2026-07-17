import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { GhContainerComponent } from './container.component';
import type { GhContainerGutters, GhContainerSize } from './container.types';

@Component({
  standalone: true,
  imports: [GhContainerComponent],
  template: `
    <gh-container [size]="size()" [gutters]="gutters()" [centered]="centered()">
      <span>Projected container content</span>
    </gh-container>
  `,
})
class ContainerTestHost {
  readonly size = signal<GhContainerSize>('xl');
  readonly gutters = signal<GhContainerGutters>('md');
  readonly centered = signal(true);
}

describe('GhContainerComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ContainerTestHost] }).compileComponents();
  });

  it('uses the xl size, medium gutters and centered defaults while projecting content', () => {
    const fixture = TestBed.createComponent(ContainerTestHost);
    fixture.detectChanges();

    const container = (fixture.nativeElement as HTMLElement).querySelector('gh-container');

    expect(container?.classList).toContain('gh-container--xl');
    expect(container?.classList).toContain('gh-container--gutters-md');
    expect(container?.classList).toContain('gh-container--centered');
    expect(container?.textContent).toContain('Projected container content');
  });

  it('supports full width, alternate gutters and a non-centered layout', () => {
    const fixture = TestBed.createComponent(ContainerTestHost);
    fixture.componentInstance.size.set('full');
    fixture.componentInstance.gutters.set('lg');
    fixture.componentInstance.centered.set(false);
    fixture.detectChanges();

    const container = (fixture.nativeElement as HTMLElement).querySelector('gh-container');

    expect(container?.classList).toContain('gh-container--full');
    expect(container?.classList).toContain('gh-container--gutters-lg');
    expect(container?.classList).not.toContain('gh-container--centered');
  });
});
