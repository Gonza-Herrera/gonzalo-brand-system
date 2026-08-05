import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const workspaceRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const libraryRoot = path.join(workspaceRoot, 'projects/gh-design-system/src');

const [
  formStyles,
  styleIndex,
  publicApi,
  lightTheme,
  darkTheme,
  stories,
  showcaseTemplate,
  showcaseRoutes,
  showcaseNavigation,
  contactTemplate,
  contactComponent,
  contactStyles,
  themeSwitcherTemplate,
  documentation,
] = await Promise.all([
  readFile(path.join(libraryRoot, 'lib/styles/_forms.scss'), 'utf8'),
  readFile(path.join(libraryRoot, 'lib/styles/index.scss'), 'utf8'),
  readFile(path.join(libraryRoot, 'public-api.ts'), 'utf8'),
  readFile(path.join(libraryRoot, 'lib/styles/themes/_light-theme.scss'), 'utf8'),
  readFile(path.join(libraryRoot, 'lib/styles/themes/_dark-theme.scss'), 'utf8'),
  readFile(path.join(workspaceRoot, 'stories/foundations/form-controls.stories.ts'), 'utf8'),
  readFile(path.join(workspaceRoot, 'projects/showcase/src/app/pages/forms/forms.html'), 'utf8'),
  readFile(path.join(workspaceRoot, 'projects/showcase/src/app/app.routes.ts'), 'utf8'),
  readFile(
    path.join(workspaceRoot, 'projects/showcase/src/app/core/config/showcase-navigation.ts'),
    'utf8',
  ),
  readFile(
    path.join(
      workspaceRoot,
      'projects/portfolio/src/app/pages/contact/components/contact-form/contact-form.component.html',
    ),
    'utf8',
  ),
  readFile(
    path.join(
      workspaceRoot,
      'projects/portfolio/src/app/pages/contact/components/contact-form/contact-form.component.ts',
    ),
    'utf8',
  ),
  readFile(
    path.join(
      workspaceRoot,
      'projects/portfolio/src/app/pages/contact/components/contact-form/contact-form.component.scss',
    ),
    'utf8',
  ),
  readFile(
    path.join(
      workspaceRoot,
      'projects/portfolio/src/app/shared/components/theme-switcher/theme-switcher.component.html',
    ),
    'utf8',
  ),
  readFile(path.join(workspaceRoot, 'docs/design/liquid-glass/form-controls.md'), 'utf8'),
]);

const tokenPrefixes = ['form-field', 'form-control', 'choice-control', 'switch-control'];

test('publishes one class-based native Form foundation without parallel Angular components', () => {
  assert.match(styleIndex, /@use 'forms'/);
  for (const cssClass of [
    'gh-form-field',
    'gh-input',
    'gh-textarea',
    'gh-select',
    'gh-checkbox',
    'gh-radio',
    'gh-switch',
  ]) {
    assert.match(formStyles, new RegExp(`\\.${cssClass}`));
  }
  assert.doesNotMatch(publicApi, /form-control|form-field|input\.component|select\.component/);
  assert.doesNotMatch(showcaseTemplate, /<gh-(?:input|textarea|select|checkbox|radio|switch)/);
});

test('uses only component-level Form variables for reusable visual styling', () => {
  const variables = [...formStyles.matchAll(/var\(--gh-([a-z0-9-]+)/g)].map((match) => match[1]);

  assert.ok(variables.length > 0);
  for (const variable of variables) {
    assert.ok(
      tokenPrefixes.some((prefix) => variable.startsWith(prefix)),
      `Unexpected non-Form variable --gh-${variable}`,
    );
  }
  assert.doesNotMatch(formStyles, /#[\da-f]{3,8}|rgba?\s*\(|(?:radial|linear)-gradient\s*\(/i);
  assert.doesNotMatch(formStyles, /backdrop-filter|\bblur\s*\(/i);
  assert.doesNotMatch(formStyles, /transition:\s*all/i);
});

test('preserves native control semantics and distinct state selectors', () => {
  for (const type of ['text', 'email', 'password', 'number', 'search']) {
    assert.match(showcaseTemplate, new RegExp(`type="${type}"`));
  }
  assert.match(showcaseTemplate, /<textarea[^>]*class="gh-textarea"/);
  assert.match(showcaseTemplate, /<select[^>]*class="gh-select"/);
  assert.match(showcaseTemplate, /type="checkbox"/);
  assert.match(showcaseTemplate, /type="radio"/);
  assert.match(showcaseTemplate, /role="switch"/);
  assert.match(formStyles, /:read-only/);
  assert.match(formStyles, /:disabled/);
  assert.match(formStyles, /\[aria-invalid='true'\]/);
  assert.match(formStyles, /:indeterminate/);
  assert.match(formStyles, /:checked/);
});

test('keeps labels, descriptions and errors explicitly associated', () => {
  assert.match(showcaseTemplate, /label class="gh-form-field__label" for="forms-hint"/);
  assert.match(showcaseTemplate, /id="forms-hint-description"/);
  assert.match(showcaseTemplate, /aria-describedby="forms-hint-description"/);
  assert.match(showcaseTemplate, /aria-invalid="true"/);
  assert.match(showcaseTemplate, /class="gh-form-field__error" id="forms-invalid-error"/);
  assert.match(showcaseTemplate, /<fieldset class="gh-form-group">/);
  assert.match(showcaseTemplate, /<legend class="gh-form-field__label">/);
});

test('supports reduced motion, forced colors and native high-contrast rendering', () => {
  assert.match(formStyles, /@media\s*\(prefers-reduced-motion:\s*reduce\)/);
  assert.match(formStyles, /@media\s*\(forced-colors:\s*active\)/);
  assert.match(formStyles, /appearance:\s*auto/);
  assert.match(formStyles, /accent-color:\s*SelectedItem/);
  assert.doesNotMatch(formStyles, /forced-color-adjust:\s*none/);
});

test('publishes every Form component token in generated light and dark themes', () => {
  for (const theme of [lightTheme, darkTheme]) {
    for (const token of [
      'form-field-label-foreground',
      'form-control-placeholder-foreground',
      'form-control-focus-ring-color',
      'form-control-invalid-border-color',
      'form-control-disabled-background',
      'form-control-readonly-background',
      'choice-control-checked-background',
      'choice-control-disabled-label',
      'switch-control-checked-background',
      'switch-control-disabled-label',
    ]) {
      assert.match(theme, new RegExp(`'${token}':`));
    }
    assert.doesNotMatch(theme, /\bundefined\b/);
  }
});

test('migrates Portfolio Contact visuals without changing its Forms or Web3Forms behavior', () => {
  assert.equal((contactTemplate.match(/class="gh-input"/g) ?? []).length, 3);
  assert.equal((contactTemplate.match(/class="gh-textarea"/g) ?? []).length, 1);
  assert.equal((contactTemplate.match(/class="contact-field gh-form-field"/g) ?? []).length, 3);
  assert.match(contactTemplate, /contact-field--message gh-form-field/);
  assert.match(contactTemplate, /formControlName="name"/);
  assert.match(contactTemplate, /formControlName="email"/);
  assert.match(contactTemplate, /formControlName="subject"/);
  assert.match(contactTemplate, /formControlName="message"/);
  assert.match(contactTemplate, /formControlName="botcheck"/);
  assert.match(contactComponent, /ReactiveFormsModule/);
  assert.match(contactComponent, /contactService[\s\S]*\.sendMessage\(value\)/);
  assert.doesNotMatch(contactStyles, /\.contact-field input|\.contact-field textarea/);
  assert.match(themeSwitcherTemplate, /<select class="gh-select"/);
});

test('documents Forms in Storybook and Showcase without raw visual controls', () => {
  assert.match(stories, /title:\s*'Foundations\/Form Controls'/);
  assert.match(stories, /'pr27-forms'/);
  for (const story of [
    'DefaultInput',
    'InputTypes',
    'Focus',
    'InputStates',
    'Textarea',
    'NativeSelect',
    'CheckboxStates',
    'RadioGroup',
    'SwitchStates',
    'PrefixAndSuffix',
    'TrailingAction',
    'SolidCardContext',
    'GlassCardContext',
    'AmbientBackground',
    'DarkTheme',
    'Mobile320',
    'LongEnglishAndSpanishContent',
    'ReducedMotionAndForcedColors',
  ]) {
    assert.match(stories, new RegExp(`export const ${story}:`));
  }
  assert.match(showcaseRoutes, /path:\s*'forms'/);
  assert.match(showcaseNavigation, /label:\s*'Forms'/);
});

test('provides all required Liquid Glass Form Control documentation sections', () => {
  const numberedSections = documentation.match(/^## \d+\./gm) ?? [];
  assert.equal(numberedSections.length, 35);
  assert.match(documentation, /## 2\. Architecture/);
  assert.match(documentation, /## 27\. Reactive Forms/);
  assert.match(documentation, /## 35\. Recommendations for PR 28/);
});
