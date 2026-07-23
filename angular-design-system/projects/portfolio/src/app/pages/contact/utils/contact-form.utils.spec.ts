import type { PortfolioContactFormConfig } from '../../../core/config/portfolio.config';
import type { PortfolioContactFormValue } from '../models/contact-form.model';
import { mapContactFormToWeb3FormsPayload } from './contact-form.utils';

describe('mapContactFormToWeb3FormsPayload', () => {
  const config: PortfolioContactFormConfig = {
    provider: 'web3forms',
    endpoint: 'https://api.web3forms.com/submit',
    accessKey: ' test-public-access-key ',
    fromName: ' Gonzalo Herrera Portfolio ',
  };

  it('maps and trims only the provider fields without mutating the source value', () => {
    const value: PortfolioContactFormValue = {
      name: '  Gonzalo Herrera  ',
      email: '  Gonzalo.Herrera@domain.test  ',
      subject: '  Angular architecture  ',
      message: '  A message with enough useful context.  ',
      botcheck: false,
    };
    const snapshot = { ...value };
    const payload = mapContactFormToWeb3FormsPayload(value, config);

    expect(payload).toEqual({
      access_key: 'test-public-access-key',
      from_name: 'Gonzalo Herrera Portfolio',
      name: 'Gonzalo Herrera',
      email: 'Gonzalo.Herrera@domain.test',
      subject: 'Angular architecture',
      message: 'A message with enough useful context.',
      botcheck: false,
    });
    expect(Object.keys(payload)).toEqual([
      'access_key',
      'from_name',
      'name',
      'email',
      'subject',
      'message',
      'botcheck',
    ]);
    expect(value).toEqual(snapshot);
  });

  it('preserves Unicode, internal line breaks and the honeypot value', () => {
    expect(
      mapContactFormToWeb3FormsPayload(
        {
          name: '  María  ',
          email: ' maria@domain.test ',
          subject: ' Diseño de sistemas ',
          message: '  Primera línea.\n\nSegunda línea con información útil.  ',
          botcheck: true,
        },
        config,
      ),
    ).toEqual({
      access_key: 'test-public-access-key',
      from_name: 'Gonzalo Herrera Portfolio',
      name: 'María',
      email: 'maria@domain.test',
      subject: 'Diseño de sistemas',
      message: 'Primera línea.\n\nSegunda línea con información útil.',
      botcheck: true,
    });
  });
});
