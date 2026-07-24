import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  angularDefineArguments,
  normalizeDeploymentContext,
  resolvePortfolioDeployment,
  validateProductionSiteUrl,
} from './portfolio-deployment-config.mjs';

const siteUrl = 'https://gonzalo-herrera-dev.netlify.app';

describe('Portfolio deployment configuration', () => {
  it('normalizes local and Netlify preview context aliases', () => {
    assert.equal(normalizeDeploymentContext('local'), 'development');
    assert.equal(normalizeDeploymentContext('preview'), 'deploy-preview');
    assert.equal(normalizeDeploymentContext('branch-deploy'), 'branch-deploy');
    assert.throws(() => normalizeDeploymentContext('unknown'));
  });

  it('rejects insecure, local, path-scoped and placeholder production URLs', () => {
    assert.equal(validateProductionSiteUrl(siteUrl), siteUrl);
    assert.throws(() => validateProductionSiteUrl('http://example.com'));
    assert.throws(() => validateProductionSiteUrl('https://localhost'));
    assert.throws(() => validateProductionSiteUrl('https://portfolio.example'));
    assert.throws(() => validateProductionSiteUrl(`${siteUrl}/portfolio`));
  });

  it('requires production variables and keeps the public access key out of previews', async () => {
    await assert.rejects(
      resolvePortfolioDeployment({
        requestedContext: 'production',
        environment: {},
      }),
      /SITE_URL/u,
    );
    await assert.rejects(
      resolvePortfolioDeployment({
        requestedContext: 'production',
        environment: { SITE_URL: siteUrl },
      }),
      /WEB3FORMS_ACCESS_KEY/u,
    );

    const preview = await resolvePortfolioDeployment({
      requestedContext: 'preview',
      environment: {
        SITE_URL: siteUrl,
        WEB3FORMS_ACCESS_KEY: 'must-not-enter-the-preview-bundle',
      },
    });
    assert.equal(preview.preview, true);
    assert.equal(preview.accessKey, '');
  });

  it('passes validated values to Angular as build-time constants', async () => {
    const production = await resolvePortfolioDeployment({
      requestedContext: 'production',
      environment: {
        SITE_URL: siteUrl,
        WEB3FORMS_ACCESS_KEY: 'test-public-access-key',
      },
    });
    const defines = angularDefineArguments(production);

    assert.deepEqual(defines, [
      '--define',
      `PORTFOLIO_SITE_URL=${JSON.stringify(siteUrl)}`,
      '--define',
      'PORTFOLIO_WEB3FORMS_ACCESS_KEY="test-public-access-key"',
    ]);
  });
});
