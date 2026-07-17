import { TestBed } from '@angular/core/testing';

import { AboutPage } from './about.page';

describe('AboutPage', () => {
  it('renders the placeholder with one h1', async () => {
    await TestBed.configureTestingModule({ imports: [AboutPage] }).compileComponents();
    const fixture = TestBed.createComponent(AboutPage);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelectorAll('h1')).toHaveLength(1);
    expect(element.querySelector('h1')?.textContent).toContain('Professional story');
    expect(element.querySelector('gh-section section')).not.toBeNull();
  });
});
