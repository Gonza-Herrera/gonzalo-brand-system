import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const workspaceRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const libraryRoot = path.join(workspaceRoot, 'projects/gh-design-system/src');
const componentRoot = path.join(libraryRoot, 'lib/components/ambient-background');

const [styles, template, component, types, lightTheme, darkTheme, publicApi] = await Promise.all([
  readFile(path.join(componentRoot, 'ambient-background.component.scss'), 'utf8'),
  readFile(path.join(componentRoot, 'ambient-background.component.html'), 'utf8'),
  readFile(path.join(componentRoot, 'ambient-background.component.ts'), 'utf8'),
  readFile(path.join(componentRoot, 'ambient-background.types.ts'), 'utf8'),
  readFile(path.join(libraryRoot, 'lib/styles/themes/_light-theme.scss'), 'utf8'),
  readFile(path.join(libraryRoot, 'lib/styles/themes/_dark-theme.scss'), 'utf8'),
  readFile(path.join(libraryRoot, 'public-api.ts'), 'utf8'),
]);

const presets = ['none', 'subtle', 'brand', 'cool', 'warm'];
const intensities = ['subtle', 'default', 'strong'];

test('maps the complete closed API to semantic ambient variables', () => {
  assert.match(types, /'none'[\s\S]*'subtle'[\s\S]*'brand'[\s\S]*'cool'[\s\S]*'warm'/);
  assert.match(types, /'subtle'[\s\S]*'default'[\s\S]*'strong'/);
  assert.match(component, /input<GhAmbientPreset>\('subtle'\)/);
  assert.match(component, /input<GhAmbientIntensity>\('default'\)/);

  for (const preset of presets) {
    assert.match(styles, new RegExp(`var\\(--gh-ambient-preset-${preset}\\)`));
  }

  for (const intensity of intensities) {
    assert.match(styles, new RegExp(`var\\(--gh-ambient-intensity-${intensity}\\)`));
  }
});

test('keeps one decorative layer and one projected content layer', () => {
  assert.equal((template.match(/gh-ambient-background__visual/g) ?? []).length, 1);
  assert.equal((template.match(/gh-ambient-background__content/g) ?? []).length, 1);
  assert.equal((template.match(/aria-hidden="true"/g) ?? []).length, 1);
  assert.equal((template.match(/<ng-content\s*\/>/g) ?? []).length, 1);
  assert.doesNotMatch(template, /tabindex|role=|\(click\)|\(keydown\)/);
  assert.match(styles, /pointer-events:\s*none/);
});

test('contains no local visual recipe, animation or browser-dependent branch', () => {
  assert.doesNotMatch(styles, /#[\da-f]{3,8}|rgba?\s*\(|(?:radial|linear)-gradient\s*\(/i);
  assert.doesNotMatch(styles, /(?:^|[^-])blur\s*\(|filter\s*:|box-shadow\s*:|background-position/i);
  assert.doesNotMatch(styles, /@keyframes|animation-name|animation-duration|will-change/i);
  assert.doesNotMatch(styles, /\[data-theme|prefers-color-scheme/i);
  assert.doesNotMatch(
    component,
    /window|document|matchMedia|ResizeObserver|IntersectionObserver|HostListener/,
  );
  assert.doesNotMatch(component, /Math\.random|crypto\.randomUUID|Date\./);
});

test('keeps fallback, reduced-motion and forced-colors behavior structural', () => {
  assert.match(styles, /background:\s*var\(--_gh-ambient-background\)/);
  assert.match(styles, /@media\s*\(prefers-reduced-motion:\s*reduce\)/);
  assert.match(styles, /@media\s*\(forced-colors:\s*active\)/);
  assert.match(styles, /\.gh-ambient-background__visual\s*\{[\s\S]*display:\s*none/);
  assert.doesNotMatch(styles, /forced-color-adjust:\s*none/);
});

test('publishes every ambient variable in both themes and only public entry points', () => {
  const themeKeys = [
    'ambient-background-base',
    'ambient-background-none',
    ...presets.map((preset) => `ambient-preset-${preset}`),
    ...intensities.map((intensity) => `ambient-intensity-${intensity}`),
  ];

  for (const key of themeKeys) {
    assert.ok(lightTheme.includes(`'${key}':`), `Light theme is missing ${key}`);
    assert.ok(darkTheme.includes(`'${key}':`), `Dark theme is missing ${key}`);
  }

  assert.match(publicApi, /ambient-background\/ambient-background\.component/);
  assert.match(publicApi, /ambient-background\/ambient-background\.types/);
  assert.doesNotMatch(publicApi, /__visual|internal|preset-map/);
});
