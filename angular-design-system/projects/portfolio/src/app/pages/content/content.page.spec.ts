import { TestBed } from '@angular/core/testing';

import { ContentPage } from './content.page';

describe('ContentPage', () => {
  it('renders the placeholder with one h1', async () => {
    await TestBed.configureTestingModule({ imports: [ContentPage] }).compileComponents();
    const fixture = TestBed.createComponent(ContentPage);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelectorAll('h1')).toHaveLength(1);
    expect(element.querySelector('h1')?.textContent).toContain('Articles, talks');
    expect(element.querySelector('gh-section section')).not.toBeNull();
  });
});
