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
const { GhButtonComponent, GhIconButtonComponent } = await import(libraryBundle);

class ButtonsSsrHost {}

Component({
  selector: 'buttons-ssr-host',
  standalone: true,
  imports: [GhButtonComponent, GhIconButtonComponent],
  template: `
    <main>
      <gh-button variant="tertiary" size="lg">Continue</gh-button>
      <gh-icon-button variant="ghost" size="sm" aria-label="Open navigation">
        <span aria-hidden="true">+</span>
      </gh-icon-button>
    </main>
  `,
})(ButtonsSsrHost);

test('server-renders deterministic native Button and Icon Button markup', async () => {
  const html = await renderApplication(
    (context) => bootstrapApplication(ButtonsSsrHost, { providers: [] }, context),
    {
      document: '<!doctype html><html><body><buttons-ssr-host></buttons-ssr-host></body></html>',
      url: '/buttons',
    },
  );

  assert.match(
    html,
    /<gh-button[^>]*>[\s\S]*<button[^>]*type="button"[^>]*data-variant="tertiary"/,
  );
  assert.match(html, /data-size="lg"/);
  assert.match(html, /<gh-icon-button[^>]*>[\s\S]*<button[^>]*aria-label="Open navigation"/);
  assert.match(html, /data-variant="ghost"/);
  assert.match(html, /data-size="sm"/);
  assert.equal((html.match(/<button\b/g) ?? []).length, 2);
  assert.doesNotMatch(html, /role="button"|tabindex="0"/);
});
