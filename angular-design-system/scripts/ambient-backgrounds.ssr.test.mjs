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
const { GhAmbientBackgroundComponent } = await import(libraryBundle);

class AmbientSsrHost {}

Component({
  selector: 'ambient-ssr-host',
  standalone: true,
  imports: [GhAmbientBackgroundComponent],
  template: `
    <gh-ambient-background preset="brand" intensity="strong">
      <main><h1>Server-rendered content</h1></main>
    </gh-ambient-background>
  `,
})(AmbientSsrHost);

test('server-renders deterministic ambient markup without browser APIs', async () => {
  const html = await renderApplication(
    (context) => bootstrapApplication(AmbientSsrHost, { providers: [] }, context),
    {
      document: '<!doctype html><html><body><ambient-ssr-host></ambient-ssr-host></body></html>',
      url: '/ambient-backgrounds',
    },
  );

  assert.match(html, /<gh-ambient-background[^>]*data-preset="brand"/);
  assert.match(html, /data-intensity="strong"/);
  assert.match(
    html,
    /<div[^>]*aria-hidden="true"[^>]*class="gh-ambient-background__visual"[^>]*><\/div>/,
  );
  assert.match(html, /<main><h1>Server-rendered content<\/h1><\/main>/);
  assert.equal(
    (html.match(/<div[^>]*class="gh-ambient-background__visual"[^>]*><\/div>/g) ?? []).length,
    1,
  );
});
