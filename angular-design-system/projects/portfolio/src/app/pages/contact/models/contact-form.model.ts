export const CONTACT_FORM_LIMITS = {
  nameMin: 2,
  nameMax: 80,
  emailMax: 160,
  subjectMin: 3,
  subjectMax: 120,
  messageMin: 20,
  messageMax: 2000,
} as const;

export type PortfolioContactSubmissionStatus =
  'idle' | 'submitting' | 'success' | 'error' | 'unavailable';

export interface PortfolioContactFormValue {
  readonly name: string;
  readonly email: string;
  readonly subject: string;
  readonly message: string;
  readonly botcheck: boolean;
}

export interface Web3FormsContactPayload {
  readonly access_key: string;
  readonly from_name: string;
  readonly name: string;
  readonly email: string;
  readonly subject: string;
  readonly message: string;
  readonly botcheck: boolean;
}

export interface PortfolioContactSubmissionResult {
  readonly success: true;
}

export interface Web3FormsResponse {
  readonly success: boolean;
  readonly message?: string;
}

export interface PortfolioContactEmailFallback {
  readonly href: string;
  readonly address: string;
}
