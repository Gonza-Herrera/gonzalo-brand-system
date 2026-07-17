import { TestBed } from '@angular/core/testing';

import { HomePage } from './home.page';

describe('HomePage', () => {
  it('renders one semantic heading through public Design System layout APIs', async () => {
    await TestBed.configureTestingModule({ imports: [HomePage] }).compileComponents();
    const fixture = TestBed.createComponent(HomePage);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelectorAll('h1')).toHaveLength(1);
    expect(element.querySelector('h1')?.textContent).toContain('Gonzalo Herrera');
    expect(element.querySelector('gh-section section')).not.toBeNull();
    expect(element.querySelector('gh-container')).not.toBeNull();
    expect(element.querySelector('gh-stack')).not.toBeNull();
  });
});
