import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const workspaceRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const libraryRoot = path.join(workspaceRoot, 'projects/gh-design-system/src');

const [
  component,
  template,
  styles,
  types,
  unitTests,
  publicApi,
  iconButton,
  iconButtonTemplate,
  lightTheme,
  darkTheme,
  stories,
  showcaseTemplate,
  showcaseSidebar,
  showcaseHeader,
  portfolioTemplate,
  portfolioLanguage,
  portfolioTheme,
  documentation,
] = await Promise.all([
  readFile(path.join(libraryRoot, 'lib/patterns/navigation/navigation.component.ts'), 'utf8'),
  readFile(path.join(libraryRoot, 'lib/patterns/navigation/navigation.component.html'), 'utf8'),
  readFile(path.join(libraryRoot, 'lib/patterns/navigation/navigation.component.scss'), 'utf8'),
  readFile(path.join(libraryRoot, 'lib/patterns/navigation/navigation.types.ts'), 'utf8'),
  readFile(path.join(libraryRoot, 'lib/patterns/navigation/navigation.component.spec.ts'), 'utf8'),
  readFile(path.join(libraryRoot, 'public-api.ts'), 'utf8'),
  readFile(path.join(libraryRoot, 'lib/components/icon-button/icon-button.component.ts'), 'utf8'),
  readFile(path.join(libraryRoot, 'lib/components/icon-button/icon-button.component.html'), 'utf8'),
  readFile(path.join(libraryRoot, 'lib/styles/themes/_light-theme.scss'), 'utf8'),
  readFile(path.join(libraryRoot, 'lib/styles/themes/_dark-theme.scss'), 'utf8'),
  readFile(path.join(libraryRoot, 'lib/patterns/navigation/navigation.stories.ts'), 'utf8'),
  readFile(
    path.join(workspaceRoot, 'projects/showcase/src/app/pages/patterns/patterns.html'),
    'utf8',
  ),
  readFile(
    path.join(
      workspaceRoot,
      'projects/showcase/src/app/layout/showcase-sidebar/showcase-sidebar.scss',
    ),
    'utf8',
  ),
  readFile(
    path.join(
      workspaceRoot,
      'projects/showcase/src/app/layout/showcase-header/showcase-header.scss',
    ),
    'utf8',
  ),
  readFile(
    path.join(
      workspaceRoot,
      'projects/portfolio/src/app/layout/portfolio-shell/portfolio-shell.component.html',
    ),
    'utf8',
  ),
  readFile(
    path.join(
      workspaceRoot,
      'projects/portfolio/src/app/shared/components/language-switcher/language-switcher.component.scss',
    ),
    'utf8',
  ),
  readFile(
    path.join(
      workspaceRoot,
      'projects/portfolio/src/app/shared/components/theme-switcher/theme-switcher.component.scss',
    ),
    'utf8',
  ),
  readFile(path.join(workspaceRoot, 'docs/design/liquid-glass/navigation.md'), 'utf8'),
]);

test('preserves the Navigation selector, public inputs, output and item type', () => {
  assert.match(component, /selector:\s*'gh-navigation'/);
  for (const input of [
    'brand',
    'brandHref',
    'items',
    'sticky',
    'transparent',
    'showThemeControl',
    'menuLabel',
    'closeMenuLabel',
    'navigationLabel',
    'menuId',
    'externalLinkLabel',
    'interceptInternalNavigation',
  ]) {
    assert.match(component, new RegExp(`readonly ${input} = input`));
  }
  assert.match(component, /readonly internalNavigate = output<string>\(\)/);
  for (const field of ['label', 'href', 'external', 'active', 'ariaLabel']) {
    assert.match(types, new RegExp(`readonly ${field}`));
  }
  assert.match(publicApi, /patterns\/navigation\/navigation\.component/);
  assert.match(publicApi, /patterns\/navigation\/navigation\.types/);
});

test('keeps native navigation semantics, projection and explicit route state', () => {
  assert.match(template, /<header/);
  assert.match(template, /<nav \[attr\.aria-label\]="navigationLabel\(\)"/);
  assert.match(template, /<ul>/);
  assert.match(template, /<li>/);
  assert.match(template, /<a[\s\S]*\[href\]="item\.href"/);
  assert.match(template, /\[attr\.aria-current\]="item\.active \? 'page' : null"/);
  assert.match(template, /select="\[ghNavigationLogo\]"/);
  assert.match(template, /select="\[ghNavigationActions\]"/);
  assert.match(template, /select="\[ghNavigationThemeControl\]"/);
  assert.doesNotMatch(template, /role="(?:menu|menubar|dialog)"/);
});

test('composes Icon Button for the mobile trigger and preserves focus restoration', () => {
  assert.match(component, /imports:\s*\[GhContainerComponent, GhIconButtonComponent\]/);
  assert.match(template, /<gh-icon-button[\s\S]*\[aria-expanded\]="menuOpen\(\)"/);
  assert.match(template, /\[aria-controls\]="menuId\(\)"/);
  assert.match(component, /this\.menuToggle\(\)\?\.focus\(\)/);
  assert.match(component, /handleEscape[\s\S]*this\.closeMenu\(true\)/);
  assert.match(iconButton, /alias:\s*'aria-expanded'/);
  assert.match(iconButton, /alias:\s*'aria-controls'/);
  assert.match(iconButton, /focus\(options\?: FocusOptions\)/);
  assert.match(iconButtonTemplate, /\[attr\.aria-expanded\]="ariaExpanded\(\)"/);
});

test('uses Navigation component tokens without raw visual recipes or item-level blur', () => {
  const variables = [...styles.matchAll(/var\(--gh-([a-z0-9-]+)/g)].map((match) => match[1]);

  assert.ok(variables.length > 0);
  for (const variable of variables) {
    assert.ok(
      variable.startsWith('navigation-'),
      `Unexpected non-Navigation variable --gh-${variable}`,
    );
  }
  assert.doesNotMatch(styles, /#[\da-f]{3,8}|rgba?\s*\(|(?:radial|linear)-gradient\s*\(/i);
  assert.doesNotMatch(styles, /transition:\s*all/i);
  const linkBlock = styles.slice(
    styles.indexOf('.gh-navigation__link {'),
    styles.indexOf('.gh-navigation__link--active {'),
  );
  assert.doesNotMatch(linkBlock, /backdrop-filter|\bblur\s*\(/i);
});

test('limits backdrop filtering to structural Header and mobile panel with solid fallbacks', () => {
  assert.match(styles, /@supports\s*\(\(backdrop-filter:\s*none\)/);
  assert.match(styles, /\.gh-navigation:not\(\.gh-navigation--transparent\)/);
  assert.match(styles, /\.gh-navigation__panel--open/);
  assert.match(styles, /navigation-header-fallback-background/);
  assert.match(styles, /navigation-panel-fallback-background/);
  assert.doesNotMatch(styles, /transition:[^;]*(?:backdrop-filter|filter)/i);
  assert.doesNotMatch(component, /HostListener|window|document|matchMedia|ResizeObserver|scroll/);
});

test('provides reduced-motion and forced-colors navigation paths', () => {
  assert.match(styles, /@media\s*\(prefers-reduced-motion:\s*reduce\)/);
  assert.match(styles, /@media\s*\(forced-colors:\s*active\)/);
  assert.match(styles, /background:\s*Canvas/);
  assert.match(styles, /background:\s*Highlight/);
  assert.doesNotMatch(styles, /forced-color-adjust:\s*none/);
});

test('publishes every Navigation token in generated light and dark themes', () => {
  for (const theme of [lightTheme, darkTheme]) {
    for (const token of [
      'navigation-header-fallback-background',
      'navigation-header-backdrop-filter',
      'navigation-panel-fallback-background',
      'navigation-item-active-indicator',
      'navigation-item-focus-ring-color',
      'navigation-side-background',
      'navigation-selector-item-active-background',
      'navigation-skip-link-background',
      'navigation-backdrop-background',
    ]) {
      assert.match(theme, new RegExp(`'${token}':`));
    }
    assert.doesNotMatch(theme, /\bundefined\b/);
  }
});

test('migrates real Showcase and Portfolio navigation consumers', () => {
  assert.match(showcaseTemplate, /Current public scope/);
  assert.match(showcaseTemplate, /Tabs, Breadcrumbs and Pagination are not current/);
  assert.match(showcaseSidebar, /--gh-navigation-side-/);
  assert.match(showcaseSidebar, /--gh-navigation-item-active-/);
  assert.match(showcaseHeader, /--gh-navigation-header-fallback-background/);
  assert.match(portfolioTemplate, /<gh-navigation/);
  assert.match(portfolioTemplate, /\[interceptInternalNavigation\]="true"/);
  assert.match(portfolioTemplate, /menuId="portfolio-navigation-menu"/);
  assert.match(portfolioLanguage, /--gh-navigation-selector-/);
  assert.match(portfolioTheme, /--gh-navigation-selector-label-foreground/);
});

test('documents the existing Navigation family without parallel local-navigation APIs', () => {
  assert.match(stories, /title:\s*'Patterns\/Navigation'/);
  assert.match(stories, /'pr28-navigation'/);
  for (const story of [
    'Default',
    'Sticky',
    'LightTheme',
    'DarkTheme',
    'AmbientBackground',
    'ActiveRoute',
    'WithProjectedControls',
    'LongEnglishAndSpanishLabels',
    'NavigationItemFocus',
    'MobileClosed',
    'MobileOpen',
    'MobileEscapeRestoresFocus',
    'MobileRouteSelectionCloses',
    'DarkMobileOpen',
    'ReducedMotionAndForcedColors',
  ]) {
    assert.match(stories, new RegExp(`export const ${story}:`));
  }
  assert.doesNotMatch(publicApi, /tabs|breadcrumbs|pagination/i);
});

test('provides every required Liquid Glass Navigation documentation section', () => {
  const numberedSections = documentation.match(/^## \d+\./gm) ?? [];
  assert.equal(numberedSections.length, 31);
  assert.match(documentation, /## 2\. Architecture/);
  assert.match(documentation, /## 20\. Component tokens/);
  assert.match(documentation, /## 31\. Recommendations for PR 29/);
});

test('keeps focused unit coverage for active state, disclosure, Escape and interception', () => {
  assert.match(unitTests, /aria-current="page"/);
  assert.match(unitTests, /starts closed and opens and closes the mobile menu/);
  assert.match(unitTests, /closes on Escape and restores focus/);
  assert.match(unitTests, /emits intercepted internal navigation/);
  assert.match(unitTests, /does not intercept external links or modified internal clicks/);
});
