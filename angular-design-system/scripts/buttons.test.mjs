import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const workspaceRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const libraryRoot = path.join(workspaceRoot, 'projects/gh-design-system/src');
const buttonRoot = path.join(libraryRoot, 'lib/components/button');
const iconButtonRoot = path.join(libraryRoot, 'lib/components/icon-button');

const [
  buttonComponent,
  buttonTemplate,
  buttonStyles,
  buttonTypes,
  controlStyles,
  iconButtonComponent,
  iconButtonTemplate,
  iconButtonStyles,
  iconButtonTypes,
  lightTheme,
  darkTheme,
  publicApi,
] = await Promise.all([
  readFile(path.join(buttonRoot, 'button.component.ts'), 'utf8'),
  readFile(path.join(buttonRoot, 'button.component.html'), 'utf8'),
  readFile(path.join(buttonRoot, 'button.component.scss'), 'utf8'),
  readFile(path.join(buttonRoot, 'button.types.ts'), 'utf8'),
  readFile(path.join(buttonRoot, '_control.scss'), 'utf8'),
  readFile(path.join(iconButtonRoot, 'icon-button.component.ts'), 'utf8'),
  readFile(path.join(iconButtonRoot, 'icon-button.component.html'), 'utf8'),
  readFile(path.join(iconButtonRoot, 'icon-button.component.scss'), 'utf8'),
  readFile(path.join(iconButtonRoot, 'icon-button.types.ts'), 'utf8'),
  readFile(path.join(libraryRoot, 'lib/styles/themes/_light-theme.scss'), 'utf8'),
  readFile(path.join(libraryRoot, 'lib/styles/themes/_dark-theme.scss'), 'utf8'),
  readFile(path.join(libraryRoot, 'public-api.ts'), 'utf8'),
]);

test('preserves Button defaults and variants while adding Tertiary', () => {
  assert.match(
    buttonTypes,
    /'primary'[\s\S]*'secondary'[\s\S]*'tertiary'[\s\S]*'ghost'[\s\S]*'danger'/,
  );
  assert.match(buttonTypes, /'sm'[\s\S]*'md'[\s\S]*'lg'/);
  assert.match(buttonComponent, /input<GhButtonVariant>\('primary'\)/);
  assert.match(buttonComponent, /input<GhButtonSize>\('md'\)/);
  assert.match(buttonComponent, /input<GhButtonType>\('button'\)/);
});

test('keeps both controls native, deterministic and free of recreated keyboard behavior', () => {
  for (const template of [buttonTemplate, iconButtonTemplate]) {
    assert.equal((template.match(/<button\b/g) ?? []).length, 1);
    assert.doesNotMatch(template, /role=|tabindex=|\(keydown\)|\(keyup\)/);
    assert.match(template, /\[disabled\]="interactionDisabled\(\)"/);
    assert.match(template, /\[attr\.aria-busy\]="loading\(\) \? 'true' : null"/);
    assert.match(template, /\[attr\.data-variant\]="variant\(\)"/);
    assert.match(template, /\[attr\.data-size\]="size\(\)"/);
  }

  assert.match(buttonTemplate, /\[type\]="type\(\)"/);
  assert.match(iconButtonTemplate, /\[attr\.aria-label\]="ariaLabel\(\)"/);
  assert.match(iconButtonTemplate, /\[attr\.aria-labelledby\]="ariaLabelledby\(\)"/);
  assert.doesNotMatch(iconButtonComponent, /ariaLabel.*(?:icon|variant|name)/i);
});

test('limits filtered material to Secondary and does not animate filters', () => {
  assert.match(controlStyles, /@supports\s*\(\(backdrop-filter:\s*none\)/);
  assert.match(controlStyles, /\[data-variant='secondary'\][\s\S]*backdrop-filter:/);
  const transitionDeclaration = controlStyles.match(/transition:\s*([\s\S]*?);/)?.[1] ?? '';
  assert.doesNotMatch(transitionDeclaration, /\ball\b|backdrop-filter|filter/);

  const supportsBlock = controlStyles.slice(controlStyles.indexOf('@supports'));
  assert.equal((supportsBlock.match(/\[data-variant='secondary'\]/g) ?? []).length, 1);
});

test('uses only component-level visual variables in control styles', () => {
  const styles = [buttonStyles, iconButtonStyles, controlStyles].join('\n');

  assert.doesNotMatch(styles, /#[\da-f]{3,8}|rgba?\s*\(|(?:radial|linear)-gradient\s*\(/i);
  assert.doesNotMatch(styles, /(?:^|[^-])blur\s*\(/i);
  assert.doesNotMatch(
    styles,
    /var\(--gh-(?:action|ambient|border(?:-|\b)|focus|font-|glass|motion|radius|shadow|space|surface)/,
  );
  assert.doesNotMatch(styles, /\[data-theme|prefers-color-scheme/i);
  assert.doesNotMatch(styles, /\b(?:undefined|null|placeholder)\b/i);
});

test('provides one highlight layer, reduced motion and forced-colors fallbacks', () => {
  assert.equal((controlStyles.match(/#\{\$selector\}::before/g) ?? []).length, 2);
  assert.match(controlStyles, /pointer-events:\s*none/);
  assert.match(controlStyles, /@media\s*\(prefers-reduced-motion:\s*reduce\)/);
  assert.match(controlStyles, /@media\s*\(forced-colors:\s*active\)/);
  assert.match(buttonStyles, /@media\s*\(prefers-reduced-motion:\s*reduce\)/);
  assert.match(iconButtonStyles, /@media\s*\(prefers-reduced-motion:\s*reduce\)/);
  assert.doesNotMatch(controlStyles, /forced-color-adjust:\s*none/);
});

test('publishes every component token in light and dark generated themes', () => {
  for (const prefix of ['button', 'icon-button']) {
    for (const theme of [lightTheme, darkTheme]) {
      assert.match(theme, new RegExp(`'${prefix}-focus-ring-color':`));
      assert.match(theme, new RegExp(`'${prefix}-transition-duration':`));
      assert.match(theme, new RegExp(`'${prefix}-disabled-background':`));
      assert.match(theme, new RegExp(`'${prefix}-secondary-fallback-background':`));
      assert.doesNotMatch(theme, /\bundefined\b/);
    }
  }
});

test('exports only the public Button and Icon Button entry points', () => {
  assert.match(publicApi, /components\/button\/button\.component/);
  assert.match(publicApi, /components\/button\/button\.types/);
  assert.match(publicApi, /components\/icon-button\/icon-button\.component/);
  assert.match(publicApi, /components\/icon-button\/icon-button\.types/);
  assert.doesNotMatch(publicApi, /_control|control\.scss/);
  assert.match(iconButtonTypes, /GhIconButtonVariant/);
});

test('does not add browser APIs, runtime style generation or random state', () => {
  for (const component of [buttonComponent, iconButtonComponent]) {
    assert.doesNotMatch(
      component,
      /window|document|matchMedia|ResizeObserver|IntersectionObserver|HostListener|Renderer2/,
    );
    assert.doesNotMatch(component, /Math\.random|crypto\.randomUUID|Date\.|setStyle/);
  }
});
