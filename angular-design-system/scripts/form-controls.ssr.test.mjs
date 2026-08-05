import assert from 'node:assert/strict';
import test from 'node:test';

import '@angular/compiler';
import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { renderApplication } from '@angular/platform-server';

class FormControlsSsrHost {}

Component({
  selector: 'form-controls-ssr-host',
  standalone: true,
  template: `
    <form>
      <div class="gh-form-field">
        <label class="gh-form-field__label" for="ssr-email">Email</label>
        <p class="gh-form-field__hint" id="ssr-email-hint">Use a verified address.</p>
        <input
          class="gh-input"
          id="ssr-email"
          type="email"
          autocomplete="email"
          aria-describedby="ssr-email-hint"
        />
      </div>
      <label class="gh-checkbox">
        <input class="gh-checkbox__control" type="checkbox" checked />
        <span>Include updates</span>
      </label>
      <label class="gh-switch">
        <input class="gh-switch__control" type="checkbox" role="switch" checked />
        <span>Enable notifications</span>
      </label>
    </form>
  `,
})(FormControlsSsrHost);

test('server-renders deterministic native Form Control markup and IDs', async () => {
  const html = await renderApplication(
    (context) => bootstrapApplication(FormControlsSsrHost, { providers: [] }, context),
    {
      document:
        '<!doctype html><html><body><form-controls-ssr-host></form-controls-ssr-host></body></html>',
      url: '/forms',
    },
  );

  assert.match(html, /<label[^>]*for="ssr-email"/);
  assert.match(
    html,
    /<input(?=[^>]*class="gh-input")(?=[^>]*id="ssr-email")(?=[^>]*type="email")[^>]*>/,
  );
  assert.match(html, /aria-describedby="ssr-email-hint"/);
  assert.match(
    html,
    /<input(?=[^>]*class="gh-checkbox__control")(?=[^>]*type="checkbox")(?=[^>]*checked)[^>]*>/,
  );
  assert.match(
    html,
    /<input(?=[^>]*class="gh-switch__control")(?=[^>]*role="switch")(?=[^>]*checked)[^>]*>/,
  );
  assert.equal((html.match(/id="ssr-email"/g) ?? []).length, 1);
  assert.doesNotMatch(html, /Math\.random|randomUUID|ng-reflect/);
});
