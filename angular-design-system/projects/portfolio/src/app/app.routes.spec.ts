import { Title } from '@angular/platform-browser';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';

import { AppComponent } from './app.component';
import { routes } from './app.routes';

describe('Portfolio routing', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it('lazy-loads each public page and the Not Found fallback', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const router = TestBed.inject(Router);
    const expectedHeadings = new Map([
      ['/', 'Gonzalo Herrera'],
      ['/about', 'Professional story'],
      ['/experience', 'Engineering and leadership experience'],
      ['/projects', 'Selected projects and case studies'],
      ['/content', 'Articles, talks and practical insights'],
      ['/contact', 'Start a thoughtful conversation'],
      ['/missing-page', 'Page not found'],
    ]);

    fixture.detectChanges();

    for (const [path, heading] of expectedHeadings) {
      await router.navigateByUrl(path);
      await fixture.whenStable();
      fixture.detectChanges();

      const element = fixture.nativeElement as HTMLElement;
      expect(element.querySelector('h1')?.textContent).toContain(heading);
      expect(element.querySelectorAll('h1')).toHaveLength(1);
      expect(element.querySelector('main#main-content')).not.toBeNull();
    }
  });

  it('updates the document title from route metadata', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const router = TestBed.inject(Router);
    const title = TestBed.inject(Title);
    fixture.detectChanges();

    await router.navigateByUrl('/about');
    await fixture.whenStable();

    expect(title.getTitle()).toBe('About | Gonzalo Herrera');

    await router.navigateByUrl('/unknown');
    await fixture.whenStable();

    expect(title.getTitle()).toBe('Page not found | Gonzalo Herrera');
  });
});
