import type { PortfolioContactFormConfig } from '../../../core/config/portfolio.config';
import type {
  PortfolioContactFormValue,
  Web3FormsContactPayload,
} from '../models/contact-form.model';

export function mapContactFormToWeb3FormsPayload(
  value: PortfolioContactFormValue,
  config: PortfolioContactFormConfig,
): Web3FormsContactPayload {
  return {
    access_key: config.accessKey.trim(),
    from_name: config.fromName.trim(),
    name: value.name.trim(),
    email: value.email.trim(),
    subject: value.subject.trim(),
    message: value.message.trim(),
    botcheck: value.botcheck,
  };
}
