import { TestBed } from '@angular/core/testing';

import { AmbientBackgroundsPage } from './ambient-backgrounds';

describe('AmbientBackgroundsPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [AmbientBackgroundsPage] }).compileComponents();
  });

  it('renders every preset and intensity through the public component', () => {
    const fixture = TestBed.createComponent(AmbientBackgroundsPage);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;

    for (const preset of ['none', 'subtle', 'brand', 'cool', 'warm']) {
      expect(
        element.querySelector(`gh-ambient-background[data-preset="${preset}"]`),
      ).not.toBeNull();
    }

    for (const intensity of ['subtle', 'default', 'strong']) {
      expect(
        element.querySelector(`gh-ambient-background[data-intensity="${intensity}"]`),
      ).not.toBeNull();
    }
  });

  it('demonstrates solid and glass compositions without nested ambient regions', () => {
    const fixture = TestBed.createComponent(AmbientBackgroundsPage);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;

    expect(
      element.querySelector('gh-ambient-background gh-surface[data-variant="solid"]'),
    ).not.toBeNull();
    expect(
      element.querySelector('gh-ambient-background gh-surface[data-variant="glass"]'),
    ).not.toBeNull();
    expect(element.querySelector('gh-ambient-background gh-glass-panel')).not.toBeNull();
    expect(element.querySelector('gh-ambient-background gh-ambient-background')).toBeNull();
  });

  it('keeps the visual layer decorative and projected form controls native', () => {
    const fixture = TestBed.createComponent(AmbientBackgroundsPage);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const visuals = element.querySelectorAll('.gh-ambient-background__visual');

    expect(visuals.length).toBeGreaterThan(0);
    for (const visual of Array.from(visuals)) {
      expect(visual.getAttribute('aria-hidden')).toBe('true');
      expect(visual.hasAttribute('tabindex')).toBe(false);
    }

    expect(element.querySelector('label[for="ambient-showcase-email"]')).not.toBeNull();
    expect(element.querySelector('input#ambient-showcase-email[type="email"]')).not.toBeNull();
    expect(element.querySelector('button[type="button"]')).not.toBeNull();
  });
});
