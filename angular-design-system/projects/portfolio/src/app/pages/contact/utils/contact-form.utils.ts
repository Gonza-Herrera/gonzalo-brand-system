import type {
  PortfolioContactFormValue,
  PortfolioContactSubmissionPayload,
} from '../models/contact-form.model';

export function normalizeContactFormValue(
  value: PortfolioContactFormValue,
): PortfolioContactSubmissionPayload {
  const company = value.company.trim();

  return {
    name: value.name.trim(),
    email: value.email.trim(),
    company: company || undefined,
    subject: value.subject.trim(),
    message: value.message.trim(),
  };
}
