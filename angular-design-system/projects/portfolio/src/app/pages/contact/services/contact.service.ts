import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

import { CONTACT_FORM_CONFIG } from '../../../core/config/portfolio.config';
import type {
  PortfolioContactFormValue,
  PortfolioContactSubmissionResult,
  Web3FormsResponse,
} from '../models/contact-form.model';
import { mapContactFormToWeb3FormsPayload } from '../utils/contact-form.utils';

export class ContactConfigurationError extends Error {
  constructor() {
    super('Contact form configuration is unavailable.');
    this.name = 'ContactConfigurationError';
  }
}

export class ContactSubmissionError extends Error {
  constructor() {
    super('The contact form submission failed.');
    this.name = 'ContactSubmissionError';
  }
}

@Injectable()
export class ContactService {
  private readonly http = inject(HttpClient);
  private readonly config = inject(CONTACT_FORM_CONFIG);

  isConfigured(): boolean {
    return Boolean(
      this.config.endpoint.trim() && this.config.accessKey.trim() && this.config.fromName.trim(),
    );
  }

  sendMessage(value: PortfolioContactFormValue): Observable<PortfolioContactSubmissionResult> {
    if (!this.isConfigured()) {
      return throwError(() => new ContactConfigurationError());
    }

    if (value.botcheck) {
      return throwError(() => new ContactSubmissionError());
    }

    const payload = mapContactFormToWeb3FormsPayload(value, this.config);

    return this.http.post<Web3FormsResponse>(this.config.endpoint, payload).pipe(
      map((response) => {
        if (!response.success) {
          throw new ContactSubmissionError();
        }

        return { success: true } as const;
      }),
      catchError((error: unknown) =>
        throwError(() =>
          error instanceof ContactConfigurationError || error instanceof ContactSubmissionError
            ? error
            : new ContactSubmissionError(),
        ),
      ),
    );
  }
}
