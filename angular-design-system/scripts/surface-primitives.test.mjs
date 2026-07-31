import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const workspaceRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const libraryRoot = path.join(workspaceRoot, 'projects/gh-design-system/src');
const surfaceRoot = path.join(libraryRoot, 'lib/components/surface');
const glassPanelRoot = path.join(libraryRoot, 'lib/components/glass-panel');

const [surfaceStyles, surfaceTypes, glassPanelStyles, lightTheme, darkTheme, publicApi] =
  await Promise.all([
    readFile(path.join(surfaceRoot, 'surface.component.scss'), 'utf8'),
    readFile(path.join(surfaceRoot, 'surface.types.ts'), 'utf8'),
    readFile(path.join(glassPanelRoot, 'glass-panel.component.scss'), 'utf8'),
    readFile(path.join(libraryRoot, 'lib/styles/themes/_light-theme.scss'), 'utf8'),
    readFile(path.join(libraryRoot, 'lib/styles/themes/_dark-theme.scss'), 'utf8'),
    readFile(path.join(libraryRoot, 'public-api.ts'), 'utf8'),
  ]);

const materials = ['solid', 'glass-subtle', 'glass', 'glass-elevated', 'glass-floating'];
const materialProperties = [
  'background',
  'fallback-background',
  'border-color',
  'border-width',
  'border-highlight',
  'backdrop-filter',
  'shadow',
  'inner-shadow',
  'foreground',
  'muted-foreground',
];

test('maps every Surface material to the complete semantic token contract', () => {
  for (const material of materials) {
    for (const property of materialProperties) {
      assert.match(
        surfaceStyles,
        new RegExp(`var\\(--gh-surface-${material}-${property}\\)`),
        `Surface is missing --gh-surface-${material}-${property}`,
      );
    }
  }

  assert.match(surfaceTypes, /'solid'[\s\S]*'glass-subtle'[\s\S]*'glass-floating'/);
});

test('uses composed filters only for glass enhancement and keeps a centralized fallback', () => {
  assert.match(surfaceStyles, /background:\s*var\(--_gh-surface-fallback-background\)/);
  assert.match(
    surfaceStyles,
    /@supports\s*\(\(backdrop-filter:\s*none\)\s*or\s*\(-webkit-backdrop-filter:\s*none\)\)/,
  );
  assert.match(surfaceStyles, /:host\(:not\(\[data-variant='solid'\]\)\)/);
  assert.match(surfaceStyles, /-webkit-backdrop-filter:\s*var\(--_gh-surface-backdrop-filter\)/);
  assert.match(surfaceStyles, /backdrop-filter:\s*var\(--_gh-surface-backdrop-filter\)/);

  const baseHost = surfaceStyles.slice(0, surfaceStyles.indexOf(':host::before'));
  assert.doesNotMatch(baseHost, /(?:^|\n)\s*(?:-webkit-)?backdrop-filter\s*:/);
});

test('contains no local visual recipes or theme branches', () => {
  assert.doesNotMatch(surfaceStyles, /rgba?\s*\(/i);
  assert.doesNotMatch(surfaceStyles, /(?:^|[^-])blur\s*\(/i);

  for (const [, property, value] of surfaceStyles.matchAll(
    /^\s*(box-shadow|padding|border-radius):\s*([^;]+);/gm,
  )) {
    assert.match(
      value.trim(),
      /^(?:var\(|inherit$)/,
      `${property} must resolve from a token or inherited radius`,
    );
  }

  assert.doesNotMatch(surfaceStyles, /(?:^|\s)opacity\s*:/i);
  assert.doesNotMatch(surfaceStyles, /\[data-theme|prefers-color-scheme/i);
  assert.doesNotMatch(surfaceStyles, /\b(?:undefined|null|placeholder)\b/i);
});

test('keeps all required Surface variables available in light and dark themes', () => {
  for (const material of materials) {
    for (const property of materialProperties) {
      const mapKey = `'surface-${material}-${property}':`;

      assert.ok(lightTheme.includes(mapKey), `Light theme is missing ${mapKey}`);
      assert.ok(darkTheme.includes(mapKey), `Dark theme is missing ${mapKey}`);
    }
  }

  for (const theme of [lightTheme, darkTheme]) {
    assert.match(theme, /'surface-interactive-hover-background':/);
    assert.match(theme, /'surface-interactive-focus-ring-color':/);
    assert.match(theme, /'surface-disabled-background':/);
    assert.doesNotMatch(theme, /\bundefined\b/);
  }
});

test('keeps Glass Panel as a style-free composition and exports only public entry points', () => {
  assert.doesNotMatch(glassPanelStyles, /--gh-surface-|backdrop-filter|background|box-shadow/);
  assert.match(publicApi, /components\/surface\/surface\.component/);
  assert.match(publicApi, /components\/surface\/surface\.types/);
  assert.match(publicApi, /components\/glass-panel\/glass-panel\.component/);
  assert.match(publicApi, /components\/glass-panel\/glass-panel\.types/);
});
