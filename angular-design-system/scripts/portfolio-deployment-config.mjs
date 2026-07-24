import { readFile } from 'node:fs/promises';

const configUrl = new URL('../projects/portfolio/seo.config.json', import.meta.url);

export const DEPLOYMENT_CONTEXTS = ['development', 'deploy-preview', 'branch-deploy', 'production'];

export async function loadPortfolioDeploymentConfig() {
  return JSON.parse(await readFile(configUrl, 'utf8'));
}

export function normalizeDeploymentContext(value = 'development') {
  const aliases = {
    dev: 'development',
    local: 'development',
    preview: 'deploy-preview',
  };
  const context = aliases[value] ?? value;

  if (!DEPLOYMENT_CONTEXTS.includes(context)) {
    throw new Error(
      `Unsupported deployment context "${value}". Expected ${DEPLOYMENT_CONTEXTS.join(', ')}.`,
    );
  }

  return context;
}

export function validateProductionSiteUrl(value) {
  const url = new URL(value);
  const placeholderPattern = /example|placeholder|localhost|127\.0\.0\.1/iu;

  if (
    url.protocol !== 'https:' ||
    url.username ||
    url.password ||
    url.pathname !== '/' ||
    url.search ||
    url.hash ||
    placeholderPattern.test(url.hostname)
  ) {
    throw new Error(
      'SITE_URL must be a public HTTPS origin without credentials, path, query, hash or placeholder hostname.',
    );
  }

  return url.origin;
}

export async function resolvePortfolioDeployment({
  requestedContext,
  environment = process.env,
} = {}) {
  const sourceConfig = await loadPortfolioDeploymentConfig();
  const context = normalizeDeploymentContext(
    requestedContext ?? environment.DEPLOY_CONTEXT ?? environment.CONTEXT ?? 'development',
  );
  const preview = context === 'deploy-preview' || context === 'branch-deploy';
  const strict = context !== 'development';
  const environmentSiteUrl = environment.SITE_URL?.trim();

  if (strict && !environmentSiteUrl) {
    throw new Error(`SITE_URL is required for a ${context} build.`);
  }

  const siteUrl = validateProductionSiteUrl(environmentSiteUrl || sourceConfig.baseUrl);
  const accessKey = preview ? '' : (environment.WEB3FORMS_ACCESS_KEY?.trim() ?? '');

  if (context === 'production' && !accessKey) {
    throw new Error('WEB3FORMS_ACCESS_KEY is required for a production build.');
  }

  return {
    context,
    preview,
    siteUrl,
    accessKey,
    sourceConfig,
  };
}

export function angularDefineArguments({ siteUrl, accessKey }) {
  return [
    '--define',
    `PORTFOLIO_SITE_URL=${JSON.stringify(siteUrl)}`,
    '--define',
    `PORTFOLIO_WEB3FORMS_ACCESS_KEY=${JSON.stringify(accessKey)}`,
  ];
}
