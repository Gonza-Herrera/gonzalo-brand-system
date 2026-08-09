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
  'glass.json',
  'ambient.json',
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
  'card.background',
  'card.backgroundSubtle',
  'card.backgroundGlass',
  'card.border',
  'card.borderGlass',
  'card.borderHover',
  'card.borderSelected',
  'card.backgroundSelected',
  'card.shadow',
  'card.shadowHover',
  'card.glassBlur',
  'focus.ring',
  'selection.background',
  'selection.text',
  'shadow.small',
  'shadow.medium',
  'shadow.large',
];

const liquidGlassMaterialProperties = [
  'background',
  'fallbackBackground',
  'borderColor',
  'borderWidth',
  'borderHighlight',
  'backdropFilter',
  'shadow',
  'innerShadow',
  'foreground',
  'mutedForeground',
  'radius',
];

export const requiredLiquidGlassPrimitivePaths = [
  ...['none', 'xs', 'sm', 'md', 'lg', 'xl'].map((scale) => `glass.blur.${scale}`),
  ...['none', 'subtle', 'default', 'strong'].map((scale) => `glass.saturation.${scale}`),
  ...['subtle', 'default', 'strong'].flatMap((scale) => [
    `glass.opacity.surface.${scale}`,
    `glass.opacity.border.${scale}`,
    `glass.opacity.highlight.${scale}`,
    `glass.opacity.overlay.${scale}`,
  ]),
  'glass.opacity.disabled',
  ...['subtle', 'default', 'strong'].map((scale) => `glass.highlight.${scale}`),
  ...['none', 'subtle', 'default'].map((scale) => `glass.innerShadow.${scale}`),
];

export const requiredLiquidGlassSemanticPaths = [
  'surface.base.background',
  'surface.base.foreground',
  ...liquidGlassMaterialProperties.map((property) => `surface.solid.${property}`),
  ...['glassSubtle', 'glass', 'glassElevated', 'glassFloating'].flatMap((material) =>
    liquidGlassMaterialProperties.map((property) => `surface.${material}.${property}`),
  ),
  'surface.overlay.background',
  'surface.overlay.fallbackBackground',
  'surface.overlay.backdropFilter',
  ...['hover', 'active', 'selected'].flatMap((state) => [
    `surface.interactive.${state}.background`,
    `surface.interactive.${state}.borderColor`,
    `surface.interactive.${state}.shadow`,
  ]),
  'surface.interactive.focus.ringColor',
  'surface.interactive.focus.ringWidth',
  'surface.interactive.focus.ringOffset',
  'surface.interactive.focus.shadow',
  'surface.disabled.background',
  'surface.disabled.borderColor',
  'surface.disabled.foreground',
  'surface.disabled.opacity',
  'surface.disabled.shadow',
  'surface.transition.duration',
  'surface.transition.easing',
  'surface.radius.subtle',
  'surface.radius.default',
  'surface.radius.elevated',
  'surface.radius.floating',
];

export const requiredAmbientPrimitivePaths = ['subtle', 'default', 'strong'].map(
  (intensity) => `ambient.opacity.${intensity}`,
);

export const requiredAmbientSemanticPaths = [
  'ambient.background.base',
  'ambient.background.none',
  ...['none', 'subtle', 'brand', 'cool', 'warm'].map((preset) => `ambient.preset.${preset}`),
  ...['subtle', 'default', 'strong'].map((intensity) => `ambient.intensity.${intensity}`),
];

const buttonMaterialProperties = [
  'background',
  'fallbackBackground',
  'foreground',
  'borderColor',
  'borderHighlight',
  'backdropFilter',
  'shadow',
  'innerShadow',
  'hover.background',
  'hover.borderColor',
  'hover.shadow',
  'active.background',
  'active.borderColor',
  'active.shadow',
];

const buttonStructuralProperties = [
  ...['sm', 'md', 'lg'].flatMap((size) => [
    `height.${size}`,
    `paddingBlock.${size}`,
    `paddingInline.${size}`,
    `gap.${size}`,
    `fontSize.${size}`,
    `iconSize.${size}`,
  ]),
  'radius',
  'borderWidth',
  'fontFamily',
  'fontWeight',
  'lineHeight',
  'focus.ringColor',
  'focus.ringWidth',
  'focus.ringOffset',
  'transition.duration',
  'transition.easing',
  'activeOffset',
  'spinner.borderWidth',
  'spinner.radius',
  'spinner.duration',
  'spinner.trackColor',
  'spinner.easing',
  'disabled.background',
  'disabled.foreground',
  'disabled.borderColor',
  'disabled.shadow',
];

const iconButtonStructuralProperties = [
  ...['sm', 'md', 'lg'].flatMap((size) => [`size.${size}`, `iconSize.${size}`]),
  'padding',
  'radius',
  'borderWidth',
  'focus.ringColor',
  'focus.ringWidth',
  'focus.ringOffset',
  'transition.duration',
  'transition.easing',
  'activeOffset',
  'spinner.borderWidth',
  'spinner.radius',
  'spinner.duration',
  'spinner.trackColor',
  'spinner.easing',
  'disabled.background',
  'disabled.foreground',
  'disabled.borderColor',
  'disabled.shadow',
];

export const requiredButtonSemanticPaths = [
  ...buttonStructuralProperties.map((property) => `button.${property}`),
  ...['primary', 'secondary', 'tertiary', 'ghost', 'danger'].flatMap((variant) =>
    buttonMaterialProperties.map((property) => `button.${variant}.${property}`),
  ),
  ...iconButtonStructuralProperties.map((property) => `iconButton.${property}`),
  ...['primary', 'secondary', 'ghost', 'danger'].flatMap((variant) =>
    buttonMaterialProperties.map((property) => `iconButton.${variant}.${property}`),
  ),
];

const cardMaterialProperties = [
  'background',
  'fallbackBackground',
  'materialBackground',
  'fallbackMaterialBackground',
  'reflectionBackground',
  'foreground',
  'mutedForeground',
  'borderColor',
  'borderWidth',
  'borderHighlight',
  'innerBorderColor',
  'dividerColor',
  'backdropFilter',
  'shadow',
  'innerShadow',
];

const cardStructuralProperties = [
  ...['none', 'sm', 'md', 'lg'].map((size) => `padding.${size}`),
  ...[
    'body',
    'header',
    'content',
    'footer',
    'footerOffset',
    'actions',
    'metadata',
    'tags',
    'tagsCompact',
    'section',
  ].map((name) => `gap.${name}`),
  ...['sm', 'md', 'lg', 'xl'].map((size) => `radius.${size}`),
  'transition.duration',
  'transition.easing',
  'activeOffset',
  'title.foreground',
  'title.fontFamily',
  'title.fontSize',
  'title.lineHeight',
  'title.letterSpacing',
  'body.foreground',
  'metadata.foreground',
  'metadata.fontSize',
  'metadata.emphasisFontWeight',
  'link.foreground',
  'link.hoverForeground',
  'link.fontWeight',
  'link.focusRingColor',
  'link.focusRingWidth',
  'link.focusRingOffset',
  'link.focusRadius',
  'media.background',
  'media.aspectRatio',
  'media.horizontalMinHeight',
  'logo.size',
  'logo.background',
  'logo.borderColor',
  'logo.borderWidth',
  'logo.radius',
  'section.headingFontSize',
  'section.listPaddingInlineStart',
  'interactive.hover.background',
  'interactive.hover.borderColor',
  'interactive.hover.shadow',
  'interactive.active.background',
  'interactive.active.borderColor',
  'interactive.active.shadow',
  'interactive.focus.ringColor',
  'interactive.focus.ringWidth',
  'interactive.focus.ringOffset',
  'interactive.focus.shadow',
  'selected.background',
  'selected.borderColor',
  'selected.shadow',
  'selected.ringWidth',
  'selected.ringOffset',
];

export const requiredCardSemanticPaths = [
  ...cardStructuralProperties.map((property) => `card.${property}`),
  ...['outlined', 'subtle', 'glass', 'elevated'].flatMap((variant) =>
    cardMaterialProperties.map((property) => `card.${variant}.${property}`),
  ),
];

const formFieldProperties = [
  'gap',
  'groupGap',
  'label.foreground',
  'label.fontSize',
  'label.fontWeight',
  'label.lineHeight',
  'requiredForeground',
  'hint.foreground',
  'hint.fontSize',
  'error.foreground',
  'error.fontSize',
  'error.fontWeight',
];

const formControlProperties = [
  'height',
  'paddingInline',
  'gap',
  'radius',
  'borderWidth',
  'fontSize',
  'lineHeight',
  'background',
  'foreground',
  'placeholderForeground',
  'borderColor',
  'shadow',
  'innerShadow',
  'hover.background',
  'hover.borderColor',
  'focus.background',
  'focus.borderColor',
  'focus.ringColor',
  'focus.ringWidth',
  'focus.ringOffset',
  'focus.shadow',
  'invalid.background',
  'invalid.borderColor',
  'invalid.foreground',
  'invalid.ringColor',
  'disabled.background',
  'disabled.borderColor',
  'disabled.foreground',
  'disabled.placeholderForeground',
  'readonly.background',
  'readonly.borderColor',
  'readonly.foreground',
  'transition.duration',
  'transition.easing',
  'iconSize',
  'iconForeground',
  'textareaMinHeight',
];

const choiceControlProperties = [
  'size',
  'targetSize',
  'gap',
  'borderWidth',
  'checkboxRadius',
  'radioRadius',
  'background',
  'borderColor',
  'indicator',
  'hover.background',
  'hover.borderColor',
  'focus.ringColor',
  'focus.ringWidth',
  'focus.ringOffset',
  'checked.background',
  'checked.borderColor',
  'checked.indicator',
  'invalid.borderColor',
  'invalid.ringColor',
  'disabled.background',
  'disabled.borderColor',
  'disabled.indicator',
  'disabled.label',
  'transition.duration',
  'transition.easing',
];

const switchControlProperties = [
  'trackWidth',
  'trackHeight',
  'thumbSize',
  'thumbInset',
  'targetSize',
  'borderWidth',
  'radius',
  'background',
  'borderColor',
  'thumbBackground',
  'thumbShadow',
  'hover.background',
  'hover.borderColor',
  'checked.background',
  'checked.borderColor',
  'checked.thumbBackground',
  'disabled.background',
  'disabled.borderColor',
  'disabled.thumbBackground',
  'disabled.label',
];

export const requiredFormSemanticPaths = [
  ...formFieldProperties.map((property) => `formField.${property}`),
  ...formControlProperties.map((property) => `formControl.${property}`),
  ...choiceControlProperties.map((property) => `choiceControl.${property}`),
  ...switchControlProperties.map((property) => `switchControl.${property}`),
];

const navigationProperties = {
  header: [
    'background',
    'fallbackBackground',
    'highlightColor',
    'reflectionLavender',
    'reflectionCool',
    'reflectionWarm',
    'materialBackground',
    'fallbackMaterialBackground',
    'foreground',
    'mutedForeground',
    'borderColor',
    'borderWidth',
    'borderHighlight',
    'innerBorderColor',
    'backdropFilter',
    'shadow',
    'innerShadow',
    'radius',
    'insetBlockStart',
    'insetInline',
    'maxWidth',
    'minHeight',
    'gap',
    'zIndex',
  ],
  panel: [
    'background',
    'fallbackBackground',
    'materialBackground',
    'fallbackMaterialBackground',
    'foreground',
    'borderColor',
    'borderWidth',
    'borderHighlight',
    'backdropFilter',
    'shadow',
    'innerShadow',
    'radius',
    'paddingBlock',
    'paddingInline',
    'gap',
    'zIndex',
  ],
  brand: [
    'foreground',
    'hoverForeground',
    'minHeight',
    'gap',
    'radius',
    'fontFamily',
    'fontSize',
    'fontWeight',
  ],
  item: [
    'background',
    'foreground',
    'borderColor',
    'shadow',
    'minHeight',
    'paddingBlock',
    'paddingInline',
    'gap',
    'radius',
    'borderWidth',
    'fontSize',
    'fontWeight',
    'hover.background',
    'hover.foreground',
    'hover.borderColor',
    'hover.shadow',
    'pressed.background',
    'pressed.foreground',
    'pressed.borderColor',
    'pressed.shadow',
    'active.background',
    'active.foreground',
    'active.borderColor',
    'active.indicator',
    'active.indicatorWidth',
    'active.fontWeight',
    'active.shadow',
    'focus.ringColor',
    'focus.ringWidth',
    'focus.ringOffset',
    'disabled.background',
    'disabled.foreground',
    'disabled.borderColor',
  ],
  side: [
    'background',
    'fallbackBackground',
    'foreground',
    'mutedForeground',
    'borderColor',
    'borderWidth',
    'borderHighlight',
    'backdropFilter',
    'shadow',
    'innerShadow',
    'paddingBlock',
    'paddingInline',
    'gap',
  ],
  selector: [
    'background',
    'fallbackBackground',
    'borderColor',
    'borderHighlight',
    'borderWidth',
    'radius',
    'padding',
    'gap',
    'shadow',
    'innerShadow',
    'labelForeground',
    'itemForeground',
    'itemHoverForeground',
    'itemHoverBackground',
    'itemPressedBackground',
    'itemPressedShadow',
    'itemActiveBackground',
    'itemActiveForeground',
    'itemActiveBorderColor',
    'itemActiveHighlight',
    'itemActiveShadow',
    'itemActiveInnerShadow',
  ],
  skipLink: [
    'background',
    'foreground',
    'borderColor',
    'borderWidth',
    'radius',
    'paddingBlock',
    'paddingInline',
    'shadow',
    'focusRingColor',
    'focusRingWidth',
    'focusRingOffset',
    'zIndex',
  ],
  backdrop: ['background', 'zIndex'],
  motion: [
    'duration.fast',
    'duration.normal',
    'duration.slow',
    'easing.standard',
    'easing.emphasized',
    'easing.exit',
    'scale.pressed',
    'opacity.rest',
    'opacity.hover',
    'shadow.rest',
    'shadow.hover',
    'shadow.pressed',
  ],
  transition: ['duration', 'easing'],
};

export const requiredNavigationSemanticPaths = Object.entries(navigationProperties).flatMap(
  ([group, properties]) => properties.map((property) => `navigation.${group}.${property}`),
);

const requiredLayoutPrimitivePaths = [
  'spacing.none',
  'container.sm',
  'container.md',
  'container.lg',
  'container.xl',
  'container.wide',
  'containerGutter.sm',
  'containerGutter.md',
  'containerGutter.lg',
  'sectionPadding.sm',
  'sectionPadding.md',
  'sectionPadding.lg',
  'gridMin.sm',
  'gridMin.md',
  'gridMin.lg',
  'breakpoint.sm',
  'breakpoint.md',
  'breakpoint.lg',
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
  'string',
]);

export class TokenValidationError extends Error {}

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

function composeDarkSemanticTokens(semanticTokens, authoredDarkTokens) {
  for (const tokenPath of authoredDarkTokens.keys()) {
    if (!semanticTokens.has(tokenPath)) {
      throw new TokenValidationError(
        `themes/dark.json: ${tokenPath} does not exist in semantic-tokens.json`,
      );
    }
  }

  return new Map(
    [...semanticTokens].map(([tokenPath, semanticToken]) => {
      const darkToken = authoredDarkTokens.get(tokenPath);

      if (darkToken) {
        return [tokenPath, darkToken];
      }

      if (isThemeInvariantComponentAlias(tokenPath)) {
        return [tokenPath, semanticToken];
      }

      throw new TokenValidationError(
        `themes/dark.json: semantic token ${tokenPath} has no dark-theme value`,
      );
    }),
  );
}

function isThemeInvariantComponentAlias(tokenPath) {
  return [
    'button.',
    'iconButton.',
    'card.',
    'formField.',
    'formControl.',
    'choiceControl.',
    'switchControl.',
    'navigation.',
  ].some((prefix) => tokenPath.startsWith(prefix));
}

function validateSemanticCoverage(semanticTokens, darkTokens) {
  for (const tokenPath of [
    ...requiredSemanticPaths,
    ...requiredLiquidGlassSemanticPaths,
    ...requiredAmbientSemanticPaths,
    ...requiredButtonSemanticPaths,
    ...requiredCardSemanticPaths,
    ...requiredFormSemanticPaths,
    ...requiredNavigationSemanticPaths,
  ]) {
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

  for (const [tokenPath, semanticToken] of semanticTokens) {
    const darkToken = darkTokens.get(tokenPath);

    if (darkToken?.type !== semanticToken.type) {
      throw new TokenValidationError(
        `themes/dark.json: ${tokenPath} uses type "${darkToken?.type ?? 'missing'}"; ` +
          `expected "${semanticToken.type}"`,
      );
    }
  }
}

function validateLayoutPrimitiveCoverage(primitiveTokens) {
  for (const tokenPath of requiredLayoutPrimitivePaths) {
    if (!primitiveTokens.has(tokenPath)) {
      throw new TokenValidationError(`Required layout primitive ${tokenPath} is missing`);
    }
  }
}

function validateLiquidGlassPrimitives(primitiveTokens) {
  for (const tokenPath of requiredLiquidGlassPrimitivePaths) {
    if (!primitiveTokens.has(tokenPath)) {
      throw new TokenValidationError(`Required Liquid Glass primitive ${tokenPath} is missing`);
    }
  }

  for (const scale of ['none', 'xs', 'sm', 'md', 'lg', 'xl']) {
    const token = primitiveTokens.get(`glass.blur.${scale}`);
    const value = token?.value;

    if (typeof value !== 'string') {
      throw new TokenValidationError(`${token?.path ?? scale} must be a CSS dimension`);
    }

    const remValue = value === '0' ? 0 : Number.parseFloat(value.endsWith('rem') ? value : 'NaN');

    if (!Number.isFinite(remValue) || remValue < 0 || remValue > 1.5) {
      throw new TokenValidationError(
        `${token.path} must be between 0 and 1.5rem to preserve the approved blur budget`,
      );
    }
  }

  for (const scale of ['none', 'subtle', 'default', 'strong']) {
    const token = primitiveTokens.get(`glass.saturation.${scale}`);
    const value = token?.value;

    if (typeof value !== 'number' || value < 1 || value > 1.25) {
      throw new TokenValidationError(`${token?.path ?? scale} must be a number between 1 and 1.25`);
    }
  }

  for (const token of primitiveTokens.values()) {
    if (!token.path.startsWith('glass.opacity.')) {
      continue;
    }

    if (typeof token.value !== 'number' || token.value < 0 || token.value > 1) {
      throw new TokenValidationError(`${token.path} must be a number between 0 and 1`);
    }
  }
}

function validateAmbientPrimitives(primitiveTokens) {
  let previousOpacity = -1;

  for (const tokenPath of requiredAmbientPrimitivePaths) {
    const token = primitiveTokens.get(tokenPath);
    const value = token?.value;

    if (typeof value !== 'number' || value < 0 || value > 0.9) {
      throw new TokenValidationError(
        `${token?.path ?? tokenPath} must be a number between 0 and 0.9`,
      );
    }

    if (value <= previousOpacity) {
      throw new TokenValidationError('Ambient opacity values must increase with intensity');
    }

    previousOpacity = value;
  }
}

function validateCssNameUniqueness(tokens, nameForToken, label) {
  const names = new Map();

  for (const token of tokens.values()) {
    const cssName = nameForToken(token.path);
    const existing = names.get(cssName);

    if (existing) {
      throw new TokenValidationError(
        `${label}: ${token.path} and ${existing} both generate ${cssName}`,
      );
    }

    names.set(cssName, token.path);
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

function cssValue(value, primitiveTokens, semanticTokens = new Map()) {
  if (typeof value === 'number') {
    return String(value);
  }

  if (typeof value !== 'string') {
    throw new TokenValidationError(
      `Unsupported token value ${JSON.stringify(value)}; expected a string or number`,
    );
  }

  return value.replace(referencePattern, (_, reference) => {
    if (primitiveTokens.has(reference)) {
      return `var(${primitiveCssName(reference)})`;
    }

    if (semanticTokens.has(reference)) {
      return `var(${semanticCssName(reference)})`;
    }

    throw new TokenValidationError(`Cannot emit missing CSS reference {${reference}}`);
  });
}

function sassMapValue(token, primitiveTokens, semanticTokens) {
  const value = cssValue(token.value, primitiveTokens, semanticTokens);

  // Sass otherwise interprets comma lists and slash-separated CSS strings such as `16 / 9` as
  // Sass syntax. Interpolation removes these quotes when custom properties are emitted.
  return ['shadow', 'string'].includes(token.type) && (value.includes(',') || value.includes(' / '))
    ? JSON.stringify(value)
    : value;
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

function renderBreakpointFile(tokens) {
  const breakpoints = [...tokens.values()].filter((token) => token.path.startsWith('breakpoint.'));
  const lines = [
    '// Generated by scripts/tokens.mjs from /tokens/primitives/layout.json.',
    '// CSS custom properties cannot be used in media-query conditions.',
  ];

  for (const token of breakpoints) {
    lines.push(`$gh-${toKebabCase(token.path.replace('.', '-'))}: ${token.value};`);
  }

  lines.push('');
  return lines.join('\n');
}

function renderSemanticContract(tokens) {
  const themeNames = [...tokens.keys()]
    .filter((tokenPath) => !isThemeInvariantComponentAlias(tokenPath))
    .map((tokenPath) => semanticCssName(tokenPath).replace('--gh-', ''));
  const invariantNames = [...tokens.keys()]
    .filter(isThemeInvariantComponentAlias)
    .map((tokenPath) => semanticCssName(tokenPath).replace('--gh-', ''));
  const lines = [
    '// Generated by scripts/tokens.mjs from /tokens/semantic-tokens.json.',
    "@use 'sass:map';",
    '',
    '$gh-theme-token-names: (',
    ...themeNames.map((name) => `  '${name}',`),
    ');',
    '',
    '$gh-theme-invariant-token-names: (',
    ...invariantNames.map((name) => `  '${name}',`),
    ');',
    '',
    '@mixin apply($tokens, $include-invariant: true) {',
    '  @each $name in $gh-theme-token-names {',
    '    @if not map.has-key($tokens, $name) {',
    "      @error 'Missing semantic theme value: #{$name}';",
    '    }',
    '',
    '    --gh-#{$name}: #{map.get($tokens, $name)};',
    '  }',
    '',
    '  @each $name in $gh-theme-invariant-token-names {',
    '    @if not map.has-key($tokens, $name) {',
    "      @error 'Missing theme-invariant semantic value: #{$name}';",
    '    }',
    '',
    '    @if $include-invariant {',
    '      --gh-#{$name}: #{map.get($tokens, $name)};',
    '    }',
    '  }',
    '}',
    '',
  ];

  return lines.join('\n');
}

function renderThemeFile(themeName, tokens, primitiveTokens, semanticTokens) {
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
    lines.push(`  '${name}': ${sassMapValue(token, primitiveTokens, semanticTokens)},`);
  }

  lines.push(
    ');',
    '',
    `@mixin apply-${themeName}-theme {`,
    `  color-scheme: ${themeName};`,
    `  @include semantic.apply(${mapName}, ${themeName === 'light' ? 'true' : 'false'});`,
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

export async function loadAndValidateTokens() {
  const primitiveTokens = new Map();

  for (const file of primitiveFiles) {
    const parsed = await loadJson(path.join('primitives', file));
    mergeTokenMaps(primitiveTokens, collectTokens(parsed.data, parsed.relativePath));
  }

  const semanticFile = await loadJson('semantic-tokens.json');
  const semanticTokens = collectTokens(semanticFile.data, semanticFile.relativePath);
  const lightFile = await loadJson(path.join('themes', 'light.json'));
  const darkFile = await loadJson(path.join('themes', 'dark.json'));
  const authoredDarkTokens = collectTokens(darkFile.data, darkFile.relativePath);
  const darkTokens = composeDarkSemanticTokens(semanticTokens, authoredDarkTokens);
  const availableTokens = new Map([...primitiveTokens, ...semanticTokens]);
  const darkAvailableTokens = new Map([...primitiveTokens, ...darkTokens]);

  validateReferences(primitiveTokens, primitiveTokens);
  validateLayoutPrimitiveCoverage(primitiveTokens);
  validateLiquidGlassPrimitives(primitiveTokens);
  validateAmbientPrimitives(primitiveTokens);
  validateReferences(semanticTokens, availableTokens);
  validateReferences(darkTokens, darkAvailableTokens);
  validateReferenceCycles(availableTokens);
  validateReferenceCycles(darkAvailableTokens);
  validateThemeMetadata(lightFile.data, darkFile.data);
  validateSemanticCoverage(semanticTokens, darkTokens);
  validateCssNameUniqueness(primitiveTokens, primitiveCssName, 'Primitive tokens');
  validateCssNameUniqueness(semanticTokens, semanticCssName, 'Semantic tokens');

  return {
    darkTokens,
    primitiveTokens,
    semanticTokens,
  };
}

export function getGeneratedFiles(tokens) {
  return new Map([
    [path.join(stylesRoot, 'tokens/_primitives.scss'), renderPrimitiveFile(tokens.primitiveTokens)],
    [
      path.join(stylesRoot, 'tokens/_breakpoints.scss'),
      renderBreakpointFile(tokens.primitiveTokens),
    ],
    [
      path.join(stylesRoot, 'tokens/_typography.scss'),
      renderTypographyFile(tokens.primitiveTokens),
    ],
    [path.join(stylesRoot, 'tokens/_semantic.scss'), renderSemanticContract(tokens.semanticTokens)],
    [
      path.join(stylesRoot, 'themes/_light-theme.scss'),
      renderThemeFile(
        'light',
        tokens.semanticTokens,
        tokens.primitiveTokens,
        tokens.semanticTokens,
      ),
    ],
    [
      path.join(stylesRoot, 'themes/_dark-theme.scss'),
      renderThemeFile('dark', tokens.darkTokens, tokens.primitiveTokens, tokens.semanticTokens),
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

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
}
