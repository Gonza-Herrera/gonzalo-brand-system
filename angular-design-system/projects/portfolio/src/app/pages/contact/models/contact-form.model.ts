export const CONTACT_FORM_LIMITS = {
  name: 100,
  email: 254,
  company: 150,
  subject: 160,
  messageMin: 20,
  messageMax: 3000,
} as const;

export type PortfolioContactSubmissionStatus =
  'idle' | 'submitting' | 'success' | 'error' | 'unavailable';

export interface PortfolioContactFormValue {
  readonly name: string;
  readonly email: string;
  readonly company: string;
  readonly subject: string;
  readonly message: string;
}

export interface PortfolioContactSubmissionPayload {
  readonly name: string;
  readonly email: string;
  readonly company?: string;
  readonly subject: string;
  readonly message: string;
}

export interface PortfolioContactSubmissionResult {
  readonly success: boolean;
  readonly referenceId?: string;
}
