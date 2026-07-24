import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';

import {
  CONTACT_FORM_CONFIG,
  type PortfolioContactFormConfig,
} from '../../../core/config/portfolio.config';
import type { PortfolioContactFormValue } from '../models/contact-form.model';
import {
  ContactConfigurationError,
  ContactService,
  ContactSubmissionError,
} from './contact.service';

describe('ContactService', () => {
  const endpoint = 'https://api.web3forms.com/submit';
  const configuredContactForm: PortfolioContactFormConfig = {
    provider: 'web3forms',
    endpoint,
    accessKey: 'test-public-access-key',
    fromName: 'Gonzalo Herrera Portfolio',
  };
  const validValue: PortfolioContactFormValue = {
    name: ' Gonzalo Herrera ',
    email: ' gonzalo@domain.test ',
    subject: ' Portfolio conversation ',
    message: ' A message with enough useful context to submit. ',
    botcheck: false,
  };

  async function configure(config: PortfolioContactFormConfig = configuredContactForm) {
    await TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        ContactService,
        { provide: CONTACT_FORM_CONFIG, useValue: config },
      ],
    }).compileComponents();

    return {
      service: TestBed.inject(ContactService),
      http: TestBed.inject(HttpTestingController),
    };
  }

  afterEach(() => {
    TestBed.inject(HttpTestingController).verify();
  });

  it('posts the explicit normalized payload to the configured endpoint', async () => {
    const { service, http } = await configure();
    const snapshot = { ...validValue };
    const resultPromise = firstValueFrom(service.sendMessage(validValue));
    const request = http.expectOne(endpoint);

    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({
      access_key: 'test-public-access-key',
      from_name: 'Gonzalo Herrera Portfolio',
      name: 'Gonzalo Herrera',
      email: 'gonzalo@domain.test',
      subject: 'Portfolio conversation',
      message: 'A message with enough useful context to submit.',
      botcheck: false,
    });
    expect(Object.keys(request.request.body as object)).toHaveLength(7);

    request.flush({ success: true, message: 'Email sent successfully!' });

    await expect(resultPromise).resolves.toEqual({ success: true });
    expect(validValue).toEqual(snapshot);
  });

  it('treats a successful HTTP response with success false as a controlled error', async () => {
    const { service, http } = await configure();
    const resultPromise = firstValueFrom(service.sendMessage(validValue));
    const request = http.expectOne(endpoint);

    request.flush({ success: false, message: 'Provider detail that must not reach the UI' });

    await expect(resultPromise).rejects.toBeInstanceOf(ContactSubmissionError);
  });

  it.each([400, 429, 500])('normalizes HTTP %i failures without retrying', async (status) => {
    const { service, http } = await configure();
    const resultPromise = firstValueFrom(service.sendMessage(validValue));
    const request = http.expectOne(endpoint);

    request.flush({ success: false }, { status, statusText: 'Request failed' });

    await expect(resultPromise).rejects.toBeInstanceOf(ContactSubmissionError);
    http.expectNone(endpoint);
  });

  it('normalizes a network failure without exposing provider details', async () => {
    const { service, http } = await configure();
    const resultPromise = firstValueFrom(service.sendMessage(validValue));
    const request = http.expectOne(endpoint);

    request.error(new ProgressEvent('error'));

    await expect(resultPromise).rejects.toBeInstanceOf(ContactSubmissionError);
  });

  it('fails without issuing a request when the access key is absent', async () => {
    const { service, http } = await configure({
      ...configuredContactForm,
      accessKey: ' ',
    });

    await expect(firstValueFrom(service.sendMessage(validValue))).rejects.toBeInstanceOf(
      ContactConfigurationError,
    );
    expect(service.isConfigured()).toBe(false);
    http.expectNone(endpoint);
  });

  it('fails without issuing a request when the honeypot is checked', async () => {
    const { service, http } = await configure();

    await expect(
      firstValueFrom(service.sendMessage({ ...validValue, botcheck: true })),
    ).rejects.toBeInstanceOf(ContactSubmissionError);
    http.expectNone(endpoint);
  });
});
