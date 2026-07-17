import { TestBed } from '@angular/core/testing';

import { ContactPage } from './contact.page';

describe('ContactPage', () => {
  it('renders the placeholder with one h1', async () => {
    await TestBed.configureTestingModule({ imports: [ContactPage] }).compileComponents();
    const fixture = TestBed.createComponent(ContactPage);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelectorAll('h1')).toHaveLength(1);
    expect(element.querySelector('h1')?.textContent).toContain('Start a thoughtful');
    expect(element.querySelector('gh-section section')).not.toBeNull();
  });
});
