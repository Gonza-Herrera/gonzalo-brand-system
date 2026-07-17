import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { GhFooterComponent } from './footer.component';

@Component({
  standalone: true,
  imports: [GhFooterComponent],
  template: `
    <gh-footer
      brand="Brand"
      description="A configurable footer."
      tagline="Build thoughtfully."
      [showTagline]="true"
      copyright="Copyright prepared by consumer"
      [linkGroups]="groups"
    >
      <a ghFooterSocial href="/social">Social</a>
      <span ghFooterBottom>Bottom detail</span>
    </gh-footer>
  `,
})
class FooterTestHost {
  readonly groups = [
    {
      title: 'Explore',
      links: [
        { label: 'About', href: '/about' },
        { label: 'External', href: 'https://example.com', external: true },
      ],
    },
  ];
}

describe('GhFooterComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [FooterTestHost] }).compileComponents();
  });

  it('renders a semantic footer, grouped links and projected regions', () => {
    const fixture = TestBed.createComponent(FooterTestHost);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const external = element.querySelector<HTMLAnchorElement>('a[href="https://example.com"]');

    expect(element.querySelector('footer')).not.toBeNull();
    expect(element.textContent).toContain('Brand');
    expect(element.textContent).toContain('A configurable footer.');
    expect(element.textContent).toContain('Build thoughtfully.');
    expect(element.querySelector('nav[aria-label="Explore"]')).not.toBeNull();
    expect(element.querySelectorAll('nav a')).toHaveLength(2);
    expect(external?.target).toBe('_blank');
    expect(element.textContent).toContain('Copyright prepared by consumer');
    expect(element.textContent).toContain('Social');
    expect(element.textContent).toContain('Bottom detail');
  });
});
