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
const { GhCardComponent } = await import(libraryBundle);

class CardSsrHost {}

Component({
  selector: 'card-ssr-host',
  standalone: true,
  imports: [GhCardComponent],
  template: `
    <gh-card variant="glass" padding="lg" radius="xl" interactive selected>
      <img ghCardMedia src="/card.svg" alt="Abstract Card media" width="640" height="360" />
      <header ghCardHeader><h2>Server-rendered Card</h2></header>
      <div ghCardContent><p>Deterministic projected content.</p></div>
      <footer ghCardFooter><a href="/details">View details</a></footer>
    </gh-card>
  `,
})(CardSsrHost);

test('server-renders deterministic Card material, state and slot markup', async () => {
  const html = await renderApplication(
    (context) => bootstrapApplication(CardSsrHost, { providers: [] }, context),
    {
      document: '<!doctype html><html><body><card-ssr-host></card-ssr-host></body></html>',
      url: '/cards',
    },
  );

  assert.match(html, /<gh-card[^>]*>[\s\S]*<article[^>]*data-variant="glass"/);
  assert.match(html, /data-padding="lg"/);
  assert.match(html, /data-radius="xl"/);
  assert.match(html, /data-interactive="true"/);
  assert.match(html, /data-selected="true"/);
  assert.match(html, /<img[^>]*alt="Abstract Card media"[^>]*width="640"[^>]*height="360"/);
  assert.match(html, /<h2>Server-rendered Card<\/h2>/);
  assert.match(html, /<a href="\/details">View details<\/a>/);
  assert.doesNotMatch(html, /role="button"|tabindex="0"|aria-selected=/);
});
