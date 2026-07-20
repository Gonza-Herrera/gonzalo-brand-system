import { TestBed } from '@angular/core/testing';

import { GhExperienceTimelineComponent } from './experience-timeline.component';

describe('GhExperienceTimelineComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GhExperienceTimelineComponent],
    }).compileComponents();
  });

  it('preserves consumer order in a semantic list and reuses Experience Card', () => {
    const fixture = TestBed.createComponent(GhExperienceTimelineComponent);
    fixture.componentRef.setInput('experiences', [
      { role: 'Current role', company: 'Example A', startDate: '2025', current: true },
      { role: 'Earlier role', company: 'Example B', startDate: '2022', endDate: '2025' },
    ]);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const cards = element.querySelectorAll('gh-experience-card');

    expect(element.querySelector('ol')).not.toBeNull();
    expect(element.querySelectorAll('li')).toHaveLength(2);
    expect(cards).toHaveLength(2);
    expect(cards[0]?.textContent).toContain('Current role');
    expect(cards[1]?.textContent).toContain('Earlier role');
    expect(element.classList).toContain('gh-experience-timeline--connector');
  });

  it('supports compact mode without a connector and an empty list', () => {
    const fixture = TestBed.createComponent(GhExperienceTimelineComponent);
    fixture.componentRef.setInput('experiences', []);
    fixture.componentRef.setInput('orientation', 'compact');
    fixture.componentRef.setInput('showConnector', false);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.classList).toContain('gh-experience-timeline--compact');
    expect(element.classList).not.toContain('gh-experience-timeline--connector');
    expect(element.querySelectorAll('li')).toHaveLength(0);
  });

  it('forwards localized Card labels and the requested heading level', () => {
    const fixture = TestBed.createComponent(GhExperienceTimelineComponent);
    fixture.componentRef.setInput('experiences', [
      {
        id: 'current-role',
        role: 'Rol actual',
        company: 'Empresa de ejemplo',
        startDate: '2025',
        responsibilities: ['Construir componentes reutilizables'],
      },
    ]);
    fixture.componentRef.setInput('cardHeadingLevel', 3);
    fixture.componentRef.setInput('cardLabels', {
      at: 'en',
      responsibilities: 'Responsabilidades',
      achievements: 'Aportes destacados',
      technologies: 'Tecnologías',
    });
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('gh-experience-card h3')?.textContent).toContain('Rol actual');
    expect(element.querySelector('gh-experience-card h4')?.textContent).toContain(
      'Responsabilidades',
    );
    expect(element.querySelector('article')?.getAttribute('aria-label')).toBe(
      'Rol actual en Empresa de ejemplo',
    );
  });
});
