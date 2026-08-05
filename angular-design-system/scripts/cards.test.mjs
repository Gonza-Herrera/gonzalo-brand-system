import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const workspaceRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const libraryRoot = path.join(workspaceRoot, 'projects/gh-design-system/src');
const cardsRoot = path.join(libraryRoot, 'lib/components/cards');
const cardRoot = path.join(cardsRoot, 'card');

const [
  cardComponent,
  cardTemplate,
  cardStyles,
  cardTypes,
  foundations,
  articleTemplate,
  articleStyles,
  projectTemplate,
  projectStyles,
  experienceTemplate,
  experienceStyles,
  lightTheme,
  darkTheme,
  publicApi,
  cardStories,
  cardDocumentation,
] = await Promise.all([
  readFile(path.join(cardRoot, 'card.component.ts'), 'utf8'),
  readFile(path.join(cardRoot, 'card.component.html'), 'utf8'),
  readFile(path.join(cardRoot, 'card.component.scss'), 'utf8'),
  readFile(path.join(cardRoot, 'card.types.ts'), 'utf8'),
  readFile(path.join(cardsRoot, '_card-foundations.scss'), 'utf8'),
  readFile(path.join(cardsRoot, 'article-card/article-card.component.html'), 'utf8'),
  readFile(path.join(cardsRoot, 'article-card/article-card.component.scss'), 'utf8'),
  readFile(path.join(cardsRoot, 'project-card/project-card.component.html'), 'utf8'),
  readFile(path.join(cardsRoot, 'project-card/project-card.component.scss'), 'utf8'),
  readFile(path.join(cardsRoot, 'experience-card/experience-card.component.html'), 'utf8'),
  readFile(path.join(cardsRoot, 'experience-card/experience-card.component.scss'), 'utf8'),
  readFile(path.join(libraryRoot, 'lib/styles/themes/_light-theme.scss'), 'utf8'),
  readFile(path.join(libraryRoot, 'lib/styles/themes/_dark-theme.scss'), 'utf8'),
  readFile(path.join(libraryRoot, 'public-api.ts'), 'utf8'),
  readFile(path.join(cardRoot, 'card.stories.ts'), 'utf8'),
  readFile(path.join(workspaceRoot, 'docs/design/liquid-glass/cards.md'), 'utf8'),
]);

const variants = ['outlined', 'subtle', 'glass', 'elevated'];
const materialProperties = [
  'background',
  'fallback-background',
  'foreground',
  'muted-foreground',
  'border-color',
  'border-width',
  'border-highlight',
  'backdrop-filter',
  'shadow',
  'inner-shadow',
];

test('preserves the Card selector, defaults and public variants', () => {
  assert.match(cardComponent, /selector:\s*'gh-card'/);
  assert.match(cardComponent, /input<GhCardVariant>\('outlined'\)/);
  assert.match(cardComponent, /input<GhCardPadding>\('md'\)/);
  assert.match(cardComponent, /input<GhCardRadius>\('lg'\)/);
  assert.match(cardTypes, /'outlined'[\s\S]*'elevated'[\s\S]*'subtle'[\s\S]*'glass'/);
  assert.match(cardTypes, /'none'[\s\S]*'sm'[\s\S]*'md'[\s\S]*'lg'/);
  assert.match(cardTypes, /'sm'[\s\S]*'md'[\s\S]*'lg'[\s\S]*'xl'/);
});

test('maps every existing variant to the complete component material contract', () => {
  for (const variant of variants) {
    for (const property of materialProperties) {
      assert.match(
        cardStyles,
        new RegExp(`var\\(--gh-card-${variant}-${property}\\)`),
        `Card is missing --gh-card-${variant}-${property}`,
      );
    }
  }
});

test('keeps the native article and projection slots without synthetic interaction', () => {
  assert.equal((cardTemplate.match(/<article\b/g) ?? []).length, 1);
  for (const slot of ['ghCardMedia', 'ghCardHeader', 'ghCardContent', 'ghCardFooter']) {
    assert.equal((cardTemplate.match(new RegExp(`select="\\[${slot}\\]"`, 'g')) ?? []).length, 1);
  }
  assert.doesNotMatch(cardTemplate, /role=|tabindex=|\(click\)|\(keydown\)|\(keyup\)/);
  assert.match(cardTemplate, /\[attr\.data-variant\]="variant\(\)"/);
  assert.match(cardTemplate, /\[attr\.data-interactive\]/);
  assert.match(cardTemplate, /\[attr\.data-selected\]/);
});

test('enhances only translucent materials and never animates filters', () => {
  assert.match(cardStyles, /@supports\s*\(\(backdrop-filter:\s*none\)/);
  const supportsBlock = cardStyles.slice(cardStyles.indexOf('@supports'));
  for (const variant of ['subtle', 'glass', 'elevated']) {
    assert.match(supportsBlock, new RegExp(`\\.gh-card--${variant}`));
  }
  assert.doesNotMatch(supportsBlock, /\.gh-card--outlined/);

  const transitionDeclaration = cardStyles.match(/transition:\s*([\s\S]*?);/)?.[1] ?? '';
  assert.doesNotMatch(transitionDeclaration, /\ball\b|backdrop-filter|filter/);
});

test('uses Card component tokens instead of local visual recipes or primitive variables', () => {
  const styles = [cardStyles, foundations, articleStyles, projectStyles, experienceStyles].join(
    '\n',
  );
  assert.doesNotMatch(styles, /#[\da-f]{3,8}|rgba?\s*\(|(?:radial|linear)-gradient\s*\(/i);
  assert.doesNotMatch(styles, /(?:^|[^-])blur\s*\(/i);
  assert.doesNotMatch(
    styles,
    /var\(--gh-(?:action|ambient|border(?:-|\b)|focus|font-|glass|motion|radius|shadow|space|surface)/,
  );
  assert.doesNotMatch(styles, /\[data-theme|prefers-color-scheme/i);
});

test('limits clipping to media and keeps one non-interactive highlight layer', () => {
  const baseCardBlock = cardStyles.slice(
    cardStyles.indexOf('.gh-card {'),
    cardStyles.indexOf('.gh-card::before'),
  );
  assert.doesNotMatch(baseCardBlock, /overflow:\s*(?:hidden|clip)/);
  assert.match(cardStyles, /\.gh-card__media\s*\{[\s\S]*overflow:\s*hidden/);
  assert.equal((cardStyles.match(/\.gh-card::before/g) ?? []).length, 2);
  assert.match(cardStyles, /pointer-events:\s*none/);
});

test('preserves reduced-motion and forced-colors behavior', () => {
  assert.match(cardStyles, /@media\s*\(prefers-reduced-motion:\s*reduce\)/);
  assert.match(cardStyles, /@media\s*\(forced-colors:\s*active\)/);
  assert.doesNotMatch(cardStyles, /forced-color-adjust:\s*none/);
  assert.match(cardStyles, /\.gh-card--selected[\s\S]*outline-color:\s*Highlight/);
});

test('keeps existing composed Cards on the single public Card foundation', () => {
  for (const template of [articleTemplate, projectTemplate, experienceTemplate]) {
    assert.equal((template.match(/<gh-card\b/g) ?? []).length, 1);
  }
  assert.match(articleTemplate, /featured \? 'elevated' : 'outlined'/);
  assert.match(projectTemplate, /featured \? 'elevated' : 'outlined'/);
  assert.match(experienceTemplate, /highlighted\(\) \? 'elevated' : 'outlined'/);
  assert.match(projectStyles, /project-card__layout--horizontal/);
  assert.doesNotMatch(projectTemplate, /role="button"|tabindex="0"/);
});

test('publishes Card component tokens in both generated themes', () => {
  for (const theme of [lightTheme, darkTheme]) {
    for (const variant of variants) {
      assert.match(theme, new RegExp(`'card-${variant}-fallback-background':`));
      assert.match(theme, new RegExp(`'card-${variant}-backdrop-filter':`));
    }
    assert.match(theme, /'card-interactive-focus-ring-color':/);
    assert.match(theme, /'card-selected-border-color':/);
    assert.match(theme, /'card-media-aspect-ratio':/);
    assert.doesNotMatch(theme, /\bundefined\b/);
  }
});

test('preserves all existing public Card entry points and avoids browser APIs', () => {
  for (const entryPoint of ['card', 'article-card', 'project-card', 'experience-card']) {
    assert.match(publicApi, new RegExp(`components/cards/${entryPoint}/${entryPoint}\\.component`));
    assert.match(publicApi, new RegExp(`components/cards/${entryPoint}/${entryPoint}\\.types`));
  }
  assert.doesNotMatch(publicApi, /card-foundations/);
  assert.doesNotMatch(
    cardComponent,
    /window|document|matchMedia|ResizeObserver|IntersectionObserver|HostListener|Renderer2|Math\.random|crypto\.randomUUID/,
  );
});

test('documents the migrated family in the existing Storybook category', () => {
  assert.match(cardStories, /title:\s*'Components\/Cards\/Card'/);
  assert.match(cardStories, /'pr26-cards'/);
  for (const story of [
    'Solid',
    'GlassSubtle',
    'Glass',
    'Elevated',
    'Interactive',
    'Selected',
    'WithMedia',
    'FormContent',
    'FeatureComposition',
    'StatComposition',
    'DarkTheme',
    'AmbientBrandBackground',
    'Responsive320',
    'ReducedMotionAndForcedColors',
  ]) {
    assert.match(cardStories, new RegExp(`export const ${story}:`));
  }
  assert.doesNotMatch(cardStories, /title:\s*['"]Liquid Glass Card/);
});

test('provides every required Liquid Glass Card documentation section', () => {
  const numberedSections = cardDocumentation.match(/^## \d+\./gm) ?? [];
  assert.equal(numberedSections.length, 31);
  assert.match(cardDocumentation, /## 3\. Relationship with Surface/);
  assert.match(cardDocumentation, /## 21\. Solid fallback/);
  assert.match(cardDocumentation, /## 31\. Recommendations for PR 27/);
});
