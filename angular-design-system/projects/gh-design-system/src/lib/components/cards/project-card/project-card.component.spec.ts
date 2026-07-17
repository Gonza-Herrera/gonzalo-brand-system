import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { GhProjectCardComponent } from './project-card.component';
import type { GhProjectCardData } from './project-card.types';

@Component({
  standalone: true,
  imports: [GhProjectCardComponent],
  template: `
    <gh-project-card
      [project]="project()"
      [orientation]="orientation()"
      [headingLevel]="headingLevel()"
      [ariaLabel]="ariaLabel()"
      [featuredLabel]="featuredLabel()"
      [technologiesLabel]="technologiesLabel()"
      [linksLabel]="linksLabel()"
    />
  `,
})
class ProjectCardTestHost {
  readonly orientation = signal<'vertical' | 'horizontal'>('horizontal');
  readonly headingLevel = signal<2 | 3>(2);
  readonly ariaLabel = signal<string | undefined>(undefined);
  readonly featuredLabel = signal('Featured');
  readonly technologiesLabel = signal('Technologies');
  readonly linksLabel = signal('Project links');
  readonly project = signal<GhProjectCardData>({
    title: 'Angular Design System',
    description: 'A token-driven component library for consistent Angular products.',
    technologies: ['Angular', 'TypeScript', 'Signals'],
    imageSrc: '/project.jpg',
    imageAlt: 'Angular Design System showcase',
    projectUrl: '/projects/design-system',
    repositoryUrl: 'https://example.com/repository',
    status: 'completed',
    featured: true,
  });
}

describe('GhProjectCardComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectCardTestHost],
    }).compileComponents();
  });

  it('renders project details, status, technologies, image and native links', () => {
    const fixture = TestBed.createComponent(ProjectCardTestHost);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const links = element.querySelectorAll<HTMLAnchorElement>('.project-card__actions a');
    const image = element.querySelector<HTMLImageElement>('img');

    expect(element.querySelector('article.gh-card')).not.toBeNull();
    expect(element.querySelector('h2')?.textContent).toContain('Angular Design System');
    expect(element.querySelector('.project-card__description')?.textContent).toContain(
      'token-driven',
    );
    expect(element.querySelector('.gh-badge--success')?.textContent).toContain('Completed');
    expect(element.querySelector('.gh-badge--accent')?.textContent).toContain('Featured');
    expect(element.querySelectorAll('gh-tag')).toHaveLength(3);
    expect(links).toHaveLength(2);
    expect(links[0]?.getAttribute('href')).toBe('/projects/design-system');
    expect(links[1]?.getAttribute('href')).toBe('https://example.com/repository');
    expect(element.querySelector('a button, button a')).toBeNull();
    expect(image?.getAttribute('loading')).toBe('lazy');
    expect(image?.alt).toBe('Angular Design System showcase');
    expect(element.querySelector('.project-card__layout--horizontal')).not.toBeNull();
  });

  it('supports a vertical project without image, technologies or links', () => {
    const fixture = TestBed.createComponent(ProjectCardTestHost);
    fixture.componentInstance.orientation.set('vertical');
    fixture.componentInstance.project.set({
      title: 'AI Code Review Assistant',
      description: 'A clearly demonstrative project concept.',
      status: 'concept',
    });
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('img')).toBeNull();
    expect(element.querySelector('gh-tag')).toBeNull();
    expect(element.querySelector('.project-card__actions')).toBeNull();
    expect(element.querySelector('.project-card__layout--horizontal')).toBeNull();
    expect(element.querySelector('.gh-card--interactive')).toBeNull();
    expect(element.querySelector('.gh-badge--neutral')?.textContent).toContain('Concept');
  });

  it('supports nested heading hierarchy and localized accessible labels', () => {
    const fixture = TestBed.createComponent(ProjectCardTestHost);
    fixture.componentInstance.headingLevel.set(3);
    fixture.componentInstance.ariaLabel.set('Proyecto: Angular Design System');
    fixture.componentInstance.featuredLabel.set('Destacado');
    fixture.componentInstance.technologiesLabel.set('Tecnologías');
    fixture.componentInstance.linksLabel.set('Enlaces del proyecto');
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('h2')).toBeNull();
    expect(element.querySelector('h3')?.textContent).toContain('Angular Design System');
    expect(element.querySelector('article')?.getAttribute('aria-label')).toBe(
      'Proyecto: Angular Design System',
    );
    expect(element.querySelector('.gh-badge--accent')?.textContent).toContain('Destacado');
    expect(element.querySelector('.project-card__technologies')?.getAttribute('aria-label')).toBe(
      'Tecnologías',
    );
    expect(element.querySelector('.project-card__actions')?.getAttribute('aria-label')).toBe(
      'Enlaces del proyecto',
    );
  });
});
