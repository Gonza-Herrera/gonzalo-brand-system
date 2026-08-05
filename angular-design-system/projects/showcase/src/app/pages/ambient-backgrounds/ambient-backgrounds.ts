import { Component } from '@angular/core';
import {
  GhAmbientBackgroundComponent,
  GhButtonComponent,
  GhGlassPanelComponent,
  GhGridComponent,
  GhStackComponent,
  GhSurfaceComponent,
  GhTagComponent,
  type GhAmbientIntensity,
  type GhAmbientPreset,
  type GhSurfaceVariant,
} from 'gh-design-system';

import { CodePreview } from '../../shared/components/code-preview/code-preview';
import { DocumentationSection } from '../../shared/components/documentation-section/documentation-section';

interface AmbientExample {
  readonly label: string;
  readonly description: string;
  readonly preset: GhAmbientPreset;
}

interface AmbientSurfaceExample {
  readonly label: string;
  readonly preset: GhAmbientPreset;
  readonly variant: GhSurfaceVariant;
}

@Component({
  selector: 'showcase-ambient-backgrounds-page',
  standalone: true,
  imports: [
    CodePreview,
    DocumentationSection,
    GhAmbientBackgroundComponent,
    GhButtonComponent,
    GhGlassPanelComponent,
    GhGridComponent,
    GhStackComponent,
    GhSurfaceComponent,
    GhTagComponent,
  ],
  templateUrl: './ambient-backgrounds.html',
  styleUrl: './ambient-backgrounds.scss',
})
export class AmbientBackgroundsPage {
  protected readonly presets = [
    { label: 'None', description: 'Stable wrapper without decorative paint.', preset: 'none' },
    {
      label: 'Subtle',
      description: 'Quiet context for documentation and forms.',
      preset: 'subtle',
    },
    { label: 'Brand', description: 'Lavender-led balance for primary moments.', preset: 'brand' },
    { label: 'Cool', description: 'Technical context led by Cloud Blue.', preset: 'cool' },
    { label: 'Warm', description: 'Human, editorial context led by Soft Peach.', preset: 'warm' },
  ] as const satisfies readonly AmbientExample[];

  protected readonly intensities = [
    'subtle',
    'default',
    'strong',
  ] as const satisfies readonly GhAmbientIntensity[];

  protected readonly combinations = [
    { label: 'Subtle + Glass Subtle', preset: 'subtle', variant: 'glass-subtle' },
    { label: 'Brand + Glass', preset: 'brand', variant: 'glass' },
    { label: 'Brand + Glass Elevated', preset: 'brand', variant: 'glass-elevated' },
    { label: 'Cool + Glass Floating', preset: 'cool', variant: 'glass-floating' },
    { label: 'Warm + Solid', preset: 'warm', variant: 'solid' },
  ] as const satisfies readonly AmbientSurfaceExample[];

  protected readonly basicExample = `<gh-ambient-background preset="brand" intensity="default">
  <gh-surface variant="glass" padding="lg">
    <h2>Project summary</h2>
    <p>Ambient paint remains decorative.</p>
  </gh-surface>
</gh-ambient-background>`;
}
