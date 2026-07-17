import type { Meta, StoryObj } from '@storybook/angular';
import { GhArticleCardComponent } from 'gh-design-system';
import { STORY_ARTICLE } from '../../../../../../../stories/shared/story-data';

const meta: Meta<GhArticleCardComponent> = {
  title: 'Components/Cards/Article Card',
  component: GhArticleCardComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Editorial card for article metadata, image, summary, and internal or external link.',
      },
    },
  },
  args: { article: STORY_ARTICLE },
};

export default meta;
type Story = StoryObj<GhArticleCardComponent>;

export const Featured: Story = {};
export const WithImage: Story = {};
export const Standard: Story = { args: { article: { ...STORY_ARTICLE, featured: false } } };
export const WithoutImage: Story = {
  args: { article: { ...STORY_ARTICLE, imageSrc: undefined, imageAlt: undefined } },
};
export const External: Story = {
  args: { article: { ...STORY_ARTICLE, href: 'https://example.com/article', external: true } },
};
export const CompleteMetadata: Story = {};
export const MinimalMetadata: Story = {
  args: { article: { title: STORY_ARTICLE.title, href: STORY_ARTICLE.href } },
};
export const LongTitle: Story = {
  args: {
    article: {
      ...STORY_ARTICLE,
      title:
        'A long-form guide to designing accessible and maintainable Angular application architecture',
    },
  },
};
