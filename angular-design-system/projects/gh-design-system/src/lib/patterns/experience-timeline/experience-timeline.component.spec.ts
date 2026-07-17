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
});
