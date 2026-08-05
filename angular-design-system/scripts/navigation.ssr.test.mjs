import assert from 'node:assert/strict';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath, pathToFileURL } from 'node:url';

import '@angular/compiler';
import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { renderApplication } from '@angular/platform-server';

const workspaceRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const libraryBundle = pathToFileURL(
  path.join(workspaceRoot, 'dist/gh-design-system/fesm2022/gh-design-system.mjs'),
).href;
const { GhNavigationComponent } = await import(libraryBundle);

class NavigationSsrHost {
  items = [
    { label: 'Home', href: '/en', active: true },
    { label: 'About', href: '/en/about' },
  ];
}

Component({
  selector: 'navigation-ssr-host',
  standalone: true,
  imports: [GhNavigationComponent],
  template: `
    <gh-navigation
      brand="Gonzalo Herrera"
      brandHref="/en"
      menuId="ssr-navigation-menu"
      navigationLabel="Portfolio navigation"
      [items]="items"
    />
  `,
})(NavigationSsrHost);

test('server-renders deterministic closed Navigation markup and active route', async () => {
  const html = await renderApplication(
    (context) => bootstrapApplication(NavigationSsrHost, { providers: [] }, context),
    {
      document:
        '<!doctype html><html lang="en"><body><navigation-ssr-host></navigation-ssr-host></body></html>',
      url: '/en',
    },
  );
  const bodyHtml = html.slice(html.indexOf('<body'));

  assert.match(bodyHtml, /<header[^>]*class="gh-navigation/);
  assert.match(bodyHtml, /<nav[^>]*aria-label="Portfolio navigation"/);
  assert.match(bodyHtml, /<a[^>]*href="\/en"[^>]*aria-current="page"/);
  assert.match(bodyHtml, /<button[^>]*aria-label="Open navigation menu"/);
  assert.match(bodyHtml, /aria-expanded="false"/);
  assert.match(bodyHtml, /aria-controls="ssr-navigation-menu"/);
  assert.match(bodyHtml, /id="ssr-navigation-menu"/);
  assert.doesNotMatch(bodyHtml, /class="[^"]*gh-navigation__panel--open/);
  assert.equal((bodyHtml.match(/<div[^>]*id="ssr-navigation-menu"/g) ?? []).length, 1);
  assert.doesNotMatch(bodyHtml, /Math\.random|randomUUID|ng-reflect/);
});
