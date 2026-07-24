import { TestBed } from '@angular/core/testing';

import { GhContactCalloutComponent } from './contact-callout.component';

describe('GhContactCalloutComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GhContactCalloutComponent],
    }).compileComponents();
  });

  it('renders configurable content and one or more native link actions', () => {
    const fixture = TestBed.createComponent(GhContactCalloutComponent);
    fixture.componentRef.setInput('eyebrow', 'Let us connect');
    fixture.componentRef.setInput('title', 'Build something better.');
    fixture.componentRef.setInput('description', 'Bring an engineering challenge.');
    fixture.componentRef.setInput('actions', [
      { label: 'Email', href: 'mailto:hello@example.com' },
      {
        label: 'LinkedIn',
        href: 'https://example.com/linkedin',
        external: true,
        variant: 'secondary',
      },
    ]);
    fixture.componentRef.setInput('alignment', 'start');
    fixture.componentRef.setInput('surface', 'accent');
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const links = element.querySelectorAll<HTMLAnchorElement>('.gh-pattern-action');

    expect(element.textContent).toContain('Let us connect');
    expect(element.querySelector('h2')?.textContent).toContain('Build something better');
    expect(links).toHaveLength(2);
    expect(links[0]?.tagName).toBe('A');
    expect(links[1]?.target).toBe('_blank');
    expect(element.classList).toContain('gh-contact-callout--start');
    expect(element.classList).toContain('gh-contact-callout--accent');
    expect(element.querySelector('gh-section')).not.toBeNull();
    expect(element.querySelector('gh-container')).not.toBeNull();
  });
});
