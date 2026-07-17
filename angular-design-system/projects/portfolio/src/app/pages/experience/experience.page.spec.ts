import { TestBed } from '@angular/core/testing';

import { ExperiencePage } from './experience.page';

describe('ExperiencePage', () => {
  it('renders the placeholder with one h1', async () => {
    await TestBed.configureTestingModule({ imports: [ExperiencePage] }).compileComponents();
    const fixture = TestBed.createComponent(ExperiencePage);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelectorAll('h1')).toHaveLength(1);
    expect(element.querySelector('h1')?.textContent).toContain('Engineering and leadership');
    expect(element.querySelector('gh-section section')).not.toBeNull();
  });
});
