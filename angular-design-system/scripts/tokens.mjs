import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import ts from 'typescript';

const workspaceRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const repositoryRoot = path.resolve(workspaceRoot, '..');
const tokensRoot = path.join(repositoryRoot, 'tokens');
const stylesRoot = path.join(workspaceRoot, 'projects/gh-design-system/src/lib/styles');
const showcaseDataFile = path.join(
  workspaceRoot,
  'projects/showcase/src/app/shared/data/foundation-tokens.generated.ts',
);

const primitiveFiles = [
  'colors.json',
  'spacing.json',
  'radii.json',
  'borders.json',
  'layout.json',
  'shadows.json',
  'typography.json',
  'motion.json',
];

const typographyCategories = new Set([
  'fontFamily',
  'fontSize',
  'fontWeight',
  'lineHeight',
  'letterSpacing',
]);

const requiredSemanticPaths = [
  'background.primary',
  'background.secondary',
  'background.subtle',
  'surface.primary',
  'surface.secondary',
  'surface.elevated',
  'text.primary',
  'text.secondary',
  'text.muted',
  'text.inverse',
  'text.accent',
  'border.default',
  'border.subtle',
  'border.strong',
  'action.primary.background',
  'action.primary.text',
  'action.primary.hover',
  'action.primary.active',
  'action.primary.border',
  'action.secondary.background',
  'action.secondary.text',
  'action.secondary.hover',
  'action.secondary.active',
  'action.secondary.border',
  'action.ghost.text',
  'action.ghost.hover',
  'action.ghost.active',
  'action.danger.background',
  'action.danger.text',
  'action.danger.hover',
  'action.danger.active',
  'action.danger.border',
  'action.disabled.background',
  'action.disabled.text',
  'action.disabled.border',
  'status.neutral.background',
  'status.neutral.text',
  'status.neutral.border',
  'status.neutral.solidBackground',
  'status.neutral.solidText',
  'status.info.background',
  'status.info.text',
  'status.info.border',
  'status.info.solidBackground',
  'status.info.solidText',
  'status.success.background',
  'status.success.text',
  'status.success.border',
  'status.success.solidBackground',
  'status.success.solidText',
  'status.warning.background',
  'status.warning.text',
  'status.warning.border',
  'status.warning.solidBackground',
  'status.warning.solidText',
  'status.danger.background',
  'status.danger.text',
  'status.danger.border',
  'status.danger.solidBackground',
  'status.danger.solidText',
  'status.accent.background',
  'status.accent.text',
  'status.accent.border',
  'status.accent.solidBackground',
  'status.accent.solidText',
  'tag.neutral.hover',
  'tag.neutral.active',
  'tag.neutral.selectedBackground',
  'tag.neutral.selectedText',
  'tag.neutral.selectedBorder',
  'tag.neutral.removeHover',
  'tag.accent.hover',
  'tag.accent.active',
  'tag.accent.selectedBackground',
  'tag.accent.selectedText',
  'tag.accent.selectedBorder',
  'tag.accent.removeHover',
  'tag.info.hover',
  'tag.info.active',
  'tag.info.selectedBackground',
  'tag.info.selectedText',
  'tag.info.selectedBorder',
  'tag.info.removeHover',
  'focus.ring',
  'selection.background',
  'selection.text',
  'shadow.small',
  'shadow.medium',
  'shadow.large',
];

const referencePattern = /\{([^{}]+)\}/g;
const supportedTokenTypes = new Set([
  'color',
  'cubicBezier',
  'dimension',
  'duration',
  'fontFamily',
  'fontWeight',
  'number',
  'shadow',
]);

class TokenValidationError extends Error {}

async function loadJson(relativePath) {
  const absolutePath = path.join(tokensRoot, relativePath);
  const sourceText = await readFile(absolutePath, 'utf8');
  const sourceFile = ts.parseJsonText(absolutePath, sourceText);
  const errors = [];

  for (const diagnostic of sourceFile.parseDiagnostics) {
    const location =
      diagnostic.start === undefined
        ? relativePath
        : formatLocation(sourceFile, diagnostic.start, relativePath);
    errors.push(`${location}: ${ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n')}`);
  }

  detectDuplicateKeys(sourceFile, relativePath, errors);

  if (errors.length > 0) {
    throw new TokenValidationError(errors.join('\n'));
  }

  return {
    data: JSON.parse(sourceText),
    relativePath,
  };
}

function formatLocation(sourceFile, position, relativePath) {
  const { line, character } = sourceFile.getLineAndCharacterOfPosition(position);
  return `${relativePath}:${line + 1}:${character + 1}`;
}

function detectDuplicateKeys(sourceFile, relativePath, errors) {
  const visit = (node) => {
    if (ts.isObjectLiteralExpression(node)) {
      const keys = new Map();

      for (const property of node.properties) {
        if (!ts.isPropertyAssignment(property)) {
          continue;
        }

        const key = getPropertyName(property.name);

        if (key !== null) {
          const previous = keys.get(key);

          if (previous !== undefined) {
            errors.push(
              `${formatLocation(sourceFile, property.name.getStart(sourceFile), relativePath)}: ` +
                `duplicate key "${key}" (first declared at ${formatLocation(
                  sourceFile,
                  previous,
                  relativePath,
                )})`,
            );
          } else {
            keys.set(key, property.name.getStart(sourceFile));
          }
        }
      }
    }

    ts.forEachChild(node, visit);
  };

  visit(sourceFile);
}

function getPropertyName(name) {
  if (ts.isStringLiteral(name) || ts.isNumericLiteral(name) || ts.isIdentifier(name)) {
    return name.text;
  }

  return null;
}

function collectTokens(node, file, currentPath = [], tokens = new Map()) {
  if (!isPlainObject(node)) {
    return tokens;
  }

  if (Object.hasOwn(node, '$value')) {
    const tokenPath = currentPath.join('.');

    if (!tokenPath) {
      throw new TokenValidationError(`${file}: token found without a path`);
    }

    if (!Object.hasOwn(node, '$type')) {
      throw new TokenValidationError(`${file}: ${tokenPath} is missing "$type"`);
    }

    if (!supportedTokenTypes.has(node.$type)) {
      throw new TokenValidationError(`${file}: ${tokenPath} uses unsupported type "${node.$type}"`);
    }

    if (typeof node.$value !== 'string' && typeof node.$value !== 'number') {
      throw new TokenValidationError(`${file}: ${tokenPath} must use a string or number "$value"`);
    }

    for (const property of Object.keys(node)) {
      if (!['$description', '$type', '$value'].includes(property)) {
        throw new TokenValidationError(
          `${file}: ${tokenPath} contains unsupported property "${property}"`,
        );
      }
    }

    if (tokens.has(tokenPath)) {
      throw new TokenValidationError(`${file}: duplicate token path ${tokenPath}`);
    }

    tokens.set(tokenPath, {
      file,
      path: tokenPath,
      type: node.$type,
      value: node.$value,
    });

    return tokens;
  }

  for (const [key, value] of Object.entries(node)) {
    if (key === 'theme') {
      continue;
    }

    if (!isValidTokenKey(key)) {
      throw new TokenValidationError(
        `${file}: "${[...currentPath, key].join('.')}" uses an unpredictable key`,
      );
    }

    collectTokens(value, file, [...currentPath, key], tokens);
  }

  return tokens;
}

function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function isValidTokenKey(key) {
  return /^[a-z][A-Za-z0-9]*$/.test(key) || /^[0-9]+xl$/.test(key);
}

function mergeTokenMaps(target, source) {
  for (const [tokenPath, token] of source) {
    if (target.has(tokenPath)) {
      const existing = target.get(tokenPath);
      throw new TokenValidationError(`${token.file}: ${tokenPath} duplicates ${existing.file}`);
    }

    target.set(tokenPath, token);
  }

  return target;
}

function getReferences(value) {
  if (typeof value !== 'string') {
    return [];
  }

  return [...value.matchAll(referencePattern)].map((match) => match[1]);
}

function validateReferences(tokens, availableTokens) {
  for (const token of tokens.values()) {
    for (const reference of getReferences(token.value)) {
      if (!availableTokens.has(reference)) {
        throw new TokenValidationError(
          `${token.file}: ${token.path} references missing token {${reference}}`,
        );
      }
    }
  }
}

function validateReferenceCycles(tokens) {
  const visit = (tokenPath, stack = []) => {
    if (stack.includes(tokenPath)) {
      throw new TokenValidationError(
        `Circular token reference: ${[...stack, tokenPath].join(' -> ')}`,
      );
    }

    const token = tokens.get(tokenPath);

    if (!token) {
      return;
    }

    for (const reference of getReferences(token.value)) {
      if (tokens.has(reference)) {
        visit(reference, [...stack, tokenPath]);
      }
    }
  };

  for (const tokenPath of tokens.keys()) {
    visit(tokenPath);
  }
}

function validateThemeMetadata(lightTheme, darkTheme) {
  if (lightTheme.theme?.name !== 'light') {
    throw new TokenValidationError('themes/light.json: theme.name must be "light"');
  }

  if (lightTheme.theme?.extends !== '../semantic-tokens.json') {
    throw new TokenValidationError(
      'themes/light.json: theme.extends must reference ../semantic-tokens.json',
    );
  }

  if (darkTheme.theme?.name !== 'dark') {
    throw new TokenValidationError('themes/dark.json: theme.name must be "dark"');
  }
}

function validateSemanticCoverage(semanticTokens, darkTokens) {
  for (const tokenPath of requiredSemanticPaths) {
    if (!semanticTokens.has(tokenPath)) {
      throw new TokenValidationError(
        `semantic-tokens.json: required semantic token ${tokenPath} is missing`,
      );
    }

    if (!darkTokens.has(tokenPath)) {
      throw new TokenValidationError(
        `themes/dark.json: required semantic token ${tokenPath} is missing`,
      );
    }
  }

  for (const tokenPath of semanticTokens.keys()) {
    if (!darkTokens.has(tokenPath)) {
      throw new TokenValidationError(
        `themes/dark.json: semantic token ${tokenPath} has no dark-theme value`,
      );
    }
  }

  for (const tokenPath of darkTokens.keys()) {
    if (!semanticTokens.has(tokenPath)) {
      throw new TokenValidationError(
        `themes/dark.json: ${tokenPath} does not exist in semantic-tokens.json`,
      );
    }
  }
}

function toKebabCase(value) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/_/g, '-')
    .toLowerCase();
}

function compactScaleName(value) {
  return (
    {
      large: 'lg',
      medium: 'md',
      small: 'sm',
    }[value] ?? value
  );
}

function primitiveCssName(tokenPath) {
  const [category, ...segments] = tokenPath.split('.');
  const suffix = segments.map((segment) => toKebabCase(segment)).join('-');

  switch (category) {
    case 'spacing':
      return `--gh-space-${suffix}`;
    case 'shadowPrimitive':
      return `--gh-shadow-primitive-${compactScaleName(suffix)}`;
    case 'borderWidth':
      return `--gh-border-width-${suffix}`;
    default:
      return `--gh-${toKebabCase(category)}-${suffix}`;
  }
}

function semanticCssName(tokenPath) {
  const [category, ...segments] = tokenPath.split('.');
  const suffix =
    category === 'shadow'
      ? segments.map((segment) => compactScaleName(toKebabCase(segment))).join('-')
      : segments.map(toKebabCase).join('-');

  return `--gh-${toKebabCase(category)}-${suffix}`;
}

function cssValue(value, primitiveTokens) {
  if (typeof value === 'number') {
    return String(value);
  }

  if (typeof value !== 'string') {
    throw new TokenValidationError(
      `Unsupported token value ${JSON.stringify(value)}; expected a string or number`,
    );
  }

  return value.replace(referencePattern, (_, reference) => {
    if (!primitiveTokens.has(reference)) {
      throw new TokenValidationError(
        `Only primitive references can be emitted to CSS: {${reference}}`,
      );
    }

    return `var(${primitiveCssName(reference)})`;
  });
}

function renderPrimitiveFile(tokens) {
  const groups = new Map();

  for (const token of tokens.values()) {
    const [category] = token.path.split('.');

    if (typographyCategories.has(category)) {
      continue;
    }

    const group = groups.get(category) ?? [];
    group.push(token);
    groups.set(category, group);
  }

  const lines = [
    '// Generated by scripts/tokens.mjs from /tokens. Do not edit manually.',
    ':root {',
  ];

  for (const [category, group] of groups) {
    lines.push(`  /* ${toKebabCase(category)} */`);

    for (const token of group) {
      lines.push(`  ${primitiveCssName(token.path)}: ${cssValue(token.value, tokens)};`);
    }

    lines.push('');
  }

  if (lines.at(-1) === '') {
    lines.pop();
  }

  lines.push('}', '');
  return lines.join('\n');
}

function renderTypographyFile(tokens) {
  const lines = [
    '// Generated by scripts/tokens.mjs from /tokens/primitives/typography.json.',
    '// Font files are intentionally loaded by consuming applications.',
    ':root {',
  ];

  let previousCategory = null;

  for (const token of tokens.values()) {
    const [category] = token.path.split('.');

    if (!typographyCategories.has(category)) {
      continue;
    }

    if (previousCategory !== null && previousCategory !== category) {
      lines.push('');
    }

    lines.push(`  ${primitiveCssName(token.path)}: ${cssValue(token.value, tokens)};`);
    previousCategory = category;
  }

  lines.push('}', '');
  return lines.join('\n');
}

function renderSemanticContract(tokens) {
  const names = [...tokens.keys()].map((tokenPath) =>
    semanticCssName(tokenPath).replace('--gh-', ''),
  );
  const lines = [
    '// Generated by scripts/tokens.mjs from /tokens/semantic-tokens.json.',
    "@use 'sass:map';",
    '',
    '$gh-semantic-token-names: (',
    ...names.map((name) => `  '${name}',`),
    ');',
    '',
    '@mixin apply($tokens) {',
    '  @each $name in $gh-semantic-token-names {',
    '    @if not map.has-key($tokens, $name) {',
    "      @error 'Missing semantic theme value: #{$name}';",
    '    }',
    '',
    '    --gh-#{$name}: #{map.get($tokens, $name)};',
    '  }',
    '}',
    '',
  ];

  return lines.join('\n');
}

function renderThemeFile(themeName, tokens, primitiveTokens) {
  const mapName = `$gh-${themeName}-theme`;
  const lines = [
    `// Generated by scripts/tokens.mjs from /tokens/${
      themeName === 'light' ? 'semantic-tokens.json' : 'themes/dark.json'
    }.`,
    "@use '../tokens/semantic' as semantic;",
    '',
    `${mapName}: (`,
  ];

  for (const token of tokens.values()) {
    const name = semanticCssName(token.path).replace('--gh-', '');
    lines.push(`  '${name}': ${cssValue(token.value, primitiveTokens)},`);
  }

  lines.push(
    ');',
    '',
    `@mixin apply-${themeName}-theme {`,
    `  color-scheme: ${themeName};`,
    `  @include semantic.apply(${mapName});`,
    '}',
    '',
  );

  if (themeName === 'light') {
    lines.push(':root,', ":root[data-theme='light'] {", '  @include apply-light-theme;', '}', '');
  } else {
    lines.push(
      ":root[data-theme='dark'] {",
      '  @include apply-dark-theme;',
      '}',
      '',
      '@media (prefers-color-scheme: dark) {',
      '  :root:not([data-theme]) {',
      '    @include apply-dark-theme;',
      '  }',
      '}',
      '',
    );
  }

  return lines.join('\n');
}

function getToken(tokens, tokenPath) {
  const token = tokens.get(tokenPath);

  if (!token) {
    throw new TokenValidationError(`Required showcase token ${tokenPath} is missing`);
  }

  return token;
}

function tokenId(tokenPath) {
  return tokenPath.split('.').at(-1);
}

function renderGeneratedArray(name, items) {
  return [
    `export const ${name} = [`,
    ...items.flatMap((item) => [
      '  {',
      ...Object.entries(item).map(([key, value]) => `    ${key}: ${toTypeScriptLiteral(value)},`),
      '  },',
    ]),
    '] as const;',
    '',
  ];
}

function toTypeScriptLiteral(value) {
  if (typeof value === 'string') {
    return `'${value.replaceAll('\\', '\\\\').replaceAll("'", "\\'")}'`;
  }

  return JSON.stringify(value);
}

function renderShowcaseTokenData(tokens) {
  const colorLabels = {
    cloudBlue: 'Cloud Blue',
    ink: 'Deep Ink',
    ivory: 'Ivory',
    lavender: 'Lavender Mist',
    mint: 'Mint',
    peach: 'Soft Peach',
    sand: 'Warm Sand',
    sky: 'Sky',
    white: 'White',
  };
  const colorTokens = [...tokens.primitiveTokens.values()]
    .filter((token) => token.path.startsWith('color.'))
    .map((token) => {
      const id = tokenId(token.path);
      return {
        id,
        name: colorLabels[id] ?? id,
        tokenPath: token.path,
        cssVariable: primitiveCssName(token.path),
        cssValue: `var(${primitiveCssName(token.path)})`,
        value: token.value,
        category: id === 'white' ? 'supporting' : 'brand',
      };
    });
  const spacingTokens = [...tokens.primitiveTokens.values()]
    .filter((token) => token.path.startsWith('spacing.'))
    .map((token) => ({
      id: tokenId(token.path),
      name: `space-${tokenId(token.path)}`,
      tokenPath: token.path,
      cssVariable: primitiveCssName(token.path),
      cssValue: `var(${primitiveCssName(token.path)})`,
      value: token.value,
    }));
  const radiusTokens = [...tokens.primitiveTokens.values()]
    .filter((token) => token.path.startsWith('radius.'))
    .map((token) => ({
      id: tokenId(token.path),
      name: `radius-${tokenId(token.path)}`,
      tokenPath: token.path,
      cssVariable: primitiveCssName(token.path),
      cssValue: `var(${primitiveCssName(token.path)})`,
      value: token.value,
    }));
  const shadowTokens = ['small', 'medium', 'large'].map((scale) => {
    const primitive = getToken(tokens.primitiveTokens, `shadowPrimitive.${scale}`);
    const semanticPath = `shadow.${scale}`;
    const cssVariable = semanticCssName(semanticPath);

    return {
      id: compactScaleName(scale),
      name: `shadow-${compactScaleName(scale)}`,
      tokenPath: semanticPath,
      cssVariable,
      cssValue: `var(${cssVariable})`,
      value: primitive.value,
    };
  });
  const typographyRoles = [
    {
      id: 'hero',
      name: 'Display / Hero',
      sample: 'Think bigger. Build smarter.',
      family: 'fontFamily.display',
      size: 'fontSize.hero',
      weight: 'fontWeight.semibold',
      lineHeight: 'lineHeight.tight',
      letterSpacing: 'letterSpacing.display',
    },
    {
      id: 'h1',
      name: 'Heading 1',
      sample: 'Engineering with clarity.',
      family: 'fontFamily.display',
      size: 'fontSize.h1',
      weight: 'fontWeight.semibold',
      lineHeight: 'lineHeight.heading',
      letterSpacing: 'letterSpacing.display',
    },
    {
      id: 'h2',
      name: 'Heading 2',
      sample: 'Calm technology.',
      family: 'fontFamily.display',
      size: 'fontSize.h2',
      weight: 'fontWeight.semibold',
      lineHeight: 'lineHeight.heading',
      letterSpacing: 'letterSpacing.tight',
    },
    {
      id: 'h3',
      name: 'Heading 3',
      sample: 'Modern engineering.',
      family: 'fontFamily.display',
      size: 'fontSize.h3',
      weight: 'fontWeight.semibold',
      lineHeight: 'lineHeight.heading',
      letterSpacing: 'letterSpacing.tight',
    },
    {
      id: 'bodyLarge',
      name: 'Body Large',
      sample: 'Helping teams build better software through engineering, leadership and AI.',
      family: 'fontFamily.body',
      size: 'fontSize.bodyLarge',
      weight: 'fontWeight.regular',
      lineHeight: 'lineHeight.body',
      letterSpacing: 'letterSpacing.normal',
    },
    {
      id: 'body',
      name: 'Body',
      sample: 'Helping teams build better software through engineering, leadership and AI.',
      family: 'fontFamily.body',
      size: 'fontSize.body',
      weight: 'fontWeight.regular',
      lineHeight: 'lineHeight.body',
      letterSpacing: 'letterSpacing.normal',
    },
    {
      id: 'caption',
      name: 'Caption',
      sample: 'Frontend Tech Lead & AI-Augmented Engineer',
      family: 'fontFamily.body',
      size: 'fontSize.caption',
      weight: 'fontWeight.regular',
      lineHeight: 'lineHeight.body',
      letterSpacing: 'letterSpacing.normal',
    },
    {
      id: 'label',
      name: 'Label',
      sample: 'DESIGN SYSTEM',
      family: 'fontFamily.body',
      size: 'fontSize.label',
      weight: 'fontWeight.semibold',
      lineHeight: 'lineHeight.heading',
      letterSpacing: 'letterSpacing.wide',
    },
  ];
  const typographyTokens = typographyRoles.map((role) => {
    const family = getToken(tokens.primitiveTokens, role.family);
    const size = getToken(tokens.primitiveTokens, role.size);
    const weight = getToken(tokens.primitiveTokens, role.weight);
    const lineHeight = getToken(tokens.primitiveTokens, role.lineHeight);
    const letterSpacing = getToken(tokens.primitiveTokens, role.letterSpacing);

    return {
      id: role.id,
      name: role.name,
      sample: role.sample,
      familyVariable: primitiveCssName(family.path),
      familyCssValue: `var(${primitiveCssName(family.path)})`,
      familyValue: family.value,
      sizeVariable: primitiveCssName(size.path),
      sizeCssValue: `var(${primitiveCssName(size.path)})`,
      sizeValue: size.value,
      weightVariable: primitiveCssName(weight.path),
      weightCssValue: `var(${primitiveCssName(weight.path)})`,
      weightValue: String(weight.value),
      lineHeightVariable: primitiveCssName(lineHeight.path),
      lineHeightCssValue: `var(${primitiveCssName(lineHeight.path)})`,
      lineHeightValue: String(lineHeight.value),
      letterSpacingVariable: primitiveCssName(letterSpacing.path),
      letterSpacingCssValue: `var(${primitiveCssName(letterSpacing.path)})`,
      letterSpacingValue: letterSpacing.value,
    };
  });

  return [
    '// Generated by scripts/tokens.mjs from /tokens. Do not edit manually.',
    '',
    ...renderGeneratedArray('PRIMITIVE_COLOR_TOKENS', colorTokens),
    ...renderGeneratedArray('TYPOGRAPHY_TOKENS', typographyTokens),
    ...renderGeneratedArray('SPACING_TOKENS', spacingTokens),
    ...renderGeneratedArray('RADIUS_TOKENS', radiusTokens),
    ...renderGeneratedArray('SHADOW_TOKENS', shadowTokens),
  ].join('\n');
}

async function loadAndValidateTokens() {
  const primitiveTokens = new Map();

  for (const file of primitiveFiles) {
    const parsed = await loadJson(path.join('primitives', file));
    mergeTokenMaps(primitiveTokens, collectTokens(parsed.data, parsed.relativePath));
  }

  const semanticFile = await loadJson('semantic-tokens.json');
  const semanticTokens = collectTokens(semanticFile.data, semanticFile.relativePath);
  const lightFile = await loadJson(path.join('themes', 'light.json'));
  const darkFile = await loadJson(path.join('themes', 'dark.json'));
  const darkTokens = collectTokens(darkFile.data, darkFile.relativePath);
  const availableTokens = new Map([...primitiveTokens, ...semanticTokens]);

  validateReferences(primitiveTokens, primitiveTokens);
  validateReferences(semanticTokens, primitiveTokens);
  validateReferences(darkTokens, availableTokens);
  validateReferenceCycles(availableTokens);
  validateThemeMetadata(lightFile.data, darkFile.data);
  validateSemanticCoverage(semanticTokens, darkTokens);

  return {
    darkTokens,
    primitiveTokens,
    semanticTokens,
  };
}

function getGeneratedFiles(tokens) {
  return new Map([
    [path.join(stylesRoot, 'tokens/_primitives.scss'), renderPrimitiveFile(tokens.primitiveTokens)],
    [
      path.join(stylesRoot, 'tokens/_typography.scss'),
      renderTypographyFile(tokens.primitiveTokens),
    ],
    [path.join(stylesRoot, 'tokens/_semantic.scss'), renderSemanticContract(tokens.semanticTokens)],
    [
      path.join(stylesRoot, 'themes/_light-theme.scss'),
      renderThemeFile('light', tokens.semanticTokens, tokens.primitiveTokens),
    ],
    [
      path.join(stylesRoot, 'themes/_dark-theme.scss'),
      renderThemeFile('dark', tokens.darkTokens, tokens.primitiveTokens),
    ],
    [showcaseDataFile, renderShowcaseTokenData(tokens)],
  ]);
}

async function generate(files) {
  for (const [file, contents] of files) {
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, contents, 'utf8');
  }
}

async function checkGeneratedFiles(files) {
  const mismatches = [];

  for (const [file, expected] of files) {
    let current = null;

    try {
      current = await readFile(file, 'utf8');
    } catch {
      // Report missing generated files with the same actionable message.
    }

    if (current !== expected) {
      mismatches.push(path.relative(workspaceRoot, file));
    }
  }

  if (mismatches.length > 0) {
    throw new TokenValidationError(
      `Generated token styles are out of date:\n${mismatches
        .map((file) => `- ${file}`)
        .join('\n')}\nRun "npm run tokens:generate".`,
    );
  }
}

async function main() {
  const command = process.argv[2] ?? 'check';
  const tokens = await loadAndValidateTokens();
  const generatedFiles = getGeneratedFiles(tokens);

  if (command === 'generate') {
    await generate(generatedFiles);
    console.log(`Generated ${generatedFiles.size} derived token files.`);
    return;
  }

  if (command === 'validate') {
    console.log(
      `Validated ${primitiveFiles.length + 3} JSON files, ` +
        `${tokens.primitiveTokens.size} primitive tokens and ` +
        `${tokens.semanticTokens.size} semantic tokens.`,
    );
    return;
  }

  if (command === 'check') {
    await checkGeneratedFiles(generatedFiles);
    console.log('Token JSON and generated token files are valid and synchronized.');
    return;
  }

  throw new TokenValidationError(`Unknown command "${command}". Use validate, generate or check.`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
