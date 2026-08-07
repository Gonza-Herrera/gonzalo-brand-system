import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

import {
  getGeneratedFiles,
  loadAndValidateTokens,
  requiredAmbientPrimitivePaths,
  requiredAmbientSemanticPaths,
  requiredButtonSemanticPaths,
  requiredCardSemanticPaths,
  requiredFormSemanticPaths,
  requiredLiquidGlassPrimitivePaths,
  requiredLiquidGlassSemanticPaths,
  requiredNavigationSemanticPaths,
} from './tokens.mjs';

const workspaceRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const repositoryRoot = path.resolve(workspaceRoot, '..');

function toKebabCase(value) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replaceAll('_', '-')
    .toLowerCase();
}

function primitiveCssName(tokenPath) {
  return `--gh-${tokenPath.split('.').map(toKebabCase).join('-')}`;
}

function semanticCssName(tokenPath) {
  return `--gh-${tokenPath.split('.').map(toKebabCase).join('-')}`;
}

function countOccurrences(source, search) {
  return source.split(search).length - 1;
}

test('loads the complete Liquid Glass primitive contract within its approved budgets', async () => {
  const { primitiveTokens } = await loadAndValidateTokens();

  for (const tokenPath of requiredLiquidGlassPrimitivePaths) {
    assert.ok(primitiveTokens.has(tokenPath), `Missing primitive ${tokenPath}`);
  }

  for (const scale of ['none', 'xs', 'sm', 'md', 'lg', 'xl']) {
    const value = primitiveTokens.get(`glass.blur.${scale}`).value;
    const remValue = value === '0' ? 0 : Number.parseFloat(value);

    assert.ok(remValue >= 0 && remValue <= 1.5, `${scale} blur is outside the approved budget`);
  }

  for (const scale of ['none', 'subtle', 'default', 'strong']) {
    const value = primitiveTokens.get(`glass.saturation.${scale}`).value;

    assert.ok(value >= 1 && value <= 1.25, `${scale} saturation is outside the safe range`);
  }

  for (const token of primitiveTokens.values()) {
    if (token.path.startsWith('glass.opacity.')) {
      assert.ok(token.value >= 0 && token.value <= 1, `${token.path} must be between 0 and 1`);
    }
  }
});

test('loads the ambient opacity contract and keeps every preset within three layers', async () => {
  const { darkTokens, primitiveTokens, semanticTokens } = await loadAndValidateTokens();

  for (const tokenPath of requiredAmbientPrimitivePaths) {
    const token = primitiveTokens.get(tokenPath);
    assert.ok(token, `Missing ambient primitive ${tokenPath}`);
    assert.ok(token.value >= 0 && token.value <= 0.9, `${tokenPath} exceeds the opacity budget`);
  }

  for (const tokenPath of requiredAmbientSemanticPaths) {
    assert.ok(semanticTokens.has(tokenPath), `Missing light ambient token ${tokenPath}`);
    assert.ok(darkTokens.has(tokenPath), `Missing dark ambient token ${tokenPath}`);
    assert.equal(darkTokens.get(tokenPath).type, semanticTokens.get(tokenPath).type);
  }

  for (const theme of [semanticTokens, darkTokens]) {
    for (const preset of ['subtle', 'brand', 'cool', 'warm']) {
      const value = String(theme.get(`ambient.preset.${preset}`).value);
      const layerCount = value.match(/radial-gradient\(/g)?.length ?? 0;

      assert.ok(layerCount >= 1 && layerCount <= 3, `${preset} must use one to three layers`);
      assert.doesNotMatch(value, /url\(|image\(|filter\(|blur\(/i);
    }
  }
});

test('keeps the Liquid Glass semantic contract identical in light and dark themes', async () => {
  const { darkTokens, semanticTokens } = await loadAndValidateTokens();

  assert.deepEqual([...darkTokens.keys()], [...semanticTokens.keys()]);

  for (const tokenPath of requiredLiquidGlassSemanticPaths) {
    const lightToken = semanticTokens.get(tokenPath);
    const darkToken = darkTokens.get(tokenPath);

    assert.ok(lightToken, `Missing light token ${tokenPath}`);
    assert.ok(darkToken, `Missing dark token ${tokenPath}`);
    assert.equal(darkToken.type, lightToken.type, `Theme type mismatch for ${tokenPath}`);
  }
});

test('provides complete theme-aware component contracts for Button and Icon Button', async () => {
  const { darkTokens, semanticTokens } = await loadAndValidateTokens();

  for (const tokenPath of requiredButtonSemanticPaths) {
    const lightToken = semanticTokens.get(tokenPath);
    const darkToken = darkTokens.get(tokenPath);

    assert.ok(lightToken, `Missing light component token ${tokenPath}`);
    assert.ok(darkToken, `Missing dark component token ${tokenPath}`);
    assert.equal(darkToken.type, lightToken.type, `Theme type mismatch for ${tokenPath}`);
  }

  assert.equal(
    semanticTokens.get('button.secondary.backdropFilter').value,
    '{surface.glass.backdropFilter}',
  );
  assert.equal(
    semanticTokens.get('button.secondary.fallbackBackground').value,
    '{surface.glass.fallbackBackground}',
  );

  for (const variant of ['primary', 'tertiary', 'ghost', 'danger']) {
    assert.equal(
      semanticTokens.get(`button.${variant}.backdropFilter`).value,
      'none',
      `${variant} must not instantiate a filtered material`,
    );
  }

  assert.equal(
    semanticTokens.get('button.focus.ringColor').value,
    '{surface.interactive.focus.ringColor}',
  );
  assert.equal(
    semanticTokens.get('button.transition.duration').value,
    '{surface.transition.duration}',
  );
  assert.equal(
    semanticTokens.get('iconButton.secondary.background').value,
    '{button.secondary.background}',
  );
  assert.equal(
    semanticTokens.get('iconButton.disabled.foreground').value,
    '{button.disabled.foreground}',
  );
});

test('provides a complete theme-aware Card contract mapped to Surface materials', async () => {
  const { darkTokens, semanticTokens } = await loadAndValidateTokens();

  for (const tokenPath of requiredCardSemanticPaths) {
    const lightToken = semanticTokens.get(tokenPath);
    const darkToken = darkTokens.get(tokenPath);

    assert.ok(lightToken, `Missing light Card token ${tokenPath}`);
    assert.ok(darkToken, `Missing dark Card token ${tokenPath}`);
    assert.equal(darkToken.type, lightToken.type, `Theme type mismatch for ${tokenPath}`);
  }

  const materialMapping = {
    outlined: 'solid',
    subtle: 'glassSubtle',
    glass: 'glass',
    elevated: 'glassElevated',
  };

  for (const [variant, material] of Object.entries(materialMapping)) {
    assert.equal(
      semanticTokens.get(`card.${variant}.background`).value,
      `{surface.${material}.background}`,
    );
    assert.equal(
      semanticTokens.get(`card.${variant}.fallbackBackground`).value,
      `{surface.${material}.fallbackBackground}`,
    );
    assert.equal(
      semanticTokens.get(`card.${variant}.backdropFilter`).value,
      `{surface.${material}.backdropFilter}`,
    );
  }

  assert.equal(
    semanticTokens.get('card.interactive.focus.ringColor').value,
    '{surface.interactive.focus.ringColor}',
  );
  assert.equal(
    semanticTokens.get('card.selected.borderColor').value,
    '{surface.interactive.selected.borderColor}',
  );
});

test('provides a complete theme-aware native Form Control contract', async () => {
  const { darkTokens, semanticTokens } = await loadAndValidateTokens();

  for (const tokenPath of requiredFormSemanticPaths) {
    const lightToken = semanticTokens.get(tokenPath);
    const darkToken = darkTokens.get(tokenPath);

    assert.ok(lightToken, `Missing light Form token ${tokenPath}`);
    assert.ok(darkToken, `Missing dark Form token ${tokenPath}`);
    assert.equal(darkToken.type, lightToken.type, `Theme type mismatch for ${tokenPath}`);
  }

  assert.equal(
    semanticTokens.get('formControl.background').value,
    '{surface.glassSubtle.fallbackBackground}',
  );
  assert.equal(
    semanticTokens.get('formControl.focus.ringColor').value,
    '{surface.interactive.focus.ringColor}',
  );
  assert.equal(
    semanticTokens.get('choiceControl.checked.background').value,
    '{action.primary.background}',
  );
  assert.equal(
    semanticTokens.get('switchControl.checked.background').value,
    '{action.primary.background}',
  );

  for (const tokenPath of requiredFormSemanticPaths) {
    assert.doesNotMatch(String(semanticTokens.get(tokenPath).value), /backdrop-filter|blur\(/i);
  }
});

test('provides a complete theme-aware Navigation contract', async () => {
  const { darkTokens, semanticTokens } = await loadAndValidateTokens();

  for (const tokenPath of requiredNavigationSemanticPaths) {
    const lightToken = semanticTokens.get(tokenPath);
    const darkToken = darkTokens.get(tokenPath);

    assert.ok(lightToken, `Missing light Navigation token ${tokenPath}`);
    assert.ok(darkToken, `Missing dark Navigation token ${tokenPath}`);
    assert.equal(darkToken.type, lightToken.type, `Theme type mismatch for ${tokenPath}`);
  }

  assert.equal(
    semanticTokens.get('navigation.header.backdropFilter').value,
    'blur({glass.blur.md}) saturate({glass.saturation.default})',
  );
  assert.equal(
    semanticTokens.get('navigation.header.fallbackBackground').value,
    '{surface.glass.fallbackBackground}',
  );
  assert.equal(
    semanticTokens.get('navigation.panel.backdropFilter').value,
    '{surface.glassElevated.backdropFilter}',
  );
  assert.equal(
    semanticTokens.get('navigation.item.focus.ringColor').value,
    '{surface.interactive.focus.ringColor}',
  );
  assert.equal(semanticTokens.get('navigation.item.active.borderColor').value, 'transparent');
  assert.equal(
    semanticTokens.get('navigation.selector.background').value,
    '{surface.glassSubtle.background}',
  );
  assert.equal(
    semanticTokens.get('navigation.selector.fallbackBackground').value,
    '{surface.glassSubtle.fallbackBackground}',
  );
  assert.match(
    String(semanticTokens.get('navigation.header.materialBackground').value),
    /linear-gradient/,
  );
  assert.match(
    String(semanticTokens.get('navigation.header.materialBackground').value),
    /navigation\.header\.(?:highlightColor|reflectionLavender)/,
  );
  assert.equal(
    semanticTokens.get('navigation.item.active.indicatorWidth').value,
    '{borderWidth.default}',
  );
  assert.equal(
    semanticTokens.get('navigation.selector.itemActiveForeground').value,
    '{text.primary}',
  );
});

test('provides solid fallbacks and global motion and focus aliases for future surfaces', async () => {
  const { semanticTokens } = await loadAndValidateTokens();

  for (const material of ['solid', 'glassSubtle', 'glass', 'glassElevated', 'glassFloating']) {
    const fallback = semanticTokens.get(`surface.${material}.fallbackBackground`);

    assert.ok(fallback, `Missing fallback for ${material}`);
    assert.match(
      String(fallback.value),
      /^\{surface\./,
      `${material} fallback must alias a surface`,
    );
  }

  assert.equal(semanticTokens.get('surface.transition.duration').value, '{motion.duration.fast}');
  assert.equal(semanticTokens.get('surface.transition.easing').value, '{motion.easing.standard}');
  assert.equal(semanticTokens.get('surface.interactive.focus.ringColor').value, '{focus.ring}');
  assert.equal(
    semanticTokens.get('surface.interactive.focus.ringWidth').value,
    '{borderWidth.focus}',
  );
});

test('does not duplicate a third visual token scale for system theme', async () => {
  await assert.rejects(access(path.join(repositoryRoot, 'tokens/themes/system.json')), /ENOENT/);
});

test('generates unique prefixed CSS variables for primitives and semantic themes', async () => {
  const tokens = await loadAndValidateTokens();
  const generatedFiles = getGeneratedFiles(tokens);
  const generatedEntries = await Promise.all(
    [...generatedFiles.keys()].map(async (file) => [file, await readFile(file, 'utf8')]),
  );
  const generated = new Map(generatedEntries);
  const primitivesFile = [...generated.keys()].find((file) => file.endsWith('_primitives.scss'));
  const semanticFile = [...generated.keys()].find((file) => file.endsWith('_semantic.scss'));
  const lightFile = [...generated.keys()].find((file) => file.endsWith('_light-theme.scss'));
  const darkFile = [...generated.keys()].find((file) => file.endsWith('_dark-theme.scss'));
  const primitives = generated.get(primitivesFile);
  const semantic = generated.get(semanticFile);
  const light = generated.get(lightFile);
  const dark = generated.get(darkFile);

  for (const tokenPath of requiredLiquidGlassPrimitivePaths) {
    const variable = primitiveCssName(tokenPath);

    assert.equal(
      countOccurrences(primitives, `${variable}:`),
      1,
      `${variable} must be generated once`,
    );
  }

  for (const tokenPath of requiredLiquidGlassSemanticPaths) {
    const variable = semanticCssName(tokenPath);
    const mapKey = `'${variable.replace('--gh-', '')}':`;

    assert.equal(countOccurrences(semantic, `'${variable.replace('--gh-', '')}',`), 1);
    assert.equal(countOccurrences(light, mapKey), 1, `${variable} must have one light value`);
    assert.equal(countOccurrences(dark, mapKey), 1, `${variable} must have one dark value`);
  }

  for (const tokenPath of requiredButtonSemanticPaths) {
    const variable = semanticCssName(tokenPath);
    const mapKey = `'${variable.replace('--gh-', '')}':`;

    assert.equal(countOccurrences(semantic, `'${variable.replace('--gh-', '')}',`), 1);
    assert.equal(countOccurrences(light, mapKey), 1, `${variable} must have one light value`);
    assert.equal(countOccurrences(dark, mapKey), 1, `${variable} must have one dark value`);
  }

  for (const tokenPath of requiredCardSemanticPaths) {
    const variable = semanticCssName(tokenPath);
    const mapKey = `'${variable.replace('--gh-', '')}':`;

    assert.equal(countOccurrences(semantic, `'${variable.replace('--gh-', '')}',`), 1);
    assert.equal(countOccurrences(light, mapKey), 1, `${variable} must have one light value`);
    assert.equal(countOccurrences(dark, mapKey), 1, `${variable} must have one dark value`);
  }

  for (const tokenPath of requiredFormSemanticPaths) {
    const variable = semanticCssName(tokenPath);
    const mapKey = `'${variable.replace('--gh-', '')}':`;

    assert.equal(countOccurrences(semantic, `'${variable.replace('--gh-', '')}',`), 1);
    assert.equal(countOccurrences(light, mapKey), 1, `${variable} must have one light value`);
    assert.equal(countOccurrences(dark, mapKey), 1, `${variable} must have one dark value`);
  }

  for (const tokenPath of requiredNavigationSemanticPaths) {
    const variable = semanticCssName(tokenPath);
    const mapKey = `'${variable.replace('--gh-', '')}':`;

    assert.equal(countOccurrences(semantic, `'${variable.replace('--gh-', '')}',`), 1);
    assert.equal(countOccurrences(light, mapKey), 1, `${variable} must have one light value`);
    assert.equal(countOccurrences(dark, mapKey), 1, `${variable} must have one dark value`);
  }

  assert.match(semantic, /\$gh-theme-invariant-token-names:/);
  assert.match(semantic, /@mixin apply\(\$tokens, \$include-invariant: true\)/);
  assert.match(light, /semantic\.apply\(\$gh-light-theme, true\)/);
  assert.match(dark, /semantic\.apply\(\$gh-dark-theme, false\)/);

  assert.match(light, /'card-media-aspect-ratio': "16 \/ 9"/);
  assert.match(dark, /'card-media-aspect-ratio': "16 \/ 9"/);

  const allScss = [primitives, semantic, light, dark].join('\n');

  assert.doesNotMatch(
    allScss,
    /\{[a-z][A-Za-z0-9]*(?:\.[A-Za-z0-9]+)+\}/,
    'Generated output contains an unresolved alias',
  );
  assert.doesNotMatch(allScss, /\b(?:undefined|null)\b/i);
  assert.doesNotMatch(allScss, /(?:^|[:\s])placeholder(?:[;\s]|$)/im);
});

test('serializes compound Navigation shadows without breaking generated Sass maps', async () => {
  const tokens = await loadAndValidateTokens();
  const files = getGeneratedFiles(tokens);
  const lightTheme = files.get(
    path.join(
      repositoryRoot,
      'angular-design-system/projects/gh-design-system/src/lib/styles/themes/_light-theme.scss',
    ),
  );

  assert.match(lightTheme, /'navigation-header-inner-shadow':\s*"inset 0 1px 0[^\n]+"/);
  assert.doesNotMatch(lightTheme, /'navigation-header-inner-shadow':\s*inset[^\n]+color-mix/);
});

test('keeps shared primitive durations positive and typed visual values non-empty', async () => {
  const { primitiveTokens } = await loadAndValidateTokens();

  for (const token of primitiveTokens.values()) {
    assert.notEqual(String(token.value).trim(), '', `${token.path} must not be empty`);

    if (token.type === 'duration') {
      const match = String(token.value).match(/^(\d*\.?\d+)(ms|s)$/);

      assert.ok(match, `${token.path} must be a CSS duration`);
      assert.ok(Number.parseFloat(match[1]) > 0, `${token.path} duration must be positive`);
    }

    if (token.type === 'color') {
      assert.match(
        String(token.value),
        /^(?:#[\da-f]{3,8}|(?:rgb|color-mix)\(|\{color\.)/i,
        `${token.path} must use a supported color expression`,
      );
    }

    if (token.type === 'shadow') {
      assert.doesNotMatch(String(token.value), /undefined|null|placeholder/i);
    }
  }
});
