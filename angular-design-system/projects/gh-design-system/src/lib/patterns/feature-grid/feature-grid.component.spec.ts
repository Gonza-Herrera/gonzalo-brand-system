import { TestBed } from '@angular/core/testing';

import { GhFeatureGridComponent } from './feature-grid.component';

describe('GhFeatureGridComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [GhFeatureGridComponent] }).compileComponents();
  });

  it('renders features in the public Grid and Card compositions', () => {
    const fixture = TestBed.createComponent(GhFeatureGridComponent);
    fixture.componentRef.setInput('features', [
      { title: 'Engineering', description: 'Build resilient systems.', iconLabel: 'E' },
      {
        title: 'Leadership',
        description: 'Help teams grow.',
        href: 'https://example.com',
        external: true,
      },
    ]);
    fixture.componentRef.setInput('columns', 2);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const external = element.querySelector<HTMLAnchorElement>('a[href="https://example.com"]');

    expect(element.querySelector('gh-grid')?.classList).toContain('gh-grid--columns-2');
    expect(element.querySelectorAll('gh-card')).toHaveLength(2);
    expect(element.textContent).toContain('Engineering');
    expect(external?.target).toBe('_blank');
    expect(external?.rel).toBe('noopener noreferrer');
  });

  it('supports a minimal variant, missing icons and an empty list', () => {
    const fixture = TestBed.createComponent(GhFeatureGridComponent);
    fixture.componentRef.setInput('features', [
      { title: 'Architecture', description: 'Clear boundaries.' },
    ]);
    fixture.componentRef.setInput('variant', 'minimal');
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('gh-card')).toBeNull();
    expect(element.querySelector('.gh-feature-grid__minimal-item')).not.toBeNull();
    expect(element.querySelector('.gh-feature-grid__icon')).toBeNull();

    fixture.componentRef.setInput('features', []);
    fixture.detectChanges();
    expect(element.querySelectorAll('article')).toHaveLength(0);
  });
});
