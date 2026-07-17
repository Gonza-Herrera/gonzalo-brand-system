import { TestBed } from '@angular/core/testing';

import { ProjectsPage } from './projects.page';

describe('ProjectsPage', () => {
  it('renders the placeholder with one h1', async () => {
    await TestBed.configureTestingModule({ imports: [ProjectsPage] }).compileComponents();
    const fixture = TestBed.createComponent(ProjectsPage);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelectorAll('h1')).toHaveLength(1);
    expect(element.querySelector('h1')?.textContent).toContain('Selected projects');
    expect(element.querySelector('gh-section section')).not.toBeNull();
  });
});
