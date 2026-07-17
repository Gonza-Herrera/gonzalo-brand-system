import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import {
  GhContactCalloutComponent,
  GhFeatureGridComponent,
  GhFooterComponent,
  GhHeroComponent,
  GhHeroVisualDirective,
  GhNavigationComponent,
} from 'gh-design-system';
import {
  STORY_CONTACT_ACTIONS,
  STORY_FEATURES,
  STORY_FOOTER_GROUPS,
  STORY_HERO_ACTIONS,
  STORY_NAVIGATION_ITEMS,
} from '../shared/story-data';

const meta = {
  title: 'Compositions/Portfolio Home',
  decorators: [
    moduleMetadata({
      imports: [
        GhContactCalloutComponent,
        GhFeatureGridComponent,
        GhFooterComponent,
        GhHeroComponent,
        GhHeroVisualDirective,
        GhNavigationComponent,
      ],
    }),
  ],
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A realistic portfolio landing flow assembled only from public design-system patterns.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const CompleteFlow: Story = {
  render: () => ({
    props: {
      navigationItems: STORY_NAVIGATION_ITEMS,
      heroActions: STORY_HERO_ACTIONS,
      features: STORY_FEATURES,
      contactActions: STORY_CONTACT_ACTIONS,
      footerGroups: STORY_FOOTER_GROUPS,
    },
    template: `
      <gh-navigation brand="Gonzalo Herrera" brandHref="#home" [items]="navigationItems" [sticky]="false"></gh-navigation>
      <main id="home">
        <gh-hero
          eyebrow="Frontend engineer · Design systems"
          title="Accessible Angular experiences, built as durable systems."
          description="I connect product thinking, frontend architecture, and a clear visual language."
          [actions]="heroActions"
          layout="split"
          surface="gradient"
        >
          <div ghHeroVisual class="gh-story-hero-visual">Portfolio system</div>
        </gh-hero>
        <section aria-labelledby="principles-heading" style="padding: var(--gh-section-padding-lg) var(--gh-container-gutter-md)">
          <h2 id="principles-heading">How I work</h2>
          <gh-feature-grid [features]="features" columns="3"></gh-feature-grid>
        </section>
        <gh-contact-callout
          eyebrow="Work together"
          title="Let’s build something clear and resilient."
          description="Available for frontend architecture, design systems, and accessibility work."
          [actions]="contactActions"
        ></gh-contact-callout>
      </main>
      <gh-footer brand="Gonzalo Herrera" [linkGroups]="footerGroups" copyright="© 2026 Gonzalo Herrera"></gh-footer>
    `,
  }),
};

export const Mobile: Story = {
  ...CompleteFlow,
  globals: { viewport: { value: 'mobile375', isRotated: false } },
};
